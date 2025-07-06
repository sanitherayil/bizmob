<script>
    import Select from "../select.svelte";
    let {value=$bindable(""), required=false,label} = $props()
    let data = [
        {_id:'Yes',name:"Yes"},
        {_id:'No',name:"No"},
    ]
</script>
<Select {label} {data} bind:value {required} />