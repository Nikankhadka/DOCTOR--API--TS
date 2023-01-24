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
    brandName?:string,
    company?:string,
    description?:string,
    brandDose:string,
    formulation:string,
 }
 
 export interface MedicineInput{
    genericName:string,
    brand:brandData[],
    basic:basicData

 }