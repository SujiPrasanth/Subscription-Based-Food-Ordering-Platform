import Product from "../models/productmodel.js";

export const addproduct = async (req, res) => {
    try {
        
        const { date, cuisine, meal, category, items, price } = req.body

        if (!date || !cuisine || !category || !meal || !items) {
            return res.status(400).json({ msg: "All Fields Required" })
        }
        const selecteddate = new Date(date)
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        if (isNaN(selecteddate.getTime())) {
            return res.status(400).json({ msg: "Invalid date format. Use YYYY-MM-DD" });
        }

        if (selecteddate < today) {
            return res.status(400).json({ msg: "Cannot Add For Past Dates" })
        }

        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ msg: "Atleast one food item required" })
        }
        if (price === undefined || price === null || isNaN(price) || price < 0) {
            return res.status(400).json({ msg: "Valid Price is required" })

        }

        const existproduct = await Product.findOne({ date, meal, category, cuisine })
        if (existproduct) {
            return res.status(400).json({ msg: "Product Already Exist" })
        }
        const newproduct = await Product.create({ date, cuisine, category, meal, items, price })
        return res.status(201).json({ msg: "Food Item Added Sucessfully", newproduct })


    } catch (err) {
        if (err.name === "ValidationError") {
            return res.status(400).json({ msg: err.message })
        }
        return res.status(500).json({ msg: "Server Error" })
    }
}

export const fetchproduct = async (req, res) => {
    try {
        const products = await Product.find()
        return res.status(200).json(products)
    } catch (err) {
        return res.status(500).json({ msg: "Server Error" })
    }
}

export const singleproduct = async (req, res) => {
    try {
       
        const { id } = req.params

        if (!id) {
            return res.status(400).json({ msg: "product Id is required" })
        }

        const product = await Product.findById(id)
        if (!product) {
            return res.status(400).json({ msg: "Product Not Found" })
        }

        return res.status(200).json(product)

    } catch (err) {
        return res.status(500).json("Server Error")
    }
}


export const updateproduct = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({ msg: "Product ID is required" })
        }

        const updateproduct = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })

        if (!updateproduct) {
            return res.status(404).json({ msg: "Product Not Found" })
        }
        return res.status(200).json({ msg: "Product updated Successfully",updateproduct })
    } catch (err) {
        return res.status(500).json({ msg: "server error" })
    }
}


export const deleteproduct = async(req,res)=> {
    try{
        const {id}=req.params
        const userid = await Product.findById(id)
        if(!userid){
            return res.status(400).json({msg:"Id is Required"})
        }

        const deleteproduct = await Product.findByIdAndDelete(userid)

        if(!deleteproduct){
            return res.status(404).json({ msg: "Product Not Found" });
        }

        return res.status(200).json({msg:"Product Deleted Successfully"})
    }catch(err){
        return res.status(500).json({msg:"Server Error"})
    }
}