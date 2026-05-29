import express from "express"

import { addproduct,deleteproduct,fetchproduct,singleproduct, updateproduct } from "../controllers/productcontoller.js"

const router = express.Router()
router.post("/product",addproduct)
router.get("/product",fetchproduct)
router.get("/product/:id",singleproduct)
router.patch("/product/:id",updateproduct)
router.delete("/product/:id",deleteproduct)
export default router