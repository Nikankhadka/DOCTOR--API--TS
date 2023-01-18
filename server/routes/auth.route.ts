import { Router } from "express";

import { loginC, registerUserC } from "../controllers/auth.controller";
import { validateInput } from "../middlewares/inputValidation";
const router = Router();


router.post("/registerUser",validateInput,registerUserC)
router.post("/login",loginC)







export default router;