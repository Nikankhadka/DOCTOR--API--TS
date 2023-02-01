import { NextFunction,query,Request,Response } from "express";

import { createMedicineS, deleteMedicineS, getAllMedicineS, getMedicineByIdS, updateMedicineByIdS,getAllMedicineNamesS } from "../services/medicine.service";

   


export const createMedicineC=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        console.log(req.body)
        const newMedicine=await createMedicineS(req.body)
        if(newMedicine) return res.status(200).json({success:true,message:`Medicine sucessfully created`,newMedicine})
    }catch(e:any){
        console.log(e)
        return res.status(400).json({sucess:false,message:e.message})
    }
}


export const getAllMedicineC=async(req:Request,res:Response)=>{
    try{
        
        const page:string=req.query.page as string
        const limit:string=req.query.limit as string
        const medicineData=await getAllMedicineS(page,limit);
        res.status(200).json({success:true,medicineData})


    }catch(e:any){
        res.status(204).json({success:false,error:e.message})
        console.log(e)
    }
}
export const getAllMedicineNamesC=async(req:Request,res:Response)=>{
    try{
        
        const page:string=req.query.page as string
        const limit:string=req.query.limit as string
        const medicineData=await getAllMedicineNamesS(page,limit);
        res.status(200).json({success:true,medicineData})


    }catch(e:any){
        res.status(204).json({success:false,error:e.message})
        console.log(e)
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

export const updateMedicinbyIdC=async(req:Request,res:Response)=>{
    try{
        console.log(req.body)
        const UpdatedMedicine=await updateMedicineByIdS(req.params.id,req.body)
        if(UpdatedMedicine) return res.status(200).json({success:true,UpdatedMedicine})
    }catch(e:any){
        console.log(e)
        res.status(404).json({success:false,err:e.message})
    }
}
 

 export const deleteMedicineC=async(req:Request,res:Response)=>{
        try{
            const medicineDeleted=await deleteMedicineS(req.params.id)
            if(medicineDeleted) return res.status(200).json({success:true,message:"Medicine deleted sucessfully"})
        }catch(e:any){
            console.log(e)
            res.status(404).json({success:false,err:e.message})
            
        }
 }