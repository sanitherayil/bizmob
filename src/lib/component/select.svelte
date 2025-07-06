<script lang="ts">
    //@ts-nocheck
	import css from "$lib/client/css";
    let {data,label,required=false,readonly=false,iClass="",onchange=()=>{},value=$bindable(""),
    defaultValue="",defaultText="Select"} = $props()
</script>
<div class={css.control}>
    {#if label}
    <label for="" class={css.label}>{label}
        {#if required}
            <span class={css.required}>*</span>
        {/if}
    </label>
    {/if}
    <select class={`${css.input} ${iClass}`} bind:value {required} {onchange} data-label={label}>
        <option value={defaultValue}>{defaultText}</option>
        {#each data as row }
            <option value={row._id}>{row.name}</option> 
        {/each}
    </select>
</div>