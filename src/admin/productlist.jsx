import { FiFilter } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Productlist() {

    const navigate = useNavigate()
    const [products, setproducts] = useState([])
    const [loading, setloading] = useState(true)

    useEffect(() => {

        const fetchproducts = async () => {
            try {
                setloading(true)
                const res = await fetch("http://localhost:3001/api/product")

                if (!res.ok) {
                    throw new Error("failed to Fetch products")
                }

                const data = await res.json()
                setproducts(data)
                setloading(false)

            } catch (err) {
                console.log(err)
            } finally {
                setloading(false)
            }

        }

        fetchproducts()
    }, [])

    const [sortOrder, setSortOrder] = useState("asc");

    const handleSort = () => {
        setSortOrder(prev => (prev === "asc" ? "desc" : "asc"));
    };

    const sortedProducts = [...products].sort((a, b) => {
        return sortOrder === "asc"
            ? new Date(a.date) - new Date(b.date)
            : new Date(b.date) - new Date(a.date);
    });


    const handledelete = async (id) => {
        if (window.confirm("Are you sure  want delete")) {
            try {
                const res = await fetch(`http://localhost:3001/api/product/${id}`, {
                    method: "DELETE",
                })
                const data = await res.json()
                if (!res.ok) {
                    throw new Error(data.msg)
                }
                alert(data.msg)
                setproducts(prev => prev.filter(p => p._id !== id))
            } catch (err) {
                console.log(err)
            }
        }
    }





    return (
        <div className="w-full pt-12">

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                <h1 className="text-xl pt-2 sm:text-2xl font-bold">
                    Products View
                </h1>

                <button onClick={() => navigate("/products")} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition w-full sm:w-auto">
                    Add New Product
                </button>
            </div>
            <div className="w-full overflow-x-auto bg-white rounded-lg shadow-md border border-gray-200">
                <table className="w-full min-w-[900px] text-sm">

                    <thead className="bg-gray-100">
                        <tr className="text-gray-700">
                            <th className="px-4 py-3 border">
                                <div className="flex justify-between items-center">
                                    <span>Date</span>
                                    <FiFilter
                                        onClick={handleSort}
                                        className="cursor-pointer hover:text-black"
                                        size={14}
                                    />
                                </div>
                            </th>
                            <th className="px-4 py-3 border">Cuisine</th>
                            <th className="px-4 py-3 border">Category</th>
                            <th className="px-4 py-3 border">Meal</th>
                            <th className="px-4 py-3 border">Items</th>
                            <th className="px-4 py-3 border">Price</th>
                            <th className="px-4 py-3 border text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="7" className="text-center py-4">
                                    Loading...
                                </td>
                            </tr>
                        ) : products.length === 0 ? (<tr>
                            <td colSpan="7" className="text-center py-4">
                                No Products Found
                            </td>
                        </tr>) : (
                            sortedProducts.map((item) => (
                                <tr key={item._id} className="border-t hover:bg-gray-50">
                                    <td className="px-4 py-3">{new Date(item.date).toISOString().split("T")[0]}</td>
                                    <td className="px-4 py-3">{item.cuisine}</td>
                                    <td className="px-4 py-3">{item.category}</td>
                                    <td className="px-4 py-3">{item.meal}</td>
                                    <td className="px-4 py-3 break-words">
                                        {item.items.join(", ")}
                                    </td>
                                    <td className="px-4 py-3 font-medium">
                                        ₹{item.price}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex flex-col sm:flex-row gap-2 justify-center">
                                            <button onClick={() => navigate(`/products/${item._id}`)} className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition w-full sm:w-auto">
                                                Update
                                            </button>
                                            <button onClick={() => handledelete(item._id)} className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition w-full sm:w-auto">
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )
                        }
                    </tbody>

                </table>
            </div>
        </div >
    );
}

export default Productlist;