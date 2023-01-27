
import {Types} from "mongoose"
//interface/type for user schema in db 
 export interface IUser{
    firstName:string,
    lastName:string,
    phoneNumber:string,
    email:string,
    password: string
 }

 export interface IBrand{
    brandName:string,
    company:string,
    description:string,
    medicineCount?:number
}


 //for medicine schema in db
 export interface IMedicine{
    genericName:string,
    brand:brandData[],
    basic:basicData
 }







interface brandData{
    brand:Types.ObjectId|{
        brandName:string,
        company:string,
        description:string
    },
    brandDose:string,
    formulation:string,
}

export interface basicData{
    _id:string,
    usagePharmacologicCategory:string,
    adultDosing: string,
    pediatricsDosing:string,
    renalAdjustedDosing:string,
    hepaticDosing:string,
    administration:string,
    pregnancyRiskFactor:string,
    breastfeedingConsiderations:string,
    contradication:string,
    adverseEffects:string,
    pharmacology: string,
    drugInteractions:string,
}








