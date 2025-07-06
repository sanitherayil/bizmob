<script lang="ts">
	import { get } from '$lib/client/fetch';
	import { tick } from 'svelte';
	import css from '$lib/client/css';
	let {type,id,isNew=false,label='Search',data=$bindable({_id:'',name:''}),
		popupOpen = $bindable(false),children} = $props()
	let inputEl: HTMLInputElement;
	let debounceTimer: ReturnType<typeof setTimeout>;
	let value = $state(data.name)
	const states = $state({
		items: [],
		filteredItems: [],
		showDropdown: false,
		activeIndex: -1,
		dropdownPos: 'bottom'
	});
	
	// Debounce fetchItems by 300ms
	function debounceFetch() {
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => {
			if (!popupOpen) fetchItems();
		}, 300);
	}

	async function fetchItems() {
		const query = encodeURIComponent(value.trim());
		const result = await get(`/api/list/get?type=${type}&q=${query}`);
		states.items = result.data;
		states.filteredItems = states.items;
		if(isNew){
			states.showDropdown = true;
		} else if(states.filteredItems.length){
			states.showDropdown = true;
		}
		states.activeIndex=-1
		// scrollToActiveItem()
		// await tick();
		positionDropdown();
	}

	function selectItem(item) {
		data = item
		value= item.name;
		states.showDropdown = false;
	}

	function openNewItemPopup() {
		popupOpen = true;
		states.showDropdown = false;
		data.name = value.trim()
	}

	async function handleKeydown(e: KeyboardEvent) {
		if (!states.showDropdown) return;

		switch(e.key){
			case 'ArrowDown':
				states.activeIndex = (states.activeIndex + 1) % states.filteredItems.length;
				await scrollToActiveItem()
				return
			case 'ArrowUp':
				states.activeIndex = (states.activeIndex - 1 + states.filteredItems.length) % states.filteredItems.length;
				await scrollToActiveItem()
				return
			case 'Escape':
				onBlur()
				await scrollToActiveItem()
				return
			case 'Enter':
				e.preventDefault();
				if (states.filteredItems.length === 0 && isNew) {
					openNewItemPopup(); // 👈 Show popup if no match or nothing selected
				} else {
					if(states.activeIndex===-1){
						states.activeIndex=0
					}
					selectItem(states.filteredItems[states.activeIndex]);
				}
				return
		}
	}

	async function scrollToActiveItem() {
		await tick();
		if(states.activeIndex < 0){
			return
		}
		const listItems = document.querySelectorAll(`#${id}_list li`);
		const el = listItems[states.activeIndex]
		if (el) el.scrollIntoView({ block: 'nearest' });
	}

	function positionDropdown() {
		const rect = inputEl.getBoundingClientRect();
		const spaceBelow = window.innerHeight - rect.bottom;
		states.dropdownPos = spaceBelow < 150 ? 'top' : 'bottom';
	}

	function onBlur(){
		states.showDropdown = false
		states.activeIndex=-1
		if(popupOpen){
			return
		}
		if(value){
			value = data.name
		} else {
			data={_id:'',name:''}
		}
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore event_directive_deprecated -->
<div class={`${css.control} relative`} onkeydown={handleKeydown}>
	<label for="" class={css.label}>{label}</label>
	<input
		autocomplete="off"
		{id}
		bind:this={inputEl}
		class={css.input}
		placeholder="Search item..."
		bind:value
		oninput={(e) => {
			popupOpen = false;
			debounceFetch();
		}}
		onblur={onBlur}
	/>

	{#if states.showDropdown}
		<ul
			id={`${id}_list`}
			class="absolute w-full bg-white border border-blue-500 border-t-0 rounded z-10 max-h-60 overflow-auto shadow"
			style={`top: ${states.dropdownPos === 'bottom' ? '100%' : 'auto'}; bottom: ${states.dropdownPos === 'top' ? '100%' : 'auto'};`}
		>
			{#each states.filteredItems as item, index}
				<li
					class="px-4 py-2 cursor-pointer hover:bg-gray-100"
					onmouseenter={() => states.activeIndex = index}
					class:bg-blue-100={index === states.activeIndex}
					onmousedown={() => selectItem(item)}>
					{item.name}
				</li>
			{/each}
			{#if states.filteredItems.length === 0 && value && isNew}
				<li class="px-4 py-2 text-gray-500 italic">No matches. Press Enter to add new.</li>
			{/if}
		</ul>
	{/if}

	{#if popupOpen}
		<div class="fixed inset-0 bg-black/40 z-20 flex items-center justify-center">
			<div class="bg-white p-6 rounded shadow-md w-96 z-30">
				{@render children({states})}
			</div>
		</div>
	{/if}
</div>
