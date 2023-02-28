import { string } from "joi";
import { Schema,model,Types } from "mongoose";
import { IMedicine } from "../interface/Dbinterface";


const medicineSchema = new Schema({
  genericName: {
    type: String,
    required: true,
    unique:true
  },
  brand: [
    {
      brand:{type:Types.ObjectId,ref:"Brand"},
//brand will contain the below props on get since brand will be populated 
  //       type: String,
  //       required: true
  //   },
  //   company: {
  //       type: String,
  //       required: true
  //   },
  //  description:{
  //       type: String,
  //       required: true
  //  },
  //  medicineCount:Number

      brandDose: {
        type: String,
        
      },
      formulation: {
        type: String,
       
      },
    }
  ],
  basic: {
    usagePharmacologicCategory: {
      type: String,
      required: true,
    },
    adultDosing: {
      type: String,
      required: true,
    },
    pediatricsDosing: {
      type: String,
      required: true,
    },
    renalAdjustedDosing: {
      type: String,
      required: true,
    },
    hepaticDosing: {
      type: String,
      required: true,
    },
    administration: {
      type: String,
      required: true,
    },
    pregnancyRiskFactor: {
      type: String,
      required: true,
    },
    breastfeedingConsiderations: {
      type: String,
      required: true,
    },
    contradication: {
      type: String,
      required: true,
    },
    adverseEffects: {
      type: String,
      required: true,
    },
    pharmacology: {
      type: String,
      required: true,
    },
    drugInteractions: {
      type: String,
    },
  },
});

const medicineModel= model<IMedicine>("Medicine", medicineSchema);

export default medicineModel;


