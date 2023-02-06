import {connect,set} from "mongoose"
import {Request,Response,NextFunction} from "express"
import * as dotenv from "dotenv"

dotenv.config()

    
const dbConnect=async()=>{
    try{
        set('strictQuery', true);
         await connect(`mongodb+srv://Doctor:doctordon1@doctordb.gdk6uh0.mongodb.net/test`)
         console.log("Database Connected")
              
    }catch(e){
        console.log(e);
    }
}


export default dbConnect;


