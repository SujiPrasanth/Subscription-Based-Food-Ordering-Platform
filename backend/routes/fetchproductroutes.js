import express from "express"
import { fetchfilterproducts } from "../controllers/fetchproductcontroller.js";


const router=express.Router()
router.get("/fetchfilterproducts",fetchfilterproducts)

export default router