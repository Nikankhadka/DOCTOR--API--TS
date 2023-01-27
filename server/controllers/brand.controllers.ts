import { Request,Response } from "express"
import { createBrandS,getAllBrandS} from "../services/brand.service"


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