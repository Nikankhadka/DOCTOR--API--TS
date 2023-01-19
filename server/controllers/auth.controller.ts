import { Request,Response } from "express"
import { loginUserS, registerUserS } from "../services/auth.service"


export const registerUserC=async(req:Request,res:Response)=>{
    try{
        
        const newUser=await registerUserS(req.body)
        if(newUser) return res.status(200).json({success:true,message:`User account ${req.body.firstName} sucessfully registered`})

    }catch(e:any){
        console.log(e)
        return res.status(400).json({sucess:false,message:e.message})
        
    }
}

export const loginC=async(req:Request, res:Response)=>{
    try{
        return res.status(200).json(await loginUserS(req.body))
    }
    catch(e:any){
        return res.status(405).json({success:false,message:e.message})
    }
}