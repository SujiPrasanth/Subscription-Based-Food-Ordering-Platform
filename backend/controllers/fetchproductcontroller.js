import Product from "../models/productmodel.js";

export const fetchfilterproducts = async (req, res) => {
    try {
        const { category, cuisine, date, meal } = req.query

        if (!category || !cuisine || !date || !meal) {
            return res.status(400).json({ msg: "All Filters Required" })
        }

        const selecteddate = new Date(date)
        selecteddate.setHours(0, 0, 0, 0)

        const nextdate = new Date(selecteddate)
        nextdate.setDate(nextdate.getDate() + 1)

        const products = await Product.find({
            category, cuisine, meal, date: { $gte: selecteddate, $lte: nextdate }
        })

        return res.status(200).json(products)

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

