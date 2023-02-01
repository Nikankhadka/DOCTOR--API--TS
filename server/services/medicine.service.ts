
import { IMedicine } from '../interface/Dbinterface';
import { MedicineInput } from '../interface/input';
import { brandModel } from '../models/brand';
import medicineModel from '../models/medicine';



export const createMedicineS = async(medicineData:MedicineInput):Promise<IMedicine> =>{
   try{
    const{genericName,brand,basic}=medicineData;
    //create brand by looping through brand array for each information 

    const medicineExist=await medicineModel.findOne({genericName});
    if(medicineExist) throw new Error("Medicine already exist");

    
   const promises=brand.map(async(brandinfo)=>{

   const brandExist= await brandModel.findOne({brandName:brandinfo.brandName})     
      if(brandExist){   
            //add +1 in brands Medicine Count
            brandExist.medicineCount=+1
            await brandExist.save()

            //just modofy the incoming brand input
            brandinfo.brand=brandExist._id
            return;
         }
      //else create new brand number
         const newBrand=await brandModel.create({
            brandName:brandinfo.brandName,
            company:brandinfo.company,
            description:brandinfo.description,
            medicineCount:1,
         })

         await newBrand.save();
         brandinfo.brand=newBrand._id;
    })

      //resolve all the promises
      await Promise.all(promises)

      //now create medicine 
      const newMedicine=await medicineModel.create({
         genericName,
         brand,
         basic
      })
    await newMedicine.save();
   return newMedicine;
    
   }catch(e){
    console.log(e);
    throw e;
   }
}


export const getAllMedicineS=async(page:string,limit:string):Promise<IMedicine[]>=>{
   try{
      
      const newlimit=parseInt(limit)
      const newpage=parseInt(page)
      const allMedicine=await medicineModel.find({}).limit(newlimit*1).skip((newpage-1)*newlimit).sort({genericName:"asc"}).populate("brand.brand");
      console.log(allMedicine);
      if(!allMedicine) throw new Error("Medicine data failed to fetch")
      return allMedicine;

   }catch(e){
      throw e;
   }

}

export const getAllMedicineNamesS=async(page:string,limit:string):Promise<IMedicine[]>=>{
   try{
      
      const newlimit=parseInt(limit)
      const newpage=parseInt(page)
      const allMedicine=await medicineModel.find({},"_id genericName").limit(newlimit*1).skip((newpage-1)*newlimit).collation({ locale: "en_US", strength: 2 }).sort({genericName:"asc"}).populate("brand.brand");
      console.log(allMedicine);
      if(!allMedicine) throw new Error("Medicine data failed to fetch")
      return allMedicine;

   }catch(e){
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
      
      //check medicine by id 
      const medicinExist=await medicineModel.findOne({_id:id})
      if(!medicinExist) throw new Error("Invalid Medicine Id")
      
      if(newData.brand){
         
        const promises= newData.brand.map(async(brandInfo)=>{
            
         
         //check for brand deletion

         if(brandInfo.Delete){
            //deacrease mdeicine count for that brand
            const brand= await brandModel.findOneAndUpdate({_id:brandInfo.brand},{$inc:{'medicineCount':-1}}).exec();
            return;
            }

         const brandExist= await brandModel.findOne({brandName:brandInfo.brandName})
         if(brandExist){
            brandInfo.brand=brandExist._id;
            return    
         }
           
         const newBrand=await brandModel.create({
               brandName:brandInfo.brandName,
               company:brandInfo.company,
               description:brandInfo.description
            })
         await newBrand.save();
         brandInfo.brand=newBrand._id;
         })


         await Promise.all(promises)
      }


      await medicineModel.findOneAndUpdate({_id:id},{...newData},{new:true})
      const updatedMedicine=await medicineModel.findOneAndUpdate({_id:id},{$pull:{brand:{Delete:true}}},{new:true}) 
      if(!updatedMedicine) throw new Error("medicine Update failed")
      return updatedMedicine;
      
   }catch(e){
      console.log(e)
      throw e;
      
   }
}




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
