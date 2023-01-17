import { Router } from "express";
import { registerUserC } from "../controllers/auth.controller";
import { validateRegister } from "../middlewares/inputValidation";
const router = Router();


router.post("/registerUser",validateRegister,registerUserC)

//






export default router;