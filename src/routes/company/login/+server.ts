import { logError } from "$lib/client/lib";
import { getInput, sendError } from "$lib/server/lib";
import type { RequestEvent } from "./$types";

export async function POST(event:RequestEvent){
    try {
        const input = await getInput(event)
        const {mobile,passcode} = input
        
    } catch (error) {
        logError(error)
        return sendError()
    }
}