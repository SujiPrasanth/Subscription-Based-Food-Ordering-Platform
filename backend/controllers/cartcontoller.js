import Cart from "../models/cartmodel.js";

export const addtocart = async (req, res) => {
    try {

        if (!req.session.user || req.session.user.role !== "user") {
            return res.status(401).json({ msg: "Please login to add items to cart" });
        }
        const userid = req.session.user.id
        const { category, cuisine, meal, day, price, quantity, } = req.body
        const plans = {
            "01": { days: 1, discount: 0 },
            "07": { days: 7, discount: 5 },
            "15": { days: 15, discount: 10 },
            "30": { days: 30, discount: 15 }
        }

        const plan = plans[day]

        if (!plan) {
            return res.status(400).json({ msg: "Invalid Plan" })
        }

        const totalprice = price * plan.days
        const discountamount = (totalprice * plan.discount) / 100
        const discountedprice = totalprice - discountamount
        const finalprice = discountedprice * quantity

        let cart = await Cart.findOne({ user: userid })
        if (!cart) {
            cart = await Cart.create({ user: userid, items: [] })
        }

        const existingitem = cart.items.find(item =>
            item.category === category &&
            item.cuisine === cuisine &&
            item.day === day &&
            item.meal === meal
        )

        if (existingitem) {
            existingitem.quantity += quantity

            const newTotal = existingitem.price * plan.days
            const discount = (newTotal * plan.discount) / 100
            const newPrice = newTotal - discount

            existingitem.finalprice = newPrice * existingitem.quantity
        } else {
            cart.items.push({ category, cuisine, day, price, quantity, finalprice, meal })

        }

        await cart.save()
        return res.status(201).json({ msg: "Item Added to Cart", cart })

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}


export const cartitems = async (req, res) => {
    try {
        if (!req.session.user || req.session.user.role !== "user") {
            return res.status(401).json({ msg: "Please login to add items to cart" });
        }
        const userid = req.session.user.id

        const cart = await Cart.findOne({ user: userid })

        if (!cart) {
            return res.status(200).json({ items: [] })
        }


        return res.status(200).json(cart)

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

export const removeitems = async (req, res) => {
    try {
        if (!req.session.user || req.session.user.role !== "user") {
            return res.status(401).json({ msg: "Please login to add items to cart" });
        }
        const userid = req.session.user.id
        const { itemid } = req.params

        const cart = await Cart.findOne({ user: userid })

        if (!cart) {
            return res.status(404).json({ msg: "Cart Not Found" })
        }

        cart.items = cart.items.filter((item,) => item._id.toString() !== itemid)

        await cart.save()

        return res.status(200).json({ msg: "Item Removed", cart })
    } catch (err) {
        return res.status(500).json({ msg: "Server error" })
    }
}

export const updatequantity = async (req, res) => {
    try {
        if (!req.session.user || req.session.user.role !== "user") {
            return res.status(401).json({ msg: "Please login to add items to cart" });
        }
        const userid = req.session.user.id
        const { itemid, quantity } = req.body

        const cart = await Cart.findOne({ user: userid })
        if (!cart) {
            return res.status(404).json({ msg: "Cart Not Found" })
        }

        const item = cart.items.id(itemid)
        if (!item) {
            return res.status(404).json({ msg: "item not found" })
        }

        const plans = {
            "01": { days: 1, discount: 0 },
            "07": { days: 7, discount: 5 },
            "15": { days: 15, discount: 10 },
            "30": { days: 30, discount: 15 }
        }

        const plan = plans[item.day]
        const totalprice = item.price * plan.days
        const discountprice = (totalprice * plan.discount) / 100
        const discountedamount = totalprice - discountprice
        item.quantity = quantity
        item.finalprice = discountedamount * quantity

        await cart.save()

        return res.status(200).json({ msg: "Cart Updated Successfully", cart })

    } catch (err) {
        return res.status(500).json({ msg: "serrer error" })
    }
}