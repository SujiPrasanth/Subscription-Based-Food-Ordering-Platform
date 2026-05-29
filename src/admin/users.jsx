import { useEffect, useState } from "react"

function Users() {
    const [details, setdetails] = useState([])
    const [loading, setloading] = useState(true)
    useEffect(() => {

        async function fetchdetails() {
            try {
                const res = await fetch('https://subscription-based-food-ordering-platform.onrender.com/api/userdetails')

                const data = await res.json()
                if (!res.ok) {
                    alert(data.msg)
                    return
                } else {
                    setdetails(data.userdetails)
                    return
                }
            } catch (err) {
                console.log(err)
            } finally {
                setloading(false)
            }
        }


        fetchdetails()
    }, [])


    async function handledelete(id) {
        if (!window.confirm("Are you sure want to dete the User")) return
        const res = await fetch(`https://subscription-based-food-ordering-platform.onrender.com/api/userdelete/${id}`, {
            method: "DELETE",
        })

        const data = await res.json()

        if (!res.ok) {
            alert(data.msg)
            return
        }
        console.log(data)


        setdetails(prev => prev.filter(user => user.id !== id));

    }
    return (
        <>
            <div>
                <h1 className="text-3xl font-bold mb-6 pt-12">Users</h1>

                {loading ? (
                    <p className="text-center text-gray-500">Loading...</p>) : details.length === 0 ? (
                    <p className="text-center text-gray-500 text-black">No Users Found</p>
                ) : (
                    <table className="min-w-full">
                        <thead className="">
                            <tr className="bg-gray-100">
                                <th className="p-4 border text-left">User ID</th>
                                <th className="p-4 border text-left">Name</th>
                                <th className="p-4 border text-left">Gmail</th>
                                <th className="p-4 border text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {details.map(user => (
                                <tr key={user.id} className="hover:bg-gray-100 transition">
                                    <td className="p-4 border">{user.id}</td>
                                    <td className="p-4 border">{user.name}</td>
                                    <td className="p-4 border">{user.email}</td>
                                    <td className="p-4 border">
                                        <button onClick={() => handledelete(user.id)} className="border bg-red-500 text-white rounded-lg px-2 py-1 ">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    )
}
export default Users