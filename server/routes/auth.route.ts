import { Router } from "express";
import { Request,Response } from "express";
import { loginC, registerUserC } from "../controllers/auth.controller";
import { validateMedicine, validateRegister } from "../middlewares/inputValidation";
import { verify } from "jsonwebtoken";
const router = Router();

router.post("/registerUser",validateRegister,registerUserC)
router.post("/login",loginC)

router.get("/verifytoken",(req:Request,res:Response)=>{
    console.log(req.headers.authorization);
    res.send(verify(req.headers.authorization!,"hello"))
})






export default router;