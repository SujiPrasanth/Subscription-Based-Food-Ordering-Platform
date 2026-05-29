import { useEffect, useState } from "react"

function Userorder() {

    const [orderdetails, setorderdetails] = useState([])

    useEffect(() => {

        async function getuserorders() {
            const res = await fetch(`http://localhost:3001/api/userorders`,{
                credentials:"include"
            })
            const data = await res.json()

            if (!res.ok) {
                alert(data.msg)
            } else {
                setorderdetails(data.order)
            }
        }

        getuserorders()

    }, [])


    return (

        <div className="max-w-4xl mx-auto p-6">

            <h1 className="text-3xl font-bold mb-6 text-center">
                My Orders
            </h1>

            {orderdetails.length === 0 ? (
                <p className="text-center text-gray-500">
                    No Orders Found
                </p>) : (orderdetails.map(order => (
                    <div key={order._id} className="bg-white shadow-md rounded-lg p-5 mb-6 border"
                    >
                        <div className="flex justify-between items-center mb-3">
                            <div>
                                <p className="text-sm text-gray-500">
                                    Order ID
                                </p>

                                <p className="font-semibold text-gray-800">
                                    {order.razorpay_order_id}
                                </p>
                            </div>
                            <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700 font-medium">
                                {order.deliverystatus}
                            </span>
                        </div>

                        <p className="text-lg font-semibold text-green-600 mb-3">
                            ₹{order.totalamount}
                        </p>

                        <hr className="mb-3" />
                        <h3 className="font-semibold mb-2">
                            Ordered Items
                        </h3>
                        <div className="space-y-2">
                            {order.items?.map((item, index) => (
                                <div key={index} className="flex justify-between bg-gray-50 p-3 rounded">
                                    <div>
                                        <p className="font-medium text-gray-700">
                                            {item.cuisine} - {item.category}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {item.meal}
                                        </p>
                                    </div>

                                    <div className="text-gray-700 font-medium">
                                        Qty: {item.quantity}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}

export default Userorder