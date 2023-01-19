import medicine from '../models/medicine';
import { Request, Response } from 'express';
import { medicineInput } from "../interface/input";

export const createMedicineS = async(inputData:medicineInput,):Promise<boolean> =>{
    try{
        const {genericName,brand}=inputData
        const medicineExist=await medicine.findOne({genericName,brand});
        if(medicineExist) throw new Error("Medicine Already Exist ");
        
        //else
        const newMedicine=await medicine.create({
            genericName,
            brand
        })
        await newMedicine.save();
        return true;

    }catch(e){
        console.log(e)
        throw e;
        
    }
}