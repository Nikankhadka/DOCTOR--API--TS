
import { Router } from "express";
import { createMedicineC, deleteMedicineC, getMedicineByIdC, updateMedicinbyIdC,getAllMedicineC } from "../controllers/medicine.controller";
import { verifyAccessToken } from "../middlewares/auth";
import { validateMedicine } from "../middlewares/inputValidation";
const router=Router();



router.get("/getMedicine",getAllMedicineC)
router.get("/getMedicine/:id",getMedicineByIdC)


//any middleware function will only apply if it is declared before routes where it is needed to apply
router.use(verifyAccessToken)
router.post("/createMedicine",validateMedicine,createMedicineC)
router.patch("/updateMedicine/:id",updateMedicinbyIdC)
router.delete("/deleteMedicine/:id",deleteMedicineC);   

export default router;
