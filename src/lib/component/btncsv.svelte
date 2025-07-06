<script>
    //@ts-nocheck
    
	import css from "$lib/client/css";

    let {data=[],fileName="data.csv"} = $props()

    function onCSV(){
        const csv = convertToCSV(data);
        const blob = new Blob([csv], { type: 'text/csv' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
    }
    function convertToCSV(objArray) {
        const array = [Object.keys(objArray[0])].concat(objArray);
        return array.map(row => 
            Object.values(row).map(value => 
                `"${String(value).replace(/"/g, '""')}"`
            ).join(',')
        ).join('\n');
    }
</script>
<button class={css.btnPurple} onclick={onCSV}>CSV</button>