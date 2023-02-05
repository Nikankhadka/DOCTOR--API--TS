
import { Router } from "express";
import { createMedicineC, deleteMedicineC, getMedicineByIdC, updateMedicinbyIdC,getAllMedicineC, getAllMedicineNamesC, getMedicineCountC, medicineExcelC } from "../controllers/medicine.controller";
import { verifyAccessToken } from "../middlewares/auth";
import { validateMedicine } from "../middlewares/inputValidation";

import multer from "multer"


const router=Router();
const upload=multer()


router.get("/getMedicine",getAllMedicineC)
router.get("/getMedicineNames",getAllMedicineNamesC)
router.get("/getMedicine/:id",getMedicineByIdC)
router.get("/getMedicineCount",getMedicineCountC)

//any middleware function will only apply if it is declared before routes where it is needed to apply
router.use(verifyAccessToken)
router.post("/createMedicine",validateMedicine,createMedicineC)
router.patch("/updateMedicine/:id",updateMedicinbyIdC)
router.delete("/deleteMedicine/:id",deleteMedicineC);

//middleware function wll get file and name it file and pass onto te request controller
router.post("/medicineExcel",upload.single("file"),medicineExcelC)   

export default router;
