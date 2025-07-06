import { logError } from "./lib"

const sessionKey = 'ams_token'

export function setSession(token:string){
    try {
        sessionStorage.setItem(sessionKey,token)
    } catch (error) {
        logError(error)
    }
}

export function getSession(){
    try {
        return sessionStorage.getItem(sessionKey)
    } catch (error) {
        logError(error)
    }
}

export function clearSession(){
    try {
        sessionStorage.removeItem(sessionKey)
    } catch (error) {
        logError(error)
    }
}