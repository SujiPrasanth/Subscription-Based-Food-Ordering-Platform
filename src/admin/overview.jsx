import { useEffect, useState } from "react"

function Overview() {
    const [stats, setstats] = useState({
        totalusers: 0,
        totalorders: 0,
        totalproducts: 0,
        lastuser: null,
        totalrevenue: null,
        monthlyrevenue: null,
        dailyrevenue: null,
        avgdailysales: null,
        avgmonthlysales: null,
        recentorder:[]
    })
    useEffect(() => {
        async function fetchdetails() {
            const res = await fetch("https://subscription-based-food-ordering-platform.onrender.com/api/dashboarddetails")
            const data = await res.json()

            if (!res.ok) {
                alert(data.msg)
            } else {
                console.log(data);

                return setstats(data)
            }
        }

        fetchdetails()
    }, [])
    return (
        <>
            <div className="pt-12">
                <h1 className="font-bold pt-2 text-xl">Overview </h1>
                <div className="grid sm:grid-cols-3 grid-cols-1 gap-3 m-2">
                    <div className="text-center hover:bg-gray-100 cursor-pointer border border-black w-auto h-auto p-2 rounded-lg">
                        <p className="font-bold ">Total users</p>
                        <p className="font-bold text-2xl">{stats.totalusers}</p>
                    </div>
                    <div className="text-center hover:bg-gray-100 cursor-pointer border border-black text-center w-auto h-auto p-2 rounded-lg">
                        <p className="font-bold ">Total Products</p>
                        <p className="font-bold text-2xl">{stats.totalproducts}</p>
                    </div>
                    <div className="text-center hover:bg-gray-100 cursor-pointer border border-black w-auto h-auto p-2 rounded-lg">
                        <p className="font-bold ">Total Orders</p>
                        <p className="font-bold text-2xl">{stats.totalorders}</p>
                    </div>

                    <div className="text-center hover:bg-gray-100 cursor-pointer border border-black w-auto h-auto p-2 rounded-lg">
                        <p className="font-bold ">Total Revenue</p>
                        <p className="font-bold text-2xl">{stats.totalrevenue}</p>
                    </div>

                    <div className="text-center hover:bg-gray-100 cursor-pointer border border-black w-auto h-auto p-2 rounded-lg">
                        <p className="font-bold ">Monthly Revenue</p>
                        <p className="font-bold text-2xl">{stats.monthlyrevenue || 0}</p>
                    </div>
                    <div className="text-center hover:bg-gray-100 cursor-pointer border border-black w-auto h-auto p-2 rounded-lg">
                        <p className="font-bold ">Daily Revenue</p>
                        <p className="font-bold text-2xl">{stats.dailyrevenue}</p>
                    </div>

                    <div className="text-center hover:bg-gray-100 cursor-pointer border border-black w-auto h-auto p-2 rounded-lg">
                        <p className="font-bold ">Avg Monthly Sales</p>
                        <p className="font-bold text-2xl">{stats.avgmonthlysales}</p>
                    </div>

                    <div className="text-center hover:bg-gray-100 cursor-pointer border border-black w-auto h-auto p-2 rounded-lg">
                        <p className="font-bold ">Avg Daily Sales</p>
                        <p className="font-bold text-2xl">{stats.avgdailysales}</p>
                    </div>

                    <div className="text-center hover:bg-gray-100 cursor-pointer border border-black p-2 rounded-lg">
                        <p className="font-bold">Last User</p>
                        <p>Name: {stats.lastuser?.name}</p>
                        <p>Email: {stats.lastuser?.email}</p>
                    </div>
                </div>

                <div className="mt-6">
                    <h2 className="font-bold text-lg mb-2">Recent Orders</h2>

                    <div className="overflow-x-auto">
                        <table className="w-auto border border-black">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="border text-left p-2">Order ID</th>
                                    <th className="border text-left p-2">Customer Name</th>
                                    <th className="border text-left p-2">Phone</th>
                                    <th className="border text-left p-2">Amount</th>
                                    <th className="border text-left p-2">Status</th>
                                    <th className="border text-left p-2">Delivery Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {stats.recentorder.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="text-center p-3">
                                            No Recent Orders
                                        </td>
                                    </tr>
                                ) : (
                                    stats.recentorder.map((order) => (
                                        <tr key={order._id}>
                                            <td className="border p-2">{order._id.slice(-4)}</td>
                                            <td className="border p-2">{order.delivery.name}</td>
                                           
                                            <td className="border p-2">{order.delivery.phone}</td>
                                            <td className="border p-2">₹{order.totalamount}</td>
                                            <td className="border p-2">{order.status}</td>
                                            <td className="border p-2">{order.deliverystatus}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Overview