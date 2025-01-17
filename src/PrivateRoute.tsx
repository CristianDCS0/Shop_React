import { Route, useNavigate } from 'react-router-dom';
import {useAppSelector} from "@/store/app/hooks.ts";

const PrivateRoute = ({ element, ...rest }: any) => {
    const user = useAppSelector((state: any) => state.users.user);
    const navigate = useNavigate();
    // Si no hay un usuario autenticado, redirige a la página de login
    return (
        <Route
            {...rest}
            element={user ? element : navigate('/')} // Redirige a /login si no hay usuario
        />
    );
};

export default PrivateRoute;
