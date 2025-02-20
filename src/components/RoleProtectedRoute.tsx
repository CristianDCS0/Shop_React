import {FC} from 'react';
import { Outlet } from 'react-router-dom';

interface RoleProtectedRouteProps {
    requiredRole: string;
}

const RoleProtectedRoute: FC<RoleProtectedRouteProps> = ( ) => {

    return <Outlet />;
};

export default RoleProtectedRoute;
