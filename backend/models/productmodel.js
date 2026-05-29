import mongoose from "mongoose";

const productschema = new mongoose.Schema({
    date:{
        type:Date,
        required:true
    },
    cuisine:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    meal:{
        type:String,
        required:true
    },
    items:[{
        type:String,
        required:true,
        trim:true
    }],
    price:{
        type:Number,
        required:true,
        min:0
    }
})

const Product = mongoose.model("Product",productschema)

export default Product 