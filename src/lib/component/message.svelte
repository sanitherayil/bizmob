<script>
	import css from "$lib/client/css";
    let{message=''} = $props()
</script>
{#if message}
    <div class={css.error}>{message}</div>    
{/if}
