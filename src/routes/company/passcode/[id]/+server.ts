import { logError } from "$lib/client/lib";
import { db } from "$lib/server/db";
import { login } from "$lib/server/db/schema";
import { hashPassword } from "$lib/server/hash";
import { getInput, sendData, sendError } from "$lib/server/lib";
import type { RequestEvent } from "./$types";

export async function POST(event:RequestEvent){
    try {
        const input = await getInput(event)
        const {companyId,pass2} = input
        const passcode = await hashPassword(pass2)
        const data = {companyId,passcode}
        await db.insert(login).values(data)
        return sendData({})
    } catch (error) {
        logError(error)
        return sendError()
    }
}