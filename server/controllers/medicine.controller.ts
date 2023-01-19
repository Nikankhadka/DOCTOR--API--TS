import { NextFunction,Request,Response } from "express";
import { createMedicineS } from "../services/medicine.service";

export const createMedicineC=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const newMedicine=await createMedicineS(req.body)
        if(newMedicine) return res.status(200).json({success:true,message:`Medicine sucessfully created`,medicine:req.body})
    }catch(e:any){
        console.log(e)
        return res.status(400).json({sucess:false,message:e.message})
    }
}
