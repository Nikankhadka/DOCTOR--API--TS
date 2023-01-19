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

    const user = await userModel.findOne({ email: loginDto.email });
    if (!user) {
        throw new NotFoundError("User Not Found")
    }
    if (await compare(loginDto.password, user.password)) {
        const token = sign({ email: user.email }, process.env.tokenSecret!, { expiresIn: '1d' });
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
        throw new InvalidCredentialsError("Invalid Credentials")
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
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string
}


export class NotFoundError extends Error{
    public status:number=404;
    constructor(message:string){
        super(message);
        this.name="NotFoundError"
    }
}

export class InvalidCredentialsError extends Error{
    public status:number=401;
    constructor(message:string){
        super(message);
        this.name="InvalidCredentialsError"
    }
}

