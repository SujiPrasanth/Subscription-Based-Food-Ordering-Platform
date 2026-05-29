import { Outlet } from "react-router-dom"
import Navbar from "../Components/Navbar"

function Mainlayout() {
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="pt-16">
                    <Outlet />
                </main>
            </div>

        </>
    )
}

export default Mainlayout