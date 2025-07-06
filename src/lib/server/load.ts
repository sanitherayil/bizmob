import { logError, toObject } from "$lib/client/lib";
import { Institute } from "../../models/institute";
import { Trade } from "../../models/trade";
import { connectDB, convertToPlainObject, getDocumentById } from "./db";
let db:any=null
async function connect(){
    db = await connectDB()
}
connect()

export async function getTradesByInstitute(instId:string){
    const col = db.collection('instituteTrade')
    const result = await col.find({institute:instId}).toArray()
    const trades = convertToPlainObject(result)
    for(const trade of trades){
        const _trade = await getDocumentById(trade.tradeId,'trade')
        trade.trade = _trade
    }
    return trades
}


export async function getInstitutes(filter:object){
    const institutes = await Institute.find(filter).sort({name:1})
    return convertToPlainObject(institutes)
}

export async function getTrades(){
    const trades = await Trade.find().sort({name:1})
    return convertToPlainObject(trades)
}

// export async function getInstitutes(filter={}){
//     const db = await connectDB()
//     const col = db.collection('institute')
//     const result = await col.find(filter).sort({name:1}).toArray()
//     const institutes = convertToPlainObject(result)
//     return institutes;  
// }


export async function getCounsellings(instituteId:string){
    const query = {
        institute:instituteId,
    }

    const options = {
        sort:{
            _id:-1,
        }
    };
    const db =await  connectDB()
    const counselling = db.collection('counselling')
    const documents = await counselling.find(query, options).toArray();
    const data = await convertToPlainObject(documents)
    return data
}

export async function getOpenCounsellings(instituteId:string){
    const query = {
        institute:instituteId,
        closed:false,
    }

    const options = {
        sort:{
            _id:-1,
        }
    };
    const db =await  connectDB()
    const counselling = db.collection('counselling')
    const documents = await counselling.find(query, options).toArray();
    const data = await convertToPlainObject(documents)
    return data
}

export async function getClosedCounsellings(instituteId:string){
    const query = {
        institute:instituteId,
        closed:true,
    }

    const options = {
        sort:{
            _id:-1,
        }
    };
    const db =await  connectDB()
    const counselling = db.collection('counselling')
    const documents = await counselling.find(query, options).toArray();
    const data = await convertToPlainObject(documents)
    return data
}


export async function getRoasterCounsellings(instituteId:string){
    const query = {
        institute: instituteId,
        closed: true,
        $or: [
            { roasted: false },
            { roasted: { $exists: false } }
        ]
    }

    const options = {
        sort:{
            _id:-1,
        }
    };
    const db =await  connectDB()
    const counselling = db.collection('counselling')
    const documents = await counselling.find(query, options).toArray();
    const data = await convertToPlainObject(documents)
    return data
}


export async function getRoasteredCounsellings(instituteId:string){
    const query = {
        institute: instituteId,
        closed: true,
        roasted:true,
    }

    const options = {
        sort:{
            _id:-1,
        }
    };
    const db =await  connectDB()
    const counselling = db.collection('counselling')
    const documents = await counselling.find(query, options).toArray();
    const data = await convertToPlainObject(documents)
    return data
}



