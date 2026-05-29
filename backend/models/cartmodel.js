import mongoose from "mongoose";

const cartschema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true},
    items:[
        {
            cuisine:String,
            category:String,
            meal:String,
            day:String,
            price:Number,
            quantity:Number,
            finalprice:Number
        }
    ]
})

const Cart = mongoose.model("Cart",cartschema)

export default Cart