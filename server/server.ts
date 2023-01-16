//import express function and creare app instance 
import express from "express"
const app=express()


//necessary imports 
import * as dotenv from "dotenv"
import session from "express-session"
import cookieParser from "cookie-parser"
import cors from "cors"
import dbConnect from "./Configs/db"




//importing routes


  

//app level middleware setup
dotenv.config() 
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors({
    //defines the origin of the request
    origin:"http://localhost:3000",
    //headers can be accessed and modified else cant
    credentials:true
}))

app.use(session({
    secret:process.env.sessionSecret!,
    resave:false,
    saveUninitialized:false,
    cookie:{    
        maxAge:1000*60*60*24*7,
        //session data saved in http cookie which is only acessed in server
        httpOnly:true,
        //only accepts request from the https 
        secure:false,
    }

    //can store session data in db incase server crash the data is not lost
//  store:
}))

//attaches cookie from header to req object
app.use(cookieParser())
app.use(dbConnect)






//routes registration  before defning any routes 

//define prefix else nothing but the routepath  within the router should be uniqe







//listen to server on ports
app.listen(2900,
    async()=>console.log("server started at port 2900")
)







