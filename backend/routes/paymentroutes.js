import express from 'express'
import { deleteorder, getkey, getorders, getuserorders, paymentverification, processpayment, updateorderstatus } from '../controllers/paymentcontroller.js'
const router = express.Router()
router.post('/processpayment',processpayment)
router.get('/getkey',getkey)
router.post('/paymentverification',paymentverification)
router.get('/paymentdetails',getorders)
router.put('/updateorderstatus/:id',updateorderstatus)
router.delete('/deleteorder/:id',deleteorder)
router.get('/userorders',getuserorders)
export default router 