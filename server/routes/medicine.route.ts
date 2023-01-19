
import { Router } from "express";
import { createMedicineC } from "../controllers/medicine.controller";
import { verifyaccessToken } from "../middlewares/auth";
import { validateMedicine } from "../middlewares/inputValidation";
const router=Router();


router.post("/createMedicine",validateMedicine,createMedicineC)


export default router;
