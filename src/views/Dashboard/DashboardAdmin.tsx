import { useNavigate } from 'react-router-dom';
import {Outlet} from "react-router-dom";
import {apiexpress} from "@/client/api.ts";

const DashboardAdmin = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await apiexpress.get('users/logout')
        navigate('/');
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-3xl font-bold">Welcome admin!</h1>
                <button onClick={handleLogout}>Logout</button>
                <Outlet />
            </div>
        </>
    );
};

export default DashboardAdmin;
