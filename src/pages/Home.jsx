import homeimg from "../assets/home.avif"
import home1 from "../assets/home1.jpeg"
import home2 from "../assets/home2.jpeg"
import home3 from "../assets/home3.jpeg"
import { useNavigate } from "react-router-dom"

function Home() {
    const navigate = useNavigate()
    return (
        <>
            <div className="px-5  pt-6">
                <div className="flex md:flex-row flex-col gap-2 sm:gap-2 items-center justify-around">
                    <div className="leading-loose lg:pt-32 pt-0 text-left">
                        <p className="lg:text-6xl md:text-5xl text-3xl  text-orange-400  font-bold md:font-semibold ">Fresh, Home-Cooked
                            <br />
                            Meals
                        </p>
                        <p className="font-semibold text-3xl text-blue-950">Delivered to Your Door</p>
                        <p className="text-xl font-thin text-justify">  Our talented home chefs prepare delicious meals made with locally-sourced
                            <br />
                            ingredients, so you can enjoy home style food in the comfort of your own home.
                        </p>
                        <div className="pt-3 flex gap-3 items-center">
                            <button className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-full text-white font-bold py-1 px-3" onClick={()=>navigate('/plans')}>Order Now</button>
                            <p className="font-bold text-xl text-blue-950 tracking-wide">9912345678</p>
                        </div>
                    </div>
                    <div className="lg:h-[300px] md:h[200px] md:w-[500px] sm:w-[600px] w-[330px]  ">
                        <img src={homeimg} alt="" />
                    </div>
                </div>

            </div>
            <div className="md:mt-36 mt-12 pt-12 pb-12">
                <h1 className="text-center text-thin text-blue-950 text-4xl tracking-wide pb-6">How It Works</h1>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 grid-cols-1 justify-items-center lg:px-36 px-6 gap-2">
                    <div className="my-4 bg-white rounded-lg  hover:shadow-md shadow w-[300px] h-auto p-2 border border-bg-white">
                        <img src={home1} alt="" className="object-cover p-1" />
                        <p className="font-semibold text-xl text-center text-blue-950">Choose Your Package</p>
                        <div className="py-2">
                            <p className="text-center">With our periodically-changing</p>
                            <p className="text-center"> menu, choose your favorite food plan</p>
                            <p className="text-center"> in just one click.</p>
                        </div>
                    </div>

                    <div className=" my-4 bg-white rounded-lg  hover:shadow-md shadow w-[300px] h-auto p-2 border border-bg-white">
                        <img src={home2} alt="" className="object-cover p-1" />
                        <p className="font-semibold text-xl text-center text-blue-950">Home Chefs Starts Cooking</p>
                        <div className="py-2">
                            <p className="text-center">Only after you choose, our home</p>
                            <p className="text-center"> chefs adhere to meticulously laid out</p>
                            <p className="text-center">quality standards.</p>
                        </div>
                    </div>

                    <div className="my-4 bg-white rounded-lg  hover:shadow-md shadow w-[300px]  h-auto p-2 border border-bg-white">
                        <img src={home3} alt="" className="object-cover p-1" />
                        <p className="font-semibold text-xl text-center text-blue-950">Get It At Your Doorstep</p>
                        <div className="py-2">
                            <p className="text-center">Food gets delivered to you location</p>
                            <p className="text-center">hot at scheduled timings.</p>
                            <p className="text-center">Bon appetit!</p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Home