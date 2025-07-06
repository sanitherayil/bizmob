<script>
	import { goto } from '$app/navigation';
	import { Input,Message } from '$lib/component/index.js';
	import css from '$lib/client/css.js';
	import { post } from '$lib/client/fetch.js';
	import { validate } from '$lib/client/lib.js';

    let {data} = $props()
    let company = $state(data.company)
    let input = $state({pass1:'',pass2:'',companyId:0})
    let message = $state('')
    
    async function onSubmit(){
        message=''
        message = validate('inputDiv')
        if(message!=''){
            return
        }
        if(input.pass1!=input.pass2){
            message = 'Password does not match'
            return
        }
        input.companyId = company.id
        const result = await post('',input)
        if(!result.ok){
            message = result.message
            return
        }
        goto('/company/login')
    }
</script>
<div class={css.card} id="inputDiv">
    <div class={css.panel}>{company.name}</div>
    <Input type='password' label="Password" bind:value={input.pass1} required  />
    <Input type='password' label="Retype Password" bind:value={input.pass2} required  />
    <div class="flex gap-2 mt-2">
        <button class={css.btnSubmit} onclick={onSubmit}>Submit</button>
    </div>
    <Message {message} />
</div>