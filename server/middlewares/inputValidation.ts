import{Request,Response,NextFunction} from 'express'
import joi from 'joi'


export const validateInput=async(req:Request,res:Response,next:NextFunction)=>{
    try{
      
        const registerSchema=joi.object({
            firstName:joi.string().required(),
            lastName:joi.string().required(),
            phoneNumber:joi.string().required(),
            email:joi.string().required(),
            password:joi.string().required(),
        })

        const{error,value}=await registerSchema.validate(req.body,{abortEarly:false})
        if(error){
            console.log(error.details)
            return res.status(400).json({success:false,message:error.message})
        }
        console.log(value)
        next()

    }catch(err){
        return res.status(400).json(err)
    }
}