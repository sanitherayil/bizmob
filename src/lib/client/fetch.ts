import { logError } from "./lib";
import { page } from "$app/state";
import { getSession } from "./session";



export async function post(url:string="",data:object) {
    try {
        // const token = getSession(); // Replace with your actual token
        if(!url){
            url = page.url.pathname
        }
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const msg = `Error: ${response.statusText}`
            logError(msg)
            return {ok:false,message:msg};
        }
        const result = await response.json();
        return result
        
    } catch (error) {
        logError(error)
        return {ok:false,message:error};
    }
}


export async function formdata(url:string="",data:FormData) {
    try {
        // const token = getSession(); // Replace with your actual token
        if(!url){
            url = page.url.pathname
        }
        const response = await fetch(url, {
            method: "POST",
            body: data
        });

        if (!response.ok) {
            const msg = `Error: ${response.statusText}`
            logError(msg)
            return {ok:false,message:msg};
        }
        const result = await response.json();
        return result
        
    } catch (error) {
        logError(error)
        return {ok:false,message:error};
    }
}


export async function get(url:string="") {
    try {
        if(!url){
            url = page.url.pathname
        }
        const response = await fetch(url, {
            method: "GET",
        });

        if (!response.ok) {
            const msg = `Error: ${response.statusText}`
            logError(msg)
            return {ok:false,message:msg};
        }
        const result = await response.json();
        return result
        
    } catch (error) {
        logError(error)
        return {ok:false,message:error};
    }
}

export async function DELETE(url:string="",id:string) {
    try {
        if(!id){
            logError("Id Not Present in Delete Request")
            return {ok:false,data:null}
        }
        // const token = getSession(); // Replace with your actual token
        if(!url){
            url = page.url.pathname
        }
        const server = `${url}?id=${id}`
        const response = await fetch(server, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const msg = `Error: ${response.statusText}`
            logError(msg)
            return {ok:false,message:msg};
        }
        const result = await response.json();
        return result
        
    } catch (error) {
        logError(error)
        return {ok:false,message:error};
    }
}





