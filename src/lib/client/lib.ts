//@ts-nocheck

import { LOGGING } from "./config";
export function toFixed(num:number,decimal:number=2){
    return Number(num.toFixed(decimal))
}


export function logError(error:unknown){
    if(LOGGING){
        console.log(error)
    }
}

export function prepareData(obj: Record<string, any>) {
    for (const key in obj) {
        if (typeof obj[key] === "string") {
            obj[key] = obj[key].trim();
        } else if (typeof obj[key] === "object" && obj[key] !== null) {
            prepareData(obj[key]); // Recursively trim nested objects
        }
    }
}

export function dateConvert(date:string){
    const _date = new Date(date);
    const formattedDate = _date.toLocaleDateString("en-GB"); // "YYYY-MM-DD"
    return formattedDate
}

export function shuffleArray(array:any[]) {
    try {
        let newArray = [...array]; // Copy the original array to avoid mutation
        for (let i = newArray.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1)); // Get random index
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // Swap elements
        }
        return newArray;        
    } catch (error) {
        logError(error)
    }
}

export function toNumber(num:string){
    let number = parseFloat(num)
    if(isNaN(number)){
        return 0
    }
    return number
}

export function deleteProperty(obj:object,name:string){
    if (name in obj) {
        delete obj[name];
    }
}

export function toObject(obj:any){
    const document = JSON.parse(JSON.stringify(obj))
    return document
}

export function validate(id:string){
    try {
        if(!id){
            logError("No ID Given");
        }
        let message=''
        const requiredElements = document.querySelectorAll(`#${id} :required`);
        for(const el of requiredElements){
            let value = el.value
            if(el.type=='number'){
                value = toNumber(value)
            }
            if(el.type=='file'){
                if(!el.files.length){
                    value = null
                } else {
                    value = el.files[0]
                }
            }
            if(!value){
                const label = el.dataset.label
                if(el.type.includes('select')){
                    message = `Please Select ${label}`
                    el.focus()
                    return message
                } else if(el.type=='file'){
                    message = `Please Select ${label}`
                    el.focus()
                    return message
                } else {
                    message=`Invalid data in ${label}`
                    el.focus()
                    return message
                }
            }
        }
        return ''
    } catch (error) {
        logError(error)
        return ''
    }
}

export function toDate(ddmmyyyy:string,sep="-"){
    const [day, month, year] = ddmmyyyy.split(sep).map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));
    return date
}


export function countByProperty(arr, prop) {
    return arr.reduce((acc, item) => {
        const key = item[prop];
        acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, {});
}
