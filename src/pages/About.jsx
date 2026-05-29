import { useNavigate } from "react-router-dom"
function About() {
    const navigate = useNavigate()
    return (
        <>
            <div className="h-screen flex flex-col items-center justify-center leading-loose mx-4">
                <div className="md:mx-32 mx-12">
                    <p className="font-bold text-center text-4xl text-blue-950">Home-made Food Delivery Service</p>
                    <p className="font-thin text-center text-xl">Daily Grubs is an online home food delivery service that brings the cuisines of our best home chefs straight </p>
                    <p className="font-thin text-center text-xl">to your door. Each day we create the tastiest, freshest and most interesting food cooked in the kitchens of</p>
                    <p className="font-thin text-center text-xl"> our talented local home chefs.</p>
                </div>
                <button onClick={() => navigate('/plans')} className="my-2 font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-400 mt-1 py-2 rounded-full px-4">Order Now</button>
            </div>
        </>
    )
}

export default About