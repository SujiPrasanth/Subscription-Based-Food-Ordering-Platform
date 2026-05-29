import { Outlet } from "react-router-dom"

function  Authlayout(){
    return(
        <>
        <div>
            <Outlet />
        </div>
        </>
    )
}
export default Authlayout