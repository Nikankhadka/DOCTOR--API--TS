
import { Router } from "express";
import { createBrand } from "../controllers/medicine.controller";
import { verifyaccessToken } from "../middlewares/auth";
const router=Router();


router.post("/createMedicine",verifyaccessToken,createBrand)


export default router;