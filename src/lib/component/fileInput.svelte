<script lang="ts">
	import css from "$lib/client/css";
    let {label,file=$bindable(),iClass='',required=false,accept=".csv"} = $props()
    
    function onChange(event:Event){
        const target = event.target as HTMLInputElement;
        if (target.files) {
            file = target.files[0];
        }
    }
</script>
<div class={css.control}>
    <label for="" class={css.label}>{label}
        {#if required}
            <span class={css.required}>*</span>
        {/if}
    </label>
    <input type='file' class={`${css.input} ${iClass}`} {accept} required 
    onchange={onChange} data-label={label}>
</div>