import { useEffect, useState } from "react"

function Cart() {

    const [items, setitems] = useState([])
    

    const [showform, setshowform] = useState(false)
    const [selectedItem, setselectedItem] = useState(null)

    const [orderdetails, setorderdetails] = useState({ name: "", phone: "", address: "" })

    useEffect(() => {
        const handlecart = async () => {
            try {
                const res = await fetch(`http://localhost:3001/api/cartitems`,{
                    credentials:"include"
                })
                const data = await res.json()

                if (!res.ok) {
                    alert(data.msg)
                    return
                } else {
                    setitems(data.items || [])
                }

            } catch (err) {
                console.log(err)
            }
        }

        handlecart()

    }, [])

    const removeitem = async (id) => {
        try {

            const res = await fetch(`http://localhost:3001/api/removeitem/${id}`, {
                method: "DELETE",
                credentials:"include",
                
            })

            const data = await res.json()

            if (!res.ok) {
                alert(data.msg)
                return
            }
            setitems(data.cart.items)

        } catch (err) {
            console.log(err)
        }
    }



    async function inc(id) {

        const item = items.find(i => i._id === id)

        const newquantity = item.quantity + 1

        setitems(prevItems =>
            prevItems.map(item =>
                item._id === id
                    ? {
                        ...item,
                        quantity: newquantity,
                        finalprice: item.price * Number(item.day) * newquantity
                    }: item
            )
        )

        const res = await fetch("http://localhost:3001/api/updatequantity", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            credentials:"include",
            body: JSON.stringify({ quantity: newquantity, itemid: id })
        })

        const data = await res.json()

        if (!res.ok) {
            alert(data.msg)
            return
        }

        setitems(data.cart.items)
    }



    async function dec(id) {

        const item = items.find(i => i._id === id)

        if (item.quantity <= 1) return

        const newquantity = item.quantity - 1

        setitems(previtems =>
            previtems.map(item =>
                item._id === id
                    ? {
                        ...item,
                        quantity: newquantity,
                        finalprice: item.price * Number(item.day) * newquantity
                    }
                    : item
            )
        )

        const res = await fetch("http://localhost:3001/api/updatequantity", {
            method: "PATCH",
            credentials:"include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ quantity: newquantity, itemid: id })
        })

        const data = await res.json()

        if (!res.ok) {
            alert(data.msg)
            return
        }

        setitems(data.cart.items)
    }



    const totalPrice = items.reduce((acc, item) => acc + item.finalprice, 0)

    const handlebuynow = async () => {

        try {

            if (!orderdetails.name || !orderdetails.phone || !orderdetails.address) {
                alert("Fill all delivery details")
                return
            }

            const resgetkey = await fetch('http://localhost:3001/api/getkey')
            const keydata = await resgetkey.json()


            const res = await fetch('http://localhost:3001/api/processpayment', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials:"include",
                body: JSON.stringify({
                    items: [selectedItem],
                    totalamount: selectedItem.finalprice,
                    delivery: orderdetails
                })
            })

            const data = await res.json()

            if (!res.ok) {
                alert(data.msg)
                return
            }

            const options = {

                key: keydata.key,
                amount: data.order.amount,
                currency: "INR",

                name: "Suji Prasanth",
                description: "Daily Food Meal Delivery",

                order_id: data.order.id,

                callback_url: "http://localhost:3001/api/paymentverification",

                prefill: {
                    name: orderdetails.name,
                    contact: orderdetails.phone
                }

            }

            const razor = new window.Razorpay(options)

            razor.open()

            setshowform(false)

        } catch (err) {
            console.log(err)
        }
    }



    return (

        <div className="p-5">

            <div className="flex w-full justify-between items-center my-2">

                <h1 className="text-2xl font-bold">Your Cart</h1>

                {items.length > 0 && (
                    <h2 className="text-xl font-bold border border-orange-300 rounded-lg p-2">
                        Cart Total: ₹{totalPrice}
                    </h2>
                )}

            </div>
            {items.length === 0 && <p>Your cart is empty</p>}
            <div className="flex flex-col gap-4">

                {items.map((item) => (

                    <div key={item._id} className="border p-4 rounded-lg shadow-md">

                        <p className="font-medium">
                            {item.cuisine} Indian • {item.category} • {item.meal}
                        </p>
                        <p>Plan: {item.day} {item.day === "01" ? "Day" : "Days"}</p>
                        <p>Price: ₹{item.price}</p>
                        <p>Total: ₹{item.finalprice}</p>

                        <div className="flex gap-3 items-center mt-2">

                            <button onClick={() => dec(item._id)} className="border px-2">-</button>

                            <p>{item.quantity}</p>

                            <button onClick={() => inc(item._id)} className="border px-2">+</button>

                            <button   onClick={() => removeitem(item._id)} className="bg-red-500 text-white px-3 py-1 rounded">
                                Remove
                            </button>

                        </div>


                        <button onClick={() => { setselectedItem(item)
                                setshowform(true) }} className="mt-3 bg-green-600 text-white px-4 py-2 rounded">
                            Buy Now
                        </button>

                    </div>

                ))}

            </div>



            {showform && (

                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center" onClick={()=>setshowform(false)}>

                    <div className="bg-white p-6 rounded-lg w-96" onClick={(e)=>e.stopPropagation()}>

                        <h2 className="text-xl font-bold mb-4">Delivery Details</h2>

                        <input type="text"  placeholder="Name" className="border w-full p-2 mb-3" value={orderdetails.name} onChange={(e) =>  setorderdetails({ ...orderdetails, name: e.target.value })   } />

                        <input type="text" placeholder="Phone"   className="border w-full p-2 mb-3"    value={orderdetails.phone} onChange={(e) =>    setorderdetails({ ...orderdetails, phone: e.target.value })} />

                        <textarea placeholder="Address" className="border w-full p-2 mb-3"   value={orderdetails.address} onChange={(e) =>  setorderdetails({ ...orderdetails, address: e.target.value })  }/>
                        <button  onClick={handlebuynow}  className="bg-green-600 text-white px-4 py-2 rounded w-full" >
                            Place Order
                        </button>

                    </div>

                </div>

            )}

        </div>
    )
}

export default Cart