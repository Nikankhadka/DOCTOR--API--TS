import { Router } from "express";
import { Request,Response } from "express";
import { loginC, registerUserC } from "../controllers/auth.controller";
import {validateRegister,validateLogin } from "../middlewares/inputValidation";
import { verify } from "jsonwebtoken";
const router = Router();

router.post("/registerUser",validateRegister,registerUserC)
router.post("/login",validateLogin,loginC)








export default router;