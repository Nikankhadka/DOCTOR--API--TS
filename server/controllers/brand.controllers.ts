import { Request,Response } from "express"
import { createBrandS,getAllBrandS, getBrandByIdS, updateBrandS,deleteBrandS} from "../services/brand.service"


export const createBrandC=async(req:Request,res:Response)=>{
    try{
        const newBrand=await createBrandS(req.body);
       if(newBrand) res.status(200).json({success:true,message:`New brand successfully created ${newBrand} `})

    }catch(e:any){
        console.log(e)
        res.status(400).json({success:false,error:e.message})
    }
}


export const getAllBrandC=async(req:Request,res:Response)=>{
    try{
        const brands=await getAllBrandS();
        res.status(200).json({success:true,brands})
       
    }catch(e:any){
        console.log(e)
        res.status(400).json({success:false,error:e.message})
    }
}

export const getBrandByIdC=async(req:Request,res:Response)=>{
    try{
        const brandData=await getBrandByIdS(req.params.id)
        return res.status(200).json({success:true,brandData})
    }catch(e:any){
        console.log(e)
        res.status(400).json({success:false,error:e.message})
    }
}


export const updateBrandC=async(req:Request,res:Response)=>{
    try{
        const updatedBrandData=await updateBrandS(req.params.id,req.body)
       if(updatedBrandData) return res.status(200).json({success:true,updatedBrandData})

    }catch(e:any){
        console.log(e)
        res.status(400).json({success:false,error:e.message})
    }
}

export const deleteBrandC=async(req:Request,res:Response)=>{
    try{
        const deletedBrand=await deleteBrandS(req.params.id)
       if(deletedBrand) return res.status(200).json({success:true,Message:"brand deleed successfully"})

    }catch(e:any){
        console.log(e)
        res.status(400).json({success:false,error:e.message})
    }
}