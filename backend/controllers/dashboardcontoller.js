import Product from "../models/productmodel.js";
import User from "../models/usermodel.js";
import Order from "../models/ordersmodel.js";

export const dashboarddetails = async (req, res) => {
    try {

        const totalusers = await User.countDocuments({role:"user"})
        const totalorders = await Order.countDocuments()
        const totalproducts = await Product.countDocuments()

        const lastuser = await User.findOne().sort({ createdAt: -1 })

       
        const revenuedata = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalrevenue: { $sum: "$totalamount" }
                }
            }
        ])

        const totalrevenue = revenuedata.length ? revenuedata[0].totalrevenue : 0


        const firstdayofmonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1)

        const monthlyrevenuedata = await Order.aggregate([
            { $match: { createdAt: { $gte: firstdayofmonth } } },
            { $group: { _id: null, monthlyRevenue: { $sum: "$totalamount" } } }
        ])

        const monthlyrevenue = monthlyrevenuedata.length ? monthlyrevenuedata[0].monthlyrevenue : 0


        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const dailyrevenueData = await Order.aggregate([
            { $match: { createdAt: { $gte: today } } },
            { $group: { _id: null, dailyrevenue: { $sum: "$totalamount" } } }
        ])

        const dailyrevenue = dailyrevenueData.length ? dailyrevenueData[0].dailyrevenue : 0


        const firstorder = await Order.findOne().sort({ createdAt: 1 })

        let avgmonthlysales = 0
        let avgdailysales = 0

        if (firstorder) {

            const months =
                (new Date().getFullYear() - firstorder.createdAt.getFullYear()) * 12 +
                (new Date().getMonth() - firstorder.createdAt.getMonth()) + 1

            const days = Math.floor((Date.now() - firstorder.createdAt) / (1000 * 60 * 60 * 24)) + 1

            avgmonthlysales = Math.floor((totalrevenue / months))
            avgdailysales = Math.floor((totalrevenue / days))
        }

        const recentorder = await Order.find({status:"paid"}).sort({createdAt:-1}).limit(5)
        return res.status(200).json({
            msg: "fetched details",
            totalusers,
            totalorders,
            totalproducts,
            totalrevenue,
            monthlyrevenue,
            dailyrevenue,
            avgmonthlysales,
            avgdailysales,
            lastuser,
            recentorder
        })

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}