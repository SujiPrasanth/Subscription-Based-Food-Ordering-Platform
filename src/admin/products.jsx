import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
function Products() {
    const { id } = useParams()
    const navigate = useNavigate()
    const presentday = new Date().toISOString().split("T")[0]
    const [formdata, setformdata] = useState({
        date: "",
        cuisine: "South",
        category: "Veg",
        meal: "Breakfast",
        items: [""],
        price: ""
    })


    const handlechange = (e) => {
        const { name, value } = e.target
        setformdata({ ...formdata, [name]: value })
    }

    const handleitemchange = (index, value) => {
        const updateitems = [...formdata.items]
        updateitems[index] = value
        setformdata({ ...formdata, items: updateitems })
    }


    const additem = () => {
        const lastitem = formdata.items[formdata.items.length - 1]
        console.log(lastitem)
        if (lastitem.trim() === "") {
            alert("Fill the Food Item")
            return;
        }
        setformdata({
            ...formdata, items: [...formdata.items, ""]
        })

    }

    const removeitem = (index) => {
        const updateditems = formdata.items.filter((_, i) => i !== index)
        setformdata({ ...formdata, items: updateditems })
    }

    let res;
    const handlesubmit = async (e) => {
        e.preventDefault()

        const { date, cuisine, meal, category, items, price } = formdata

        if (!date || !cuisine || !meal || !category || !price) {
            alert("fill all the fields")
            return
        }
        if (items.length === 0) {
            alert("Atleat one Food is required")
            return
        }

        const hasempty = items.some(item => item.trim() === "")

        if (hasempty) {
            alert("Food Item cannot be Empty")
            return
        }

        const numprice = Number(price)
        if (isNaN(numprice) || numprice < 0) {
            alert("price must be valid number")
            return
        }

        const datatosend = { ...formdata, price: numprice }

        if (id) {
            res = await fetch(`https://subscription-based-food-ordering-platform.onrender.com/api/product/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(datatosend)
            })

        } else {

            res = await fetch("https://subscription-based-food-ordering-platform.onrender.com/api/product",
                {
                    method: "POST",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify(datatosend)
                }
            )
        }
        const data = await res.json()

        if (!res.ok) {
            alert(data.msg)
        }
        else {
            alert(id?"Update form Successfully":"form submitted successfully")
            navigate("/productlist")
        }

    }

    useEffect(() => {
        if (id) {
            const fetchproducts = async () => {
                const res = await fetch(`https://subscription-based-food-ordering-platform.onrender.com/api/product/${id}`)
                const data = await res.json()

                setformdata(
                    {
                        date: data.date?.split("T")[0],
                        cuisine: data.cuisine,
                        category: data.category,
                        meal: data.meal,
                        items: data.items,
                        price: data.price
                    }
                )
            }

            fetchproducts()
        }
    }, [id])

    return (
        <div className="flex justify-center pt-12">
            <form onSubmit={handlesubmit} action="" className="bg-white p-6 flex flex-col justify-center gap-4 w-full sm:w-[400px]">
                <h2 className="text-center font-bold text-xl">
                    {id ? "Update Food Item" : "Add Food Items"}
                </h2>
                <div className="flex flex-col">
                    <label htmlFor="" className="font-semibold">Select Date:</label>
                    <input type="date" name="date" disabled={id} id="" min={presentday} value={formdata.date} onChange={handlechange} />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="" className="font-semibold">Select Cuisine:</label>
                    <select name="cuisine" id="" className="border px-2 py-1" value={formdata.cuisine} onChange={handlechange}>
                        <option value="South">South</option>
                        <option value="North">North</option>
                    </select>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="" className="font-semibold" >Select category:</label>
                    <select name="category" id="" className="border px-2 py-1" value={formdata.category} onChange={handlechange}>
                        <option value="Veg">Veg</option>
                        <option value="Non Veg">Non Veg</option>
                    </select>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="" className="font-semibold" >Select meal:</label>
                    <select name="meal" id="" className="border px-2 py-1" value={formdata.meal} onChange={handlechange}>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                    </select>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="" className="font-semibold">Food items:</label>
                    {formdata.items.map((items, index) => (
                        <div key={index} className="flex">
                            <input type="text" className="border p-1 px-2 m-1 w-full" required placeholder={`item ${index + 1}`} onChange={(e) => handleitemchange(index, e.target.value)} value={items} />

                            {formdata.items.length > 1 && (
                                <button type="button" className="bg-red-500 px-2 rounded-md m-1" onClick={() => removeitem(index)}>X</button>
                            )}
                        </div>
                    ))}
                </div>
                <div className="flex flex-col">
                    <label htmlFor="" className="font-semibold" >Price:</label>
                    <input type="number" name="price" min={1} value={formdata.price} onChange={handlechange} className="border p-1 m-1" />
                </div>
                <button type="button" onClick={additem} className="p-1 bg-blue-300">Add Item</button>
                <button className="bg-orange-500 p-1">Submit</button>
            </form>
        </div>
    );
}

export default Products;