import { useEffect, useState } from "react"

function Orders() {

    const [details, setdetails] = useState([])
    const [selectedorder, setselectedorder] = useState(null)

    useEffect(() => {

        async function getorderdetails() {

            try {

                const res = await fetch('https://subscription-based-food-ordering-platform.onrender.com/api/paymentdetails')

                const data = await res.json()

                if (!res.ok) {
                    console.log(data.msg)
                    return
                }

                setdetails(data.orders)

            } catch (err) {
                console.log(err)
            }

        }

        getorderdetails()

    }, [])

    const updatestatus = async (id, deliverystatus) => {
        try {

            const res = await fetch(`https://subscription-based-food-ordering-platform.onrender.com/api/updateorderstatus/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ deliverystatus })
            })
            const data = await res.json()
            if (!res.ok) {
                alert(data.msg)
                return
            }

            alert("Status Updated")

            setdetails(prev =>
                prev.map(order =>
                    order._id === id ? { ...order, deliverystatus: deliverystatus } : order
                )
            )

            setselectedorder(prev => ({ ...prev, deliverystatus }))

        } catch (err) {
            console.log(err)
        }
    }


    const handledelete = async(id)=>{
        if(!window.confirm("Are You Sure Want delete this Order")) return
        try{
            const res = await fetch(`https://subscription-based-food-ordering-platform.onrender.com/api/deleteorder/${id}`,{
                method:"DELETE"
            })
            const data = await res.json()

            if(!res.ok){
                alert(data.msg)
            }

            setdetails(prev=>prev.filter(order=>order._id!==id))
        }catch(err){
            console.log(err)
        }
    }

    return (

        <div className="p-6">
            <h1 className="text-3xl pt-12 font-bold mb-6">Orders</h1>
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full">
                    <thead className="bg-gray-100 border-b">
                        <tr>
                            <th className="p-4 text-left">Order ID</th>
                            <th className="p-4 text-left">Customer</th>
                            <th className="p-4 text-left">Phone</th>
                            <th className="p-4 text-left">Amount</th>
                            <th className="p-4 text-left">Status</th>
                            <th className="p-4 text-left">Delivery Status</th>
                            <th className="p-4 text-left">Action</th>

                        </tr>

                    </thead>
                
                        <tbody>
                            {details.map(order => (
                                <tr key={order._id} className="border-b">
                                    <td className="p-4">
                                        {order.razorpay_order_id}
                                    </td>
                                    <td className="p-4">
                                        {order.delivery?.name}
                                    </td>
                                    <td className="p-4">
                                        {order.delivery?.phone}
                                    </td>
                                    <td className="p-4 text-green-600 font-semibold">
                                        ₹{order.totalamount}
                                    </td>
                                    <td className="p-4">
                                        {order.status}
                                    </td>
                                    <td className="p-4">
                                        {order.deliverystatus}
                                    </td>
                                    <td className="p-4 flex gap-2">
                                        <button onClick={() => setselectedorder(order)} className="bg-blue-500 text-white px-3 py-1 rounded" > 
                                            View
                                        </button>
                                        <button onClick={() => handledelete(order._id)} className="bg-red-500 text-white px-3 py-1 rounded">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>    
                </table>
            </div>
            {selectedorder && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-xl font-bold mb-4">
                            Order Details
                        </h2>
                        <p>
                            <b>Name:</b> {selectedorder.delivery?.name}
                        </p>
                        <p>
                            <b>Phone:</b> {selectedorder.delivery?.phone}
                        </p>
                        <p>
                            <b>Address:</b> {selectedorder.delivery?.address}
                        </p>
                        <hr className="my-3" />
                        <h3 className="font-semibold">Items</h3>
                        {selectedorder.items?.map((item, index) => (
                            <div key={index}>
                                {item.cuisine} {item.category} {item.meal} × {item.quantity}
                            </div>
                        ))}
                        <hr className="my-3" />
                        <select value={selectedorder.deliverystatus} onChange={(e) => updatestatus(selectedorder._id, e.target.value)} className="border p-2 w-full" >
                            <option value="placed">Placed</option>
                            <option value="preparing">Preparing</option>
                            <option value="outfordelivery">Out For Delivery</option>
                            <option value="delivered">Delivered</option>
                        </select>
                        <button  onClick={() => setselectedorder(null)} className="mt-4 bg-red-500 text-white px-4 py-2 rounded w-full">
                            Close
                        </button>
                    </div>
                </div>
            )}

        </div>

    )

}

export default Orders