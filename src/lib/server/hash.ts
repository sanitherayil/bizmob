import bcrypt from "bcryptjs";
import { logError } from "$lib/client/lib";

export async function hashPassword(password:string){
    try {
        const salt = await bcrypt.genSalt(10); // Generate a salt
        const hash = await bcrypt.hash(password, salt); // Hash the password
        return hash;
    } catch (error) {
        logError(error)
    }
}

export async function verifyPassword(password:string,hashedPassword:string){
    try {
        const match = await bcrypt.compare(password, hashedPassword);
        return match;
    } catch (error) {
        logError(error)
    }
}