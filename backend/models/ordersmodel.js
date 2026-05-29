import mongoose from "mongoose";

const orderschema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    items: [
        {
            productid: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
            cuisine: String,
            category: String,
            meal: String,
            day: String,
            quantity: Number,
            price: Number
        }
    ],
    delivery:{
        name:String,
        phone:Number,
        address:String
    },
    totalamount: {
        type: Number,
        required: true
    },
    razorpay_order_id: {
        type: String
    },
    razorpay_payment_id: {
        type: String
    },

    status: {
        type: String,
        enum: ["created", "paid", "failed", "refunded"],
        default: "created"
    },
    deliverystatus:{
        type:String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true })

const Order = mongoose.model("Order", orderschema)

export default Order