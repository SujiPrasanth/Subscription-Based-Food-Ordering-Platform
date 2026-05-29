import express from "express"
import { checkuser,handleadminlogout,handlelogout,newuser, userdelete, userdetails } from "../controllers/usercontroller.js"

const router = express.Router()

router.post("/signup",newuser)
router.post("/signin",checkuser)

router.get('/userdetails',userdetails)
router.delete('/userdelete/:id',userdelete)
router.post('/handlelogout',handlelogout)
router.post('/handleadminlogout',handleadminlogout)
export default router