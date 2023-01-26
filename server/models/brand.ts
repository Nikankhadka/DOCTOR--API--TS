import { Schema,model,Types } from "mongoose";
import { IBrand } from "../interface/Dbinterface";

const brandSchema = new Schema({
    brandName: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
   description:{
        type: String,
        required: true
   },
   medicineCount:Number


})

export const brandModel=model<IBrand>('Brand', brandSchema);
