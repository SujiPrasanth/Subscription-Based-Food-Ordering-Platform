import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
function Signin() {

    const navigate = useNavigate()
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    const handlesubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch("https://subscription-based-food-ordering-platform.onrender.com/api/signin",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({ email, password })
                }
            )

            const data = await res.json()
            if (!res.ok) {
                alert(data.msg)
                return
            }
            else {
                if (data.user.role === "admin") {
                    navigate("/overview")
                } else {
                    alert(data.msg)
                    navigate("/")
                }
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    
    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">

            <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">

                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
                    <p className="text-gray-500 text-sm mt-1">
                        Sign in to your account
                    </p>
                </div>

                <form onSubmit={handlesubmit} className="flex flex-col gap-4">

                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-600 mb-1">
                            Email
                        </label>
                        <input type="email" value={email} onChange={(e) => setemail(e.target.value)} placeholder="Enter your email" required className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition" />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-600 mb-1">
                            Password
                        </label>
                        <input type="password" value={password} onChange={(e) => setpassword(e.target.value)} placeholder="Enter your password" required className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition" />
                    </div>

                    <button type="submit" className="bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition duration-300">
                        Sign In
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Don't have an account?
                    <Link to="/signup" className="text-orange-500 font-medium ml-1 hover:underline"   >
                        Register
                    </Link>
                </p>

            </div>
        </div>
    )
}

export default Signin