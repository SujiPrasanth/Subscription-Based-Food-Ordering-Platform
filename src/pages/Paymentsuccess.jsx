import { useSearchParams, useNavigate } from "react-router-dom"

function Paymentsuccess() {

    const [searchparams] = useSearchParams()
    const referenceId = searchparams.get("reference")
    const navigate = useNavigate()

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">

            <div className="bg-white shadow-lg rounded-xl p-10 text-center w-[400px]">

                <h1 className="text-2xl font-bold text-green-600 mb-2">
                    Payment Successful
                </h1>

                <p className="text-gray-600 mb-4">
                    Thank you! Your payment has been completed successfully.
                </p>

                <div className="bg-gray-100 p-3 rounded-lg mb-6">
                    <p className="text-sm text-gray-500">Payment Reference ID:</p>
                    <p className="font-semibold text-gray-800 break-all">
                        {referenceId}
                    </p>
                </div>

                <button onClick={() => navigate("/")} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg w-full transition"  >
                    Continue Shopping
                </button>

            </div>

        </div>
    )
}

export default Paymentsuccess