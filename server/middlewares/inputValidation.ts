import{Request,Response,NextFunction} from 'express'
import joi from 'joi'


export const validateRegister=async(req:Request,res:Response,next:NextFunction)=>{
    try{
      
        const registerSchema=joi.object({
            firstName:joi.string().required(),
            lastName:joi.string().required(),
            phoneNumber:joi.string().required(),
            email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
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

export const validateLogin=async(req:Request,res:Response,next:NextFunction)=>{
    try{
      
        const loginSchema=joi.object({
            email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            password:joi.string().required(),
        })

        const{error,value}=await loginSchema.validate(req.body,{abortEarly:false})
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

export const validateMedicine=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const brandSchema=joi.object({
            brandName:joi.string().required(),
            company :joi.string().required(),
            description:joi.string().required(),
            brandDose:joi.string().required(),
            formulation:joi.string().required()
        })  
        const basicSchema=joi.object({
            usagePharmacologicCategory:joi.string().required(),
            adultDosing:joi.string().required(),
            pediatricsDosing:joi.string().required(),
            renalAdjustedDosing:joi.string().required(),
            hepaticDosing:joi.string().required(),
            administration:joi.string().required(),
            pregnancyRiskFactor:joi.string().required(),
            breastfeedingConsiderations:joi.string().required(),
            contradication:joi.string().required(),
            adverseEffects:joi.string().required(),
            pharmacology:joi.string().required(),
            drugInteractions:joi.string().required(),
            
        })  
        const medicineSchema=joi.object({
                genericName:joi.string().required(),
                brand:joi.array().items(brandSchema),
                basic:basicSchema,
            })
        const{error,value}=await medicineSchema.validate(req.body,{abortEarly:false})
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
    


export const validateBrand=async(req:Request,res:Response,next:NextFunction)=>{
    try{
      
        const brandSchema=joi.object({
            brandname:joi.string().required(),
            company:joi.string().required(),
            description:joi.string().required()
        })

        const{error,value}=await brandSchema.validate(req.body,{abortEarly:false})
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