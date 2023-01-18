import { string } from "joi";
import { Schema,model,Types } from "mongoose";
import { IMedicine } from "../interface/Dbinterface";


const medicineSchema = new Schema({
  genericName: {
    type: String,
    required: true,
  },
  brand: [
    {
      brand:{type:Types.ObjectId,ref:"Brand"},
      brandDose: {
        type: String,
        required: true,
      },
      formulation: {
        type: String,
        required: true,
      },
    },
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
      required: true,
    },
  },
});

const medicineModel= model<IMedicine>("Medicine", medicineSchema);

export default medicineModel;


