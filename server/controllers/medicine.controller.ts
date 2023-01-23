import { NextFunction,Request,Response } from "express";

import { createMedicineS, getMedicineByIdS } from "../services/medicine.service";

export const createMedicineC=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        console.log(req.body)
        const newMedicine=await createMedicineS(req.body)
        if(newMedicine) return res.status(200).json({success:true,message:`Medicine sucessfully created`,medicine:req.body})
    }catch(e:any){
        console.log(e)
        return res.status(400).json({sucess:false,message:e.message})
    }
}

export const getMedicineByIdC=async(req:Request,res:Response)=>{
    try{
        const medicineData=await getMedicineByIdS(req.params.id)
       if(medicineData) return res.status(202).json({success:true,medicineData})
    }catch(e:any){
        console.log(e);
        res.status(404).json({success:false,err:e.message})
    }
}