import {Routes, Route} from 'react-router-dom';
import RoleProtectedRoute from "@/components/RoleProtectedRoute.tsx";

// shadcn
import DashboardAdmin from '@/views/Dashboard/DashboardAdmin.tsx';
import Home from "@/views/Home/Home.tsx";
import Register from "@/views/Auth/Register.tsx";
import Dashboard from "@/views/Dashboard/Dashboard.tsx";
import Unauthorized from "@/views/Auth/Unauthorized.tsx";
import Index from "@/views/Home/Index.tsx";
import Profile from "@/views/Auth/Profile.tsx";
import ProductListU from "@/views/Products/Users/ProductListU.tsx";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/dashboard" element={<Dashboard />}>
                <Route index element={<Index />} />
                <Route path="products" element={<ProductListU />} />
                <Route path="profile" element={<Profile />} />
            </Route>

            <Route element={<RoleProtectedRoute requiredRole="admin" />}>
                <Route path="admin" element={<DashboardAdmin />}>

                </Route>
            </Route>
        </Routes>
    );
};

export default App;
