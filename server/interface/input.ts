import { Types } from "mongoose"
import { basicData } from "./Dbinterface"

export interface userInput{
    
    firstName:string,
    lastName:string,
    phoneNumber:string,
    email:string,
    password: string
 }



 interface brandData{
   brand?:Types.ObjectId,
   Delete:boolean,
    brandName?:string,
    company?:string,
    description?:string,
    brandDose:string,
    formulation:string,
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
 
 export interface MedicineInput{
    genericName:string,
    brand:brandData[],
    basic:basicData

 }



 export interface excelMedicineInput{
   genericName:string,
   brandName:string,
    company:string,
    description:string,
    brandDose:string,
    formulation:string
   _id?:string,
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
    drugInteractions:string
 }