import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import session from "express-session"
import cookieParser from "cookie-parser"
import dotenv from 'dotenv'
dotenv.config({ path: "./config/config.env" });

import userroutes from "./routes/userroutes.js"
import productroutes from "./routes/productroutes.js"
import fetchproductroutes from "./routes/fetchproductroutes.js"
import cartroutes from "./routes/cartroutes.js"
import paymentroutes from "./routes/paymentroutes.js"
import dashboarddetails from "./routes/dashboarddetailsroutes.js"

import Razorpay from "razorpay";


const app = express()
app.use(cors({
    origin: "https://subscription-based-food-ordering-pl.vercel.app",
    credentials: true
}
))

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

app.set("proxy trusted", 1)

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: true,
        httpOnly: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24
    }
}))


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDb Connected Successfully"))
    .catch((err) => console.log(err))


app.use('/api', userroutes)
app.use('/api', productroutes)
app.use('/api', fetchproductroutes)
app.use('/api', cartroutes)
app.use('/api', paymentroutes)
app.use('/api', dashboarddetails)


const port = process.env.PORT || 8001
export const instance = new Razorpay({
    key_id: process.env.TEST_API_KEY,
    key_secret: process.env.TEST_SECRET_KEY
})

app.listen(port, () => {
    console.log(`Server is Running,${port}`)
})