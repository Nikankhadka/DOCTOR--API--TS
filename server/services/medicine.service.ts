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

    
   const promises=brand.map(async(brandinfo)=>{

   const brandExist= await brandModel.findOne({brandName:brandinfo.brandName})     
      if(brandExist){   
            brandinfo.brand=brandExist._id,
            delete brandinfo.brandName
            delete brandinfo.company
            delete brandinfo.description
            return;
         }
   //else create new brand number
         const newBrand=await brandModel.create({
            brandName:brandinfo.brandName,
            company:brandinfo.company,
            description:brandinfo.description
         })
         await newBrand.save();
         brandinfo.brand=newBrand._id;
         delete brandinfo.brandName
            delete brandinfo.company
            delete brandinfo.description
 })
      await Promise.all(promises)

      //now create medicine 
      const newMedicine=await medicineModel.create({
         genericName,
         brand,
         basic
      })
      await newMedicine.save();
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
      
      if(newData.brand){
         
        const promises= newData.brand.map(async(brandInfo)=>{
            
            const brandExist= await brandModel.findOne({brandName:brandInfo.brandName})
            if(brandExist){
               console.log("brandExist")
              brandInfo.brand=brandExist._id;
               delete brandInfo.brandName;
               delete brandInfo.company;
               delete brandInfo.description;  
               console.log(brandInfo)
               return    
            }
           
            const newBrand=await brandModel.create({
               brandName:brandInfo.brandName,
               company:brandInfo.company,
               description:brandInfo.description
            })
            await newBrand.save();
            brandInfo.brand=newBrand._id;
           delete brandInfo.brandName;
           delete brandInfo.company;
           delete brandInfo.description;
           console.log("this is modified newdata",brandInfo)
         })

         await Promise.all(promises)
      }
      const updatedMedicine=await medicineModel.findOneAndUpdate({_id:id},{...newData},{new:true}).populate("brand.brand");
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
