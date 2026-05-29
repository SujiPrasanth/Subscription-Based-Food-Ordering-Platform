import { useNavigate } from "react-router-dom"
import home233 from "../assets/home233.png"
import home234 from "../assets/home234.png"


function Pricing() {
    const navigate = useNavigate()

    
    return (
        <>
            <div className="bg-emerald-800 mt-12">
                <div className="flex items-center justify-center py-3 font-medium text-xl text-white">
                    <p>View Your Menu</p>
                </div>

                <div className="flex flex-col sm:flex-row justify-center items-center  gap-10 md:gap-16 pt-12 pb-6 mx-2">

                   <div onClick={()=>navigate("/plans",{state:{cuisine:"South"}})} className="hover:shadow shadow-xl p-2 bg-teal-700  border border-teal-700 justify-content rounded-lg h-[470px] w-[320px]">
                        <p className="font-bold text-white text-sm text-center p-1">South Indian</p>
                        <img src={home233} alt="" className="h-300 w-300" />
                        <p className="text-justify text-sm text-white">South Indian meal offers gentle, gut-friendly dishes for the elderly, with rice, lentils, and veggies with less oil and mild spices for easy digestion.</p>
                        <div className="flex justify-center py-2">
                            <button className="text-center bg-orange-600 text-white font-sm font-bold px-4 py-1 rounded-full">View menu</button>
                        </div>
                    </div>

                    <div onClick={()=>navigate("/plans",{state:{cuisine:"North"}})} className="hover:shadow shadow-xl p-2 bg-teal-700  border border-teal-700 justify-content rounded-lg h-[470px] w-[320px]">
                        <p className="font-bold text-white text-sm text-center p-1">North Indian</p>
                        <img src={home234} alt="" className="h-300 w-300" />
                        <p className="text-justify text-sm text-white">North Indian meal offers gentle, gut-friendly dishes for the elderly, with rice, lentils, and veggies with less oil and mild spices for easy digestion.</p>
                        <div className="flex justify-center py-2">
                            <button className="text-center bg-orange-600 text-white font-sm font-bold px-4 py-1 rounded-full">View menu</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default Pricing