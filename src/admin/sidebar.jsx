import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Sidebar() {
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate()
    const linkClass = ({ isActive }) =>isActive? "bg-gray-900 text-white font-semibold p-3 rounded": "text-gray-700 p-3 hover:bg-gray-200 rounded";

    const handlelogout = async () => {
        
        const res = await fetch('https://subscription-based-food-ordering-platform.onrender.com/api/handleadminlogout', {
            method: "POST",
            credentials: "include"
        })
        const data = await res.json()
        if (!res.ok) {
            alert(data.msg)
            navigate('/')
            return
        } else {

            alert(data.msg)
            navigate('/')
    
            return
        }

    }
    return (
        <>
            
            <div className="hidden sm:flex flex-col w-64 min-h-screen bg-gray-100 p-4 shadow-md">
                <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

                <NavLink to="/overview" className={linkClass}>Dashboard</NavLink>
                <NavLink to="/users" className={linkClass}>Users</NavLink>
                <NavLink to="/productlist" className={linkClass}>Productlist</NavLink>
                <NavLink to="/orders" className={linkClass}>Order</NavLink>
                <button onClick={()=>handlelogout()} className="text-left text-red-600 p-3 hover:bg-red-100 rounded mt-4">
                    Logout
                </button>
            </div>

            <div className="sm:hidden fixed top-0 left-0 right-0 bg-white shadow-md p-4 flex justify-between items-center z-30">
                <h2 className="font-bold">Admin</h2>
                <button onClick={() => setOpen(true)} className="text-2xl">
                    ☰
                </button>
            </div>

            {open && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={handleClose}/>)}

            <div className={`fixed top-0 left-0 h-full w-64 bg-white flex flex-col p-4 shadow-md z-50 transform transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"} sm:hidden`}>
                <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

                <NavLink onClick={handleClose} to="/overview" className={linkClass}>
                    Dashboard
                </NavLink>

                <NavLink onClick={handleClose} to="/users" className={linkClass}>
                    Users
                </NavLink>
                <NavLink onClick={handleClose} to="/productlist" className={linkClass}>
                    Productlist
                </NavLink>
                <NavLink onClick={handleClose} to="/orders" className={linkClass}>
                    Order
                </NavLink>
                <button onClick={()=>handlelogout()} className="text-left text-red-600 p-3 hover:bg-red-100 rounded mt-4">
                    Logout
                </button>
            </div>
        </>
    );
}

export default Sidebar;