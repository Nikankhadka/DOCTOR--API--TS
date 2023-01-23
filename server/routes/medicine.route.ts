
import { Router } from "express";
import { createMedicineC, getMedicineByIdC, updateMedicinbyIdC } from "../controllers/medicine.controller";
import { verifyaccessToken } from "../middlewares/auth";
import { validateMedicine } from "../middlewares/inputValidation";
const router=Router();

router.use(verifyaccessToken)

router.post("/createMedicine",validateMedicine,createMedicineC)
router.get("/getMedicine/:id",getMedicineByIdC)
router.patch("/updateMedicine/:id",updateMedicinbyIdC)

export default router;
