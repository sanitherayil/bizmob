import { db } from "$lib/server/db"
import { company } from "$lib/server/db/schema"
import { redirect } from "@sveltejs/kit";
import { eq } from "drizzle-orm"

export async function load({params}){
    const token = params.id
    const [data] = await db.select().from(company).where(eq(company.token,token))
        .limit(1);
    if(!data){
        throw redirect(302,'/company/create')
    }
    return {company:data}
}