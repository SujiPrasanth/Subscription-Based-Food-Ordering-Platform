import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function Signup() {
    const navigate = useNavigate()
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    const handlesubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch("https://subscription-based-food-ordering-platform.onrender.com/api/signup",
                {
                    method: "POST",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({ name, email, password })
                }
            )

            const data = await res.json()

            if (!res.ok) {
                alert(data.msg)
                console.log(res);
                console.log(data);
            }
            else {
                alert(data.msg)
                navigate("/signin")
            }

        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">

            <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">

                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
                    <p className="text-gray-500 text-sm mt-1">
                        Sign Up to your account
                    </p>
                </div>

                <form onSubmit={handlesubmit} className="flex flex-col gap-4">

                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-600 mb-1">
                            Name
                        </label>
                        <input  type="text" value={name} onChange={(e) => { setname(e.target.value) }}  placeholder="Enter your email" required className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-600 mb-1">
                            Email
                        </label>
                        <input  type="email" value={email} onChange={(e) => { setemail(e.target.value) }} placeholder="Enter your email" required  className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-600 mb-1">
                            Password
                        </label>
                        <input type="password" value={password} onChange={(e) => { setpassword(e.target.value) }}   placeholder="Enter your password" required  className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition" />
                    </div>

                    <button  type="submit"  className="bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition duration-300" >
                        Sign Up
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Already have an account?
                    <Link to="/signin"  className="text-orange-500 font-medium ml-1 hover:underline" >
                        Login
                    </Link>
                </p>

            </div>
        </div>
    )
}

export default Signup