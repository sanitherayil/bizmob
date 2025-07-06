<script>
	import { goto } from "$app/navigation";
	
    import { Input } from "$lib/component";
    import css from "$lib/client/css";
	import { post } from "$lib/client/fetch";
	import { validate } from "$lib/client/lib";
    
    let input = $state({name:'',mobile:'',email:'',condactPerson:'',cpMobile:''})
    let message = $state('')
    async function onSubmit(){
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
        const token = result.data.token
        goto(`/company/passcode/${token}`)
    }
</script>
<div class={`${css.card} max-w-3xl`} id="inputDiv">
    <div class={css.panel}>Company Registration</div>
    <Input label="Name" required bind:value={input.name}  />
    <div class={css.grid2} >
        <Input type='tel' label="Mobile" required bind:value={input.mobile} />
        <Input type='email' label="Email" bind:value={input.email}  />
        <Input label="Condact Person" bind:value={input.condactPerson} />
        <Input label="Mobile" bind:value={input.cpMobile} />
    </div>
    <div class="flex gap-2 mt-2">
        <button class={css.btnSubmit} onclick={onSubmit}>Submit</button>
    </div>
    {#if message}
        <div class={css.error}>{message}</div>    
    {/if}
</div>