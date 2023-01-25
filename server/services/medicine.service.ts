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

export const updateMedicineByIdS=async(id:string,newData:Partial<MedicineInput>):Promise<IMedicine>=>{
   try{  
      //check if brand is needed to be updated
      if(newData.brand){
         //loop through and check 
         newData.brand.forEach(async(brandInfo)=>{
            //just check the name that is passed in input to update the brand information 
            const brandExist= await brandModel.findOne({brandName:brandInfo.brandName})
            if(brandExist){
              brandInfo.brand=brandExist._id;
               delete brandInfo.brandName;
               delete brandInfo.company;
               delete brandInfo.description;  
               return    
            }
            //if brand does not exist add new brand information and ref it in to the medicine 
            const newBrand=await brandModel.create({
               brandName:brandInfo.brandName,
               company:brandInfo.company,
               description:brandInfo.description
            })
            newBrand.save();
            brandInfo.brand=newBrand._id;
            return
         })
      }
      const updatedMedicine=await medicineModel.findOneAndUpdate({_id:id},newData,{new:true}).populate("brand.brand");
      if(!updatedMedicine) throw new Error("medicine Update failed")
      return updatedMedicine;
      
   }catch(e){
      console.log(e)
      throw e;
      
   }
}
//delete medicine
 export const deleteMedicineS=async(id:string):Promise<boolean>=>{
   try{
      const deletedMedicine=await medicineModel.findOneAndDelete({_id:id});
      if(!deletedMedicine) throw new Error("Medicine delete failed")
      return true;
   }catch(e){
      console.log(e)
      throw e;
   }
}
