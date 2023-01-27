import {IBrand} from "../interface/Dbinterface"
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