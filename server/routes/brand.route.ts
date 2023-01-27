import { Router } from "express";
import { createBrandC, deleteBrandC, getAllBrandC, getBrandByIdC, updateBrandC } from "../controllers/brand.controllers";
import { verifyAccessToken } from "../middlewares/auth";
import { validateBrand } from "../middlewares/inputValidation";


const router=Router();

router.get("/getBrand",getAllBrandC)
router.get("/getBrand/:id",getBrandByIdC)

//this middle ware function will not be applied for above route only after routes
router.use(verifyAccessToken)
router.post("/createBrand",validateBrand,createBrandC)
router.patch("/updateBrand/:id",updateBrandC)
router.delete("/deleteBrand/:id",deleteBrandC)


export default router;