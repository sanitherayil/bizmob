import { logError } from "$lib/client/lib";
import { db } from "$lib/server/db";
import { company } from "$lib/server/db/schema";
import { getInput, sendData, sendError } from "$lib/server/lib";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from 'uuid';

import type { RequestEvent } from "./$types";

export async function POST(event:RequestEvent){
    try {
        const input = await getInput(event)
        const existingCompany = await db.select().from(company)
            .where(eq(company.mobile,input.mobile));
        if(existingCompany.length>0){
            return sendError('Company Mobile Number Already Exists')
        }
        let test=true
        while(test){
            const token = uuidv4();
            const isToken = await db.select().from(company)
                .where(eq(company.token,token));
            if(isToken.length>0){
                continue
            }
            test=false
            input.token = token
            await db.insert(company).values(input)
            return sendData({token:token})   
        }
    } catch (error) {
        logError(error)
        return sendError()
    }
}