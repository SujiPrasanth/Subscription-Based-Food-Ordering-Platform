import { useEffect, useState } from "react"
import bf from "../assets/bf.png"
import lunch from "../assets/lunch.png"
import dinner from "../assets/dinner.png"
import { useLocation } from "react-router-dom"
function Plans() {
    const location = useLocation()
    const [category, setcategory] = useState("Veg")
    const [cuisine, setcuisine] = useState(location.state?.cuisine || "South")
    const [meal, setmeal] = useState("Breakfast")
    const [quantity, setquantity] = useState(1)
    const [day, setdays] = useState("01")
    const [showMenu, setShowMenu] = useState(false)
    const [menudata, setmenudata] = useState([])
    const [selecteddate, setselecteddate] = useState(new Date())

    const [price, setprice] = useState(0)
    const [finalprice, setfinalprice] = useState(0)

    const plans = {
        "01": { days: 1, discount: 0 },
        "07": { days: 7, discount: 5 },
        "15": { days: 15, discount: 10 },
        "30": { days: 30, discount: 15 }
    }

    useEffect(() => {

        if (!price) return

        const plan = plans[day]

        const total = price * plan.days

        const discount = (total * plan.discount) / 100

        const discountedPrice = total - discount

        const final = discountedPrice * quantity

        setfinalprice(final)



    }, [price, day, quantity])




    useEffect(() => {
        const today = new Date()
        setselecteddate(today)
    }, [])






    const getPlanPrice = (planday) => {

        const plan = plans[planday]

        const total = price * plan.days

        const discount = (total * plan.discount) / 100

        return total - discount
    }

    function inc() {
        setquantity(quantity + 1)
    }

    function dec() {
        if (quantity > 1) {
            setquantity(quantity - 1)
        }
    }

    useEffect(() => {
        handleviewmenu(selecteddate)
    }, [cuisine, category, meal])




    const nextday = () => {
        const next = new Date(selecteddate)
        next.setDate(next.getDate() + 1)
        setselecteddate(next)
        handleviewmenu(next)
    }

    const prevday = () => {
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const prev = new Date(selecteddate)
        prev.setDate(prev.getDate() - 1)

        if (prev >= today) {
            setselecteddate(prev)
            handleviewmenu(prev)
        }
    }

    const handleaddtocart = async () => {
        if (menudata.length === 0) {
            alert("No Menu Available for this Selection")
            return
        }
        try {

            const res = await fetch("https://subscription-based-food-ordering-platform.onrender.com/api/addtocart", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ category, meal, cuisine, price, day, quantity })
            })
            const data = await res.json()
            if (!res.ok) {
                alert(data.msg)
                return
            } else {
                alert(data.msg)
                return
            }

        } catch (err) {
            console.log(err)
        }
    }

    const handleviewmenu = async (date = selecteddate) => {
        try {
            console.log("fetched")
            const formateddate = date.toISOString().split("T")[0]
            const res = await fetch(`https://subscription-based-food-ordering-platform.onrender.com/api/fetchfilterproducts?category=${category}&meal=${meal}&cuisine=${cuisine}&date=${formateddate}`)
            const data = await res.json()
            console.log(data)
            if (!res.ok) {
                alert(data.msg)
            } else {
                if (data.length === 0) {
                    setmenudata([])
                    setprice(0)
                    setfinalprice(0)
                    return
                } else {
                    setmenudata(data)
                    setprice(data[0].price)
                }
            }

        } catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <div className="flex-1">
                <div className="flex pt-2 gap-3 justify-center items-center text-white font-bold">
                    <div onClick={() => setcuisine("South")} className={`bg-lime-500 p-2 rounded-t-lg `}>
                        <p>South Indian</p>
                    </div>
                    <div onClick={() => setcuisine("North")} className={`bg-yellow-500 p-2 rounded-t-lg`}>
                        <p>North Indian</p>
                    </div>
                </div>
                <div className={`py-4 ${cuisine === "South" ? "bg-lime-500" : "bg-yellow-500"}`}>
                    <div className="flex items-center justify-center text-white  py-3 gap-6">
                        <div onClick={() => setcategory("Veg")} className={`${category === "Veg" ? "bg-green-600 font-medium" : "bg-gray-200 text-black"} p-3 rounded-lg`}>
                            <button>Veg</button>
                        </div>
                        <div onClick={() => setcategory("Non Veg")} className={`${category === "Non Veg" ? "bg-red-600 font-medium" : "bg-gray-200 text-black"} p-3 rounded-lg`}>
                            <button>Non Veg</button>
                        </div>
                    </div>
                    <p className="text-center font-bold text-white">Choose Package</p>
                    <div className="flex items-center justify-center text-white font-medium py-3 gap-3 px-2 sm:px-0">

                        <div onClick={() => { setmeal("Breakfast") }} className={`cursor-pointer flex flex-col items-center ${meal === "Breakfast" ? "bg-black text-white" : "bg-gray-200 text-black"} p-3 rounded-lg w-28 `}>
                            <img src={bf} alt="" className="h-12 w-12" />
                            <button>Breakfast</button>
                        </div>

                        <div onClick={() => { setmeal("Lunch") }} className={`cursor-pointer flex flex-col items-center ${meal === "Lunch" ? "bg-black text-white" : "bg-gray-200 text-black"} p-3 rounded-lg w-28 `}>
                            <img src={lunch} alt="" className="h-12 w-12" />
                            <button>Lunch</button>
                        </div>

                        <div onClick={() => { setmeal("Dinner") }} className={`cursor-pointer flex flex-col items-center ${meal === "Dinner" ? "bg-black text-white" : "bg-gray-200 text-black"} p-3 rounded-lg w-28  `}>
                            <img src={dinner} alt="" className="h-12 w-12" />
                            <button>Dinner</button>
                        </div>

                    </div>
                    <div className="text-center">
                        <button onClick={() => {
                            const today = new Date()
                            setselecteddate(today)
                            handleviewmenu(today)
                            setShowMenu(true)
                        }}
                            className="bg-orange-600 text-white p-2 rounded-lg font-bold">View Menu</button>
                    </div>

                    {showMenu && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                            <div className="bg-white text-black rounded-lg w-[95%] sm:w-[70%] md:w-[70%] lg:w-[40%] h-auto  p-4 sm:p-6  overflow-y-auto shadow-xl">

                                <h2 className="text-xl font-bold text-center">
                                    Menu Details
                                </h2>


                                <div className="flex justify-between items-center mt-3 mb-4">

                                    <button onClick={prevday} className="text-2xl font-bold px-3 py-1 bg-gray-200 rounded">
                                        ←
                                    </button>

                                    <p className="font-bold text-lg">
                                        {selecteddate.toDateString()}
                                    </p>

                                    <button onClick={nextday} className="text-2xl font-bold px-3 py-1 bg-gray-200 rounded" >
                                        →
                                    </button>

                                </div>

                                <p className="text-center mb-3">
                                    {cuisine} - {category} - {meal}
                                </p>


                                {menudata.length > 0 ? (
                                    <ul className="space-y-2">
                                        {menudata.map((item, index) => (
                                            <div  key={index} onClick={() => setprice(item.price)}   className="border rounded-lg p-4 shadow-md bg-gray-50 text-center"  >
                                                <h3 className="font-bold text-lg mb-2">Menu Items</h3>

                                                <ul className="flex flex-col items-center space-y-1 mb-3">
                                                    {item.items.map((food, i) => (
                                                        <li key={i} className="text-gray-700">
                                                            • {food}
                                                        </li>
                                                    ))}
                                                </ul>

                                                <p className="font-bold text-xl text-orange-600">
                                                    ₹{item.price}
                                                </p>
                                            </div>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-center text-red-500">
                                        No Menu Available
                                    </p>
                                )}

                                <div className="flex mt-4 items-center justify-center">
                                    <button onClick={() => setShowMenu(false)} className="bg-orange-600 text-white font-bold p-2 rounded-lg" >
                                        Close
                                    </button>
                                </div>

                            </div>
                        </div>
                    )}

                    <div className="text-center py-2">
                        <span className="text-black  rounded-lg text-xl font-bold">Plans</span>
                    </div>


                    <div className="flex w-full justify-center gap-1 sm:gap-3 py-2 ">

                        {["01", "07", "15", "30"].map((p) => (<div onClick={() => setdays(p)} className={`p-1 border flex flex-col cursor-pointer ${day === p ? "bg-orange-600  text-white" : "bg-white text-black"}  p-2 rounded-lg w-[85px] text-center`}>
                            <div key={p} className="flex py-1">
                                <p className="font-bold text-xl">{p}</p>
                                <p className="font-bold text-xl">Days</p>
                            </div>
                            <hr />
                            <p>₹{getPlanPrice(p)}</p>
                        </div>))}



                    </div>

                    <div className="text-center py-5">
                        <p className="font-bold text-xl text-black">Quantity</p>
                        <div className=" flex items-center gap-2 justify-center py-2">
                            <button onClick={dec} className="text-bold p-2 text-white text-xl bg-orange-600 rounded-lg">-</button><input meal="text" value={quantity} readOnly name="" id="" className="border p-2 text-center border-black rounded-lg" /> <button onClick={inc} className="text-bold text-white  p-2 text-xl bg-orange-600 rounded-lg">+</button>
                        </div>
                    </div>

                    <div className="flex justify-center pt-2 pb-8">
                        <div className="bg-orange-500 rounded-lg p-2 text-white ">
                            <p className="font-bold text-xl ">Current Plan Cost</p>
                            <p className="font-bold text-center text-xl">₹{finalprice}</p>
                            <div className="text-center">
                                <button onClick={() => handleaddtocart()} className="bg-white p-2 text-black font-bold rounded-lg text-center">
                                    Add To Cart
                                </button>
                            </div>

                        </div>
                    </div>

                </div>

            </div>





        </>
    )
}

export default Plans