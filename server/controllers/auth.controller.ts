import { Request,Response } from "express"
import { registerUserS } from "../services/auth.service"


export const registerUserC=async(req:Request,res:Response)=>{
    try{
        
        const newUser=await registerUserS(req.body)
        if(newUser) return res.status(200).json({success:true,message:`User account ${req.body.firstName} sucessfully registered`})

    }catch(e:any){
        console.log(e)
        return res.status(400).json({sucess:false,message:e.message})
        
    }
}
