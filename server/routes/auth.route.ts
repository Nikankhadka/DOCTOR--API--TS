import { Router } from "express";
import { loginC, registerUserC } from "../controllers/auth.controller";
import {validateRegister,validateLogin } from "../middlewares/inputValidation";

const router = Router();

router.post("/registerUser",validateRegister,registerUserC)
router.post("/login",validateLogin,loginC)








export default router;