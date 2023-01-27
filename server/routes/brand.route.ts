import { Router } from "express";
import { createBrandC } from "../controllers/brand.controllers";
import { verifyAccessToken } from "../middlewares/auth";
import { validateBrand } from "../middlewares/inputValidation";


const router=Router();




router.use(verifyAccessToken)
router.get("/create",validateBrand,createBrandC)