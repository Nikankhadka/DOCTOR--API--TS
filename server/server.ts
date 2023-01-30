//import express function and creare app instance 
import express from "express"
const app=express()


//necessary imports 
import * as dotenv from "dotenv"
//import session from "express-session"
import cookieParser from "cookie-parser"
import cors from "cors"
import dbConnect from "./Configs/db"




//importing routes
import authRoute from "./routes/auth.route"
import medicineRoute from "./routes/medicine.route"
import brandRoute from"./routes/brand.route"
  

//app level middleware setup
dotenv.config() 
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors({
    //defines the origin of the request
    origin:"*",
    //headers can be accessed and modified else cant
    credentials:true
}))



//attaches cookie from header to req object
app.use(cookieParser())
dbConnect()







//route registration to the application

app.use("/auth/v1",authRoute)
app.use("/medicine/v1",medicineRoute)
app.use("/brand/v1",brandRoute)




//listen to server on ports
app.listen(2900,
    async()=>console.log("server started at port 2900")
)







