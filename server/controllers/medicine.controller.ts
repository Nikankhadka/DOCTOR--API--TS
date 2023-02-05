import { NextFunction,query,Request,Response } from "express";

import { createMedicineS, deleteMedicineS, getAllMedicineS, getMedicineByIdS, updateMedicineByIdS,getAllMedicineNamesS,getMedicineCountS, medicineExcelS } from "../services/medicine.service";

import xlsx from "xlsx"
import { excelMedicineInput } from "../interface/input";


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

export const getMedicineCountC=async(req:Request,res:Response)=>{
    try{
        
        
        const medicineCount=await getMedicineCountS();
        res.status(200).json({success:true,medicineCount})


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

 export const medicineExcelC=async(req:Request,res:Response)=>{
    try{
        
        //first getbook
        const  medicineBook=xlsx.read(req.file?.buffer,{type:"buffer"});
        //get sheetNames since single file may contain multiple sheet
        const sheetNames = medicineBook.SheetNames;
        //only select first sheet
         const worksheet = medicineBook.Sheets[sheetNames[0]]
         //change the rows of data into array of objects with all the column header as property and valye
         const jsonData  =xlsx.utils.sheet_to_json(worksheet) ;
         
         //cast excel data as interface created 
         const medicineData:excelMedicineInput[]=jsonData as excelMedicineInput[]
         
        //pass array of excel json data into service layer
        const medicinesUploaded=await medicineExcelS(medicineData)
        if(medicinesUploaded) return res.status(200).json({success:true,message:"Medicine data from excel sheet uploaded succesfully"})

    }catch(e:any){
        console.log(e);
        res.status(400).json({success:false,error:e.message})
    }
 }