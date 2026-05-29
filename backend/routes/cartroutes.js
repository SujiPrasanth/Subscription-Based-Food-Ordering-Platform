import express from "express"
import { addtocart, cartitems, removeitems, updatequantity } from "../controllers/cartcontoller.js"

const router = express.Router()

router.post("/addtocart",addtocart)
router.get("/cartitems",cartitems)
router.delete("/removeitem/:itemid",removeitems)
router.patch("/updatequantity",updatequantity)
export default router