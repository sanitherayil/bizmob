<script>
	import css from "$lib/client/css";
</script>
<div class="no-print">
<button class={css.btnCancel} onclick={() => window.print()}>Print</button>
</div>
<style>
    @media print {
        .no-print {
            display: none;
        }
    }
</style>