import { userInput } from "../interface/input"
import  userModel from "../models/user"
import {hash,compare} from "bcrypt"
import * as dotenv from "dotenv"
dotenv.config()

export const registerUserS=async(inputData:userInput):Promise<boolean>=>{
    try{
        const {firstName,lastName,phoneNumber,email,password}=inputData
        const userExist=await userModel.findOne({firstName,lastName});
        if(userExist) throw new Error("User Already Exist ");
        
        //else
        const newUser=await userModel.create({
            firstName,
            lastName,
            phoneNumber,
            email,
            password:await hash(password,10)
        })
        await newUser.save();
        return true;


    }catch(e){
        console.log(e)
        throw e;
        
    }
}