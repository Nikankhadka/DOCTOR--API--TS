import medicine from '../models/medicine';
import { Request, Response } from 'express';
import { IMedicine } from '../interface/Dbinterface';
import { MedicineInput } from '../interface/input';
import { brandModel } from '../models/brand';
import userModel from '../models/user';
import medicineModel from '../models/medicine';
import { json } from 'stream/consumers';


export const createMedicineS = async(medicineData:MedicineInput):Promise<boolean> =>{
   try{
    const{genericName,brand,basic}=medicineData;
    //create brand by looping through brand array for each information 

    const medicineExist=await medicineModel.findOne({genericName});
    if(medicineExist) throw new Error("Medicine already exist");

    
    //cratea medicine 
    const newMedicine=await medicineModel.create({
      genericName,
      brand:[],
      basic
    })
    //just loop though the provided brnad data and add into above docs
    brand.forEach(async(brandinfo)=>{
      const brandExist=await brandModel.findOne({brandName:brandinfo.brandName})
      if(brandExist){
         //just update the mdeicine with brand information 
         newMedicine.brand.push({
            brand:brandExist._id,
            brandDose:brandinfo.brandDose,
            formulation:brandinfo.formulation,
         })
         newMedicine.save()
         return;
         
      }

      console.log("return bina else ma jado rahexa")
      //since brand does not exist post brand and push brand info
      const newBrand=await brandModel.create({
         brandName:brandinfo.brandName,
         company:brandinfo.company,
         description:brandinfo.description
      })
      
      //push brand info into medicine doc
      newMedicine.brand.push({
         brand:newBrand._id,
         brandDose:brandinfo.brandDose,
         formulation:brandinfo.formulation,
      })
      newMedicine.save()


    })

    //since everything is done 
    return true;
    
   }catch(e){
    console.log(e);
    throw e;
   }
}

export const getMedicineByIdS=async(id:string):Promise<IMedicine>=>{
   try{

      //this helps to define the type that is going to be returned
      const medicine= await medicineModel.findOne({_id:id}).populate("brand.brand")
     console.log(medicine)
      if(!medicine) throw new Error("Invalid Medicine Id")
       
      return medicine;
   }catch(e){
      console.log(e)
      throw e;
   }
}

export const updateMedicineByIdS=async(id:string,newData:Partial<IMedicine>)=>{
   try{  
      //check if brand is needed to be updated
   
      const updatedMedicine=await medicineModel.findOneAndUpdate({_id:id},newData,{new:true})
      
   }catch(e){
      console.log(e)
   }
}