import { CountryModel } from "./models/country";
import { StateModel } from "./models/state";

async function initCountry(){
    let country = await CountryModel.findOne({name:'India'})
    if(!country){
        country = new CountryModel()
        country.name="India"
        country.code = "IND"
        await country.save()
    }
}

async function initStates(){
    const country = await CountryModel.findOne({name:'India'})
    if(country){
        const states = await StateModel.find({country:country._id})
        if(!states.length){
            const data =  [
            { name: 'Andhra Pradesh', code: 'AP' },
            { name: 'Arunachal Pradesh', code: 'AR' },
            { name: 'Assam', code: 'AS' },
            { name: 'Bihar', code: 'BR' },
            { name: 'Chhattisgarh', code: 'CG' },
            { name: 'Goa', code: 'GA' },
            { name: 'Gujarat', code: 'GJ' },
            { name: 'Haryana', code: 'HR' },
            { name: 'Himachal Pradesh', code: 'HP' },
            { name: 'Jharkhand', code: 'JH' },
            { name: 'Karnataka', code: 'KA' },
            { name: 'Kerala', code: 'KL' },
            { name: 'Madhya Pradesh', code: 'MP' },
            { name: 'Maharashtra', code: 'MH' },
            { name: 'Manipur', code: 'MN' },
            { name: 'Meghalaya', code: 'ML' },
            { name: 'Mizoram', code: 'MZ' },
            { name: 'Nagaland', code: 'NL' },
            { name: 'Odisha', code: 'OR' },
            { name: 'Punjab', code: 'PB' },
            { name: 'Rajasthan', code: 'RJ' },
            { name: 'Sikkim', code: 'SK' },
            { name: 'Tamil Nadu', code: 'TN' },
            { name: 'Telangana', code: 'TG' },
            { name: 'Tripura', code: 'TR' },
            { name: 'Uttar Pradesh', code: 'UP' },
            { name: 'Uttarakhand', code: 'UK' },
            { name: 'West Bengal', code: 'WB' }
            ]; 
            for(const state of data){
                state.country = country._id
            }
            await StateModel.insertMany(data,{ordered:false})
        }
    }
}




export async function initCollections(){
    await initCountry()
    await initStates()
}