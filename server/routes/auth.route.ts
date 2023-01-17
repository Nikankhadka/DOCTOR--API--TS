import { Router } from "express";
import { registerUserC } from "../controllers/auth.controller";
import { validateInput } from "../middlewares/inputValidation";
const router = Router();


router.post("/registerUser",validateInput,registerUserC)








export default router;