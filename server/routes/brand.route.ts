
import { Router } from "express";
import { createBrand } from "../controllers/brand.controller";
import { verifyaccessToken } from "../middlewares/auth";
const router=Router();


router.post("/createBrand",verifyaccessToken,createBrand)


export default router;