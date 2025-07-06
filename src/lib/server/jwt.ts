//@ts-nocheck
import { logError } from "$lib/lib";
import jwt from "jsonwebtoken";
import type { Cookies, RequestEvent } from "@sveltejs/kit";
import { COOKIE_ID } from "./serverConfig";

const jwt_key = 'biz@2025@123'


export function generateJWTToken(payload:any) {
    return jwt.sign(payload, jwt_key, { expiresIn: "10h" }); 
}

export function verifyJWTToken(token:string) {
    try {
        const decoded = jwt.verify(token, jwt_key);
        return decoded;
    } catch (error) {
        logError(error)
        return null;
    }
}


export function getUser(event:RequestEvent){
    try {
        const token =  event.cookies.get(COOKIE_ID);
        if(!token || token=='null'){
            return null
        }
        const user = verifyJWTToken(token)
        return user
    } catch (error) {
        logError(error)
        return null
    }
}

