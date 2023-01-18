import { Router } from "express";

import { loginC, registerUserC } from "../controllers/auth.controller";
import { validateRegister } from "../middlewares/inputValidation";
const router = Router();

router.post("/registerUser",validateRegister,registerUserC)
router.post("/login",loginC)







export default router;