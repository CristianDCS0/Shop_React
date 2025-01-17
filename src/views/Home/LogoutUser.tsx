import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from "@/store/app/hooks";
import { logoutUser } from "@/store/features/users/thunkUser.ts";

const LogoutUser = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(logoutUser());
        navigate('/');
    }, [dispatch, navigate]);

    return null; // No es necesario renderizar nada
};

export default LogoutUser;