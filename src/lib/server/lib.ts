import { json, type RequestEvent } from "@sveltejs/kit"
import { logError } from "$lib/client/lib";


export async function getInput(event:RequestEvent){
    const {request} = event
    const input = await request.json()
    return input
}



export function sendData(data:object|null,message=""){
    try {
        return json({ok:true,data,message:message})
    } catch (error) {
        logError(error)
    }
}

export function sendError(message:string="Server Problem"){
    try {
        return json({ok:false,message:message})
    } catch (error) {
        logError(error)
    }
}
