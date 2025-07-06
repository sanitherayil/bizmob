<script>
    //@ts-nocheck
	import css from "$lib/client/css";
	import { toNumber } from "$lib/client/lib";
	let {label="",id="",type='text',value=$bindable(),iClass='',required=false,max="",min="",
        readonly=false,onchange=()=>{}, oninput=()=>{},onenter=()=>{},onescape=()=>{},
    } = $props()

    function onInput(e){
        oninput(e)
        // for maximum calculation in number
        if(type=='number'){
            if(value!=null){
                value=toNumber(value)
            }
            const maxValue = parseFloat(max)
            const input = e.target
            if(value>maxValue){
                input.style.color='red'
            } else {
                input.style.color=''
            }
        }
    }

    function onKeyDown(e){
        switch(event.key){
            case 'Enter':
                onenter()
                break;
            case 'Escape':
                onescape()
                break;
        }
    }
</script>
<div class={css.control}>
    {#if label}
    <label for="" class={css.label}>{label}
        {#if required}
            <span class={css.required}>*</span>
        {/if}
    </label>
    {/if}
    <input {type} {id} {max} {min} {readonly} class={`${css.input} ${iClass}`}
     bind:value {required} oninput={onInput}  {onchange}  data-label={label} onkeydown={onKeyDown}>
</div>