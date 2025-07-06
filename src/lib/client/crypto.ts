import CryptoJS from "crypto-js"
import { logError } from "./lib";

export function encrypt(msg:string,key:string){
    try {
        return CryptoJS.AES.encrypt(msg, key).toString();
    } catch (error) {
        logError(error)
    }
}

export function decrypt(msg:string,key:string){
    try {
        return CryptoJS.AES.decrypt(msg, key).toString(CryptoJS.enc.Utf8);
    } catch (error) {
        logError(error)
    }
}