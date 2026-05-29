import Cart from "../models/cartmodel.js"
import Order from "../models/ordersmodel.js"
import { instance } from "../server.js"
import crypto from 'crypto'
export const processpayment = async (req, res) => {
    try {
        if(!req.session.user){
            return res.status(404).json({msg:"Please Login to Process payment"})
        }
        const userid = req.session.user.id
        const {  items, delivery, totalamount } = req.body

        if (!userid || !items || items.length === 0 || !totalamount) {
            return res.status(400).json({ msg: "Order details missing" })
        }

        if (!delivery || !delivery.name || !delivery.address) {
            return res.status(400).json({ msg: "Delivery details are required" })
        }

        if (delivery.phone.length !== 10) {
            return res.status(400).json({ msg: "Invalid phone number" })
        }

        const options = {
            amount: totalamount * 100,
            currency: "INR"
        }
        const order = await instance.orders.create(options)

        await Order.create({
            userid, items, delivery,
            razorpay_order_id: order.id,
            totalamount: totalamount,
            status: "created",
            deliverystatus:"pending"
        })
        return res.status(200).json({ success: true, order })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

export const getkey = async (req, res) => {
    try {
        return res.status(200).json({ key: process.env.TEST_API_KEY })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

export const paymentverification = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body
        const body = razorpay_order_id + '|' + razorpay_payment_id

        const exceptedsignature = crypto.createHmac("sha256", process.env.TEST_SECRET_KEY).update(body.toString()).digest('hex')
        if (exceptedsignature === razorpay_signature) {
           const order = await Order.findOneAndUpdate(
                { razorpay_order_id },
                {
                    razorpay_payment_id,
                    status: "paid",
                    deliverystatus:"placed"
                }
            )
            await Cart.findOneAndUpdate(
                {userid: order.userid},{
                    $set: {items:[]}
                }
            )

            return res.redirect(`https://subscription-based-food-ordering-pl.vercel.app/paymentsuccess?reference=${razorpay_payment_id}`)
        } else {

            await Order.findOneAndUpdate({ razorpay_order_id }, { status: "Failed" })
            res.status(400).json({ success: false, msg: "Payment Verification Failed" })
        }
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}


export const getorders = async (req, res) => {
    try {

        const orders = await Order.find().populate("items.productid").sort({ createdAt: -1 })
        console.log(orders)
        return res.status(200).json({ orders })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

export const updateorderstatus = async(req,res)=>{
    try{
        const {deliverystatus}= req.body
        const {id}= req.params

        const validStatus = ["placed", "preparing", "outfordelivery", "delivered"]

        if(!validStatus.includes(deliverystatus)){
            return res.status(404).json({msg:"Invalid Order Status"})
        }

        const order = await Order.findByIdAndUpdate(id,{deliverystatus},{new:true})

        if(!order){
            return res.status(404).json({msg:"Order Not Found"})
        }

        return res.status(200).json({success:true,msg:"Order Status Updated Successfully",order})

    }catch(err){
        return res.status(500).json({msg:err.message})
    }
}

export const deleteorder = async(req,res)=>{
    try{
        const {id}=req.params
        
        const order = await Order.findByIdAndDelete(id)

        if(!order){
            return res.status(404).json({msg:"No Data Found"})
        }

        return res.status(200).json({msg:"Product Delete Succesfully",order})
    }catch(err){
        return res.status(500).json({msg:err.message})
    }
}

export const getuserorders = async(req,res)=>{
    try{
        if(!req.session.user){
            return res.status(404).json({msg:"Login to See Orders"})
        }
        const userid = req.session.user.id
        const order = await Order.find({userid}).sort({createdAt:-1})
        if(!order){
            return res.status(404).json({msg:"cannot find Order"})
        }

        return res.status(200).json({order})
    }catch(err){
        return res.status(500).json({msg:err.message})
    }
}