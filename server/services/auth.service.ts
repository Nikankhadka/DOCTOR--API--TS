import { userInput } from "../interface/input"
import  userModel from "../models/user"
import {hash,compare} from "bcrypt"
import * as dotenv from "dotenv"
import { type } from "os"
import {sign} from "jsonwebtoken"

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
export const loginUserS=async(loginDto:LoginDto):Promise<LoginResponse> => {
        const user = await userModel.findOne({email: loginDto.email});
        if(!user) {
            throw new Error("User does not exists");
        }
        if( await compare(loginDto.password, user.password) )
        {
            const token = sign({id: user._id}, "test", {expiresIn: '1d'});
            return {
                token,
                user: {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    phoneNumber: user.phoneNumber,
                    email: user.email
                }
            };
        } else {
            throw new Error("Invalid Credentials")
        }
    }


export type LoginDto = {
    email:string;
    password:string;

}

export type LoginResponse = {
    token:string;
    user:User;
}

type User = {
    id: string;
    firstName: string;
    lastName:string;
    phoneNumber:string;
    email:string
}