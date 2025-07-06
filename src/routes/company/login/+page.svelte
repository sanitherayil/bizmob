<script>
	import { goto } from "$app/navigation";
	import { Input,Message } from "$lib/component";
	import css from "$lib/client/css";
	import { post } from "$lib/client/fetch";
	import { validate } from "$lib/client/lib";

    let input = $state({mobile:'',passcode:''})
    let message = $state('')
    async function onLogin(){
        message=''
        message = validate('inputDiv')
        if(message!=''){
            return
        }
        const result = await post('',input)
        if(!result.ok){
            message = result.message
            return
        }
        goto(`/company/admin`)
    }
</script>
<div class={css.card} id="inputDiv">
    <Input type='tel' label="Mobile" bind:value={input.mobile} required />
    <Input type='password' label="Password" bind:value={input.passcode} required />
    <div class="flex gap-2 mt-2">
        <button class={css.btnSubmit} onclick={onLogin}>Login</button>
    </div>
    <Message {message} />
</div>