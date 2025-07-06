//@ts-nocheck

import Papa from "papaparse";
import { logError } from "./lib";

export async function readCSV(file:File){
    try {
        const text = await file.text();
        const { data } = Papa.parse(text, { header: true, skipEmptyLines: true });
        return data
    } catch (error) {
        logError(error)
    }
}