import Sidebar from "../admin/sidebar";
import { Outlet } from "react-router-dom";

function AdminLayout() {
    return (
        <div className="flex min-h-screen bg-gray-50">

            <Sidebar />
            <div className="flex-1 p-4 sm:p-6 overflow-x-hidden">
                <Outlet />
            </div>

        </div>
    );
}

export default AdminLayout;