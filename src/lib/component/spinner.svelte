<script>
    let {isLoading=false} = $props()
</script>
{#if isLoading}
    <div class="fixed inset-0 flex items-center justify-center bg-opacity-0 z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg">
            <div class="w-12 h-12 border-8 border-blue-500 border-t-transparent border-dotted rounded-full animate-spin"></div>
        </div>
    </div>       
{/if}
