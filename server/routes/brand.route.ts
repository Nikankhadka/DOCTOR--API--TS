import { Router } from "express";
import { createBrandC, getAllBrandC } from "../controllers/brand.controllers";
import { verifyAccessToken } from "../middlewares/auth";
import { validateBrand } from "../middlewares/inputValidation";


const router=Router();

router.get("/getBrand",getAllBrandC)


//this middle ware function will not be applied for above route only after routes
router.use(verifyAccessToken)
router.post("/create",validateBrand,createBrandC)