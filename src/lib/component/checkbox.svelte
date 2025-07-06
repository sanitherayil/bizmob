<script>
    //@ts-nocheck
	import css from "$lib/client/css";
	let {label="",id="",value=$bindable(),iClass='',readonly=false,onchange=()=>{}} = $props()
</script>
<div class="flex gap-2">
    <input type="checkbox" {id} {readonly} class={`w-4 ${iClass}`}
     bind:checked={value} {onchange}  data-label={label}>
    {#if label}
    <label for="" class={css.label}>{label}</label>
    {/if}
</div>