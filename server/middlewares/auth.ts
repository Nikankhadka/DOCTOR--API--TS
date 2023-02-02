import { NextFunction,Request,Response} from 'express';
import {verify} from 'jsonwebtoken';
import { verifyAccessTokenS } from '../services/auth.service';

declare module "express-serve-static-core" {
    interface Request {
      user:{
        email:string
     }}
    }







export const verifyAccessToken=async(req:Request,res:Response,next:NextFunction)=>{
  
    if(!req.headers.authorization) return res.status(401).json({success:false,message:"bearer token not found"});
    let token = req.headers.authorization;
    token = token.split(" ")[1];
    console.log(token);
    
    try{
    const verifiedtoken=await verifyAccessTokenS(token);
    console.log("token sucessfully verified")
    req.user=verifiedtoken;
    next()   

}catch(e){
    console.log(e)
    return res.status(401).json({success:false,message:"invalid request credential"})
}

}

