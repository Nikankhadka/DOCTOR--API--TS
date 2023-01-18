import {Types} from "mongoose"
//interface/type for user schema in db 
 export interface IUser{
    _id:string,
    firstName:string,
    lastName:string,
    phoneNumber:string,
    email:string,
    password: string
 }

 export interface IBrand{
    brandName:string,
    company:string
    description:string
   
}


 //for medicine schema in db
 export interface IMedicine{
    genericName:string,
    brand:brandData[],
    basic:basicData
 }







interface brandData{
    _id:string,
    brand:string,
    brandDose:string,
    formulation:string,
}

interface basicData{
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






