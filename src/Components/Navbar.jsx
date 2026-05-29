import logout from "../assets/logout.png"
import { useState } from "react"
import { NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom"
function Navbar() {
    const navigate = useNavigate()
    const [open, SetOpen] = useState(false)
    const handleclose = () => SetOpen(false)
    const [menuopen, setshowmenu] = useState(false)

    const linkclass = ({ isActive }) => isActive ? "text-orange-500" : "text-black font-medium hover:text-orange-500"

    const handlelogout = async () => {
        const res = await fetch('https://subscription-based-food-ordering-platform.onrender.com/api/handlelogout', {
            method: "POST",
            credentials: "include"
        })

        const data = await res.json()
        if (!res.ok) {
            alert(data.msg)
            return
        } else {
            alert(data.msg)
            navigate('/')
            return
        }
    }

    return (
        <>
            <div className="bg-white w-full top-0 left-0 z-10 fixed py-2 px-4">
                <div className="flex items-center justify-between p-2">
                    <div>
                        <p className="font-bold text-3xl text-orange-400">DailyFood</p>
                    </div>
                    <div className="hidden md:flex font-medium text-2xl gap-4 ">
                        <NavLink onClick={handleclose} to="/" className={linkclass}>Home</NavLink>
                        <NavLink onClick={handleclose} to="about" className={linkclass}>About</NavLink>
                        <NavLink onClick={handleclose} to="pricing" className={linkclass}>Pricing</NavLink>
                        <NavLink onClick={handleclose} to="cart" className={linkclass}>cart</NavLink>
                        <button onClick={() => setshowmenu(prev => !prev)}><img src={logout} className="h-7 w-7 " alt="" /></button>
                    </div>

                    <div className="md:hidden flex gap-3  text-right">
                        <button onClick={() => setshowmenu(prev => !prev)}><img src={logout} className="h-6 w-6 " alt="" /></button>

                        <button onClick={() => SetOpen(!open)}> ☰</button>

                    </div>
                </div>

                {open && (
                    <div className="flex flex-col ml-2 md:hidden font-medium gap-2 ">
                        <NavLink onClick={handleclose} to="/" className={linkclass}>Home</NavLink>
                        <NavLink onClick={handleclose} to="about" className={linkclass}>About</NavLink>
                        <NavLink onClick={handleclose} to="pricing" className={linkclass}>Pricing</NavLink>
                        <NavLink onClick={handleclose} to="cart" className={linkclass}>cart</NavLink>
                    </div>
                )}
                {menuopen && (
                    <div className="absolute right-0 top-10 bg-white shadow-lg rounded-lg w-40 p-2 flex flex-col z-50">
                        <NavLink to="/signin" onClick={() => setshowmenu(false)} className="p-2 hover:bg-gray-100 rounded" >
                            Sign In
                        </NavLink>

                        <NavLink to="/userorders" onClick={() => setshowmenu(false)} className="p-2 hover:bg-gray-100 rounded"  >
                            Orders
                        </NavLink>

                        <button onClick={() => {
                            handlelogout()
                            setshowmenu(false)
                        }} className="text-left p-2 hover:bg-gray-100 rounded text-red-500">
                            Logout
                        </button>
                    </div>
                )}

            </div >
        </>
    )
}

export default Navbar