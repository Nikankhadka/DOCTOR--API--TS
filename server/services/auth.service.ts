import { userInput } from "../interface/input"
import userModel from "../models/user"
import { hash, compare } from "bcrypt"
import * as dotenv from "dotenv"
import { type } from "os"
import { sign } from "jsonwebtoken"



declare module 'jsonwebtoken' {
    export interface JwtPayload {
        email: string,
    }
}
import * as jwt from "jsonwebtoken"

dotenv.config()

export const registerUserS = async (inputData: userInput): Promise<boolean> => {
    try {
        const { firstName, lastName, phoneNumber, email, password } = inputData
        const userExist = await userModel.findOne({ firstName, lastName });
        if (userExist) throw new Error("User Already Exist ");

        //else
        const newUser = await userModel.create({
            firstName,
            lastName,
            phoneNumber,
            email,
            password: await hash(password, 10)
        })
        await newUser.save();
        return true;


    } catch (e) {
        console.log(e)
        throw e;

    }
}

export const loginUserS = async (loginDto: LoginDto): Promise<LoginResponse> => {
    try{
        const user = await userModel.findOne({ email: loginDto.email });
        if (!user) {
            throw new Error("User Not Found")
        }
        if (await compare(loginDto.password, user.password)) {
            const token = sign({ email: user.email }, process.env.tokenSecret!, { expiresIn: '1d' });
            return {
                token,
                user: {
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
   catch(e){
     throw e;
   }


}



export const verifyAccessTokenS = async (token: string): Promise<{ email: string }> => {
    try {
        const { email } = await <jwt.JwtPayload>jwt.verify(token, process.env.tokenSecret!)
        const isValid = await userModel.findOne({ email });
        if (!isValid) throw new Error("invalid token data")
        return { email }
    } catch (e) {
        console.log(e)
        throw e;
    }
}



export type LoginDto = {
    email: string;
    password: string;

}

export type LoginResponse = {
    token: string;
    user: User;
}

type User = {
   
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string
}




