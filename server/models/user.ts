import { Schema,model,Types } from "mongoose";

import { IUser } from "../interface/Dbinterface";

const userSchema = new Schema <IUser>({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

 const userModel=model<IUser>('User', userSchema);
 export default userModel;