import {IBrand, IMedicine} from "../interface/Dbinterface"
import { brandModel } from "../models/brand"

export const createBrandS=async(brandData:IBrand)=>{
    try{
        //check if brand exist
        const{brandName,company,description}=brandData
        const brandExist=await brandModel.findOne({brandName})
        if(brandExist)throw new Error("Brand already Exist please add another Brand");

        //since brand does not exist create new brand
        const newBrand=await brandModel.create({
            brandName,
            company,
            description,
            medicineCount:0
        })
        await newBrand.save();

        return newBrand;
    }catch(e){
        console.log(e);
        throw e;
    }
}


export const getAllBrandS=async():Promise<IBrand[]>=>{
    try{
        const allBrands=await brandModel.find();
        return allBrands;
    }catch(e){
        console.log(e)
        throw e;
    }
}

export const getBrandByIdS=async(id:string):Promise<IBrand>=>{
    try{
        const brandData=await brandModel.findOne({_id:id});
        if(!brandData) throw new Error("Invalid Brand Id")
        return brandData;
    }catch(e){
        console.log(e)
        throw e;
    }
}

export const updateBrandS=async(id:string,brandData:Partial<IBrand>):Promise<IBrand>=>{
    try{
        const brandExist=await brandModel.findOne({_id:id});
        if(!brandExist) throw new Error("Invalid Brand Id")
        
        //now just update the brand with provided information
        const updatedBrand=await brandModel.findOneAndUpdate({_id:id},{...brandData},{new:true})
         if(!updatedBrand) throw new Error("brand update failed")
         return updatedBrand
    }catch(e){
        console.log(e)
        throw e;
    }
}


export const deleteBrandS=async(id:string):Promise<boolean>=>{
    try{
        const brandExist=await brandModel.findOne({_id:id});
        if(!brandExist) throw new Error("Invalid Brand Id")
        
        //now just update the brand with provided information
        const deleteBrand=await brandModel.deleteOne({_id:id})
         if(!deleteBrand) throw new Error("brand delete failed")
         return true;
        
    }catch(e){
        console.log(e)
        throw e;
    }
}