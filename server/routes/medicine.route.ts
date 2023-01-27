
import { Router } from "express";
import { createMedicineC, deleteMedicineC, getMedicineByIdC, updateMedicinbyIdC,getAllMedicineC } from "../controllers/medicine.controller";
import { verifyAccessToken } from "../middlewares/auth";
import { validateMedicine } from "../middlewares/inputValidation";
const router=Router();



router.get("/getMedicine",getAllMedicineC)
router.get("/getMedicine/:id",getMedicineByIdC)


//any middleware function will only apply if it is declared before routes where it is needed to apply

router.post("/createMedicine",verifyAccessToken,validateMedicine,createMedicineC)
router.patch("/updateMedicine/:id",verifyAccessToken,updateMedicinbyIdC)
router.delete("/deleteMedicine/:id",verifyAccessToken,deleteMedicineC);   

export default router;
