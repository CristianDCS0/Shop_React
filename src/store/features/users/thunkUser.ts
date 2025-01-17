import {TypeUser} from "@/types/TypeUser";
import {createThunk} from "@/store/features/thunk/thunkcrud";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiBackend} from "@/store/features/api/apiBackend.ts";

export const createUser = createThunk<TypeUser, 'id' | 'role' | 'address_id' | 'created_at' | 'updated_at'>(
    "users/createUser", // action Payload del thunk: redux toolkit
    "/users", // api URL
    ['id', 'role', 'address_id', 'created_at', 'updated_at'] // Omit
);

export const loginUser = createThunk<TypeUser, 'id' | 'name' | 'phone' | 'birthdate' | 'gender' | 'role' | 'address_id' | 'created_at' | 'updated_at'>(
    "users/loginUser",
    "/users/login",
    ['id', 'name', 'phone', 'birthdate', 'gender' ,'role', 'address_id', 'created_at', 'updated_at']
);

export const logoutUser = createAsyncThunk(
    "users/logoutUser",
    async () => {
        try {
            const response = await apiBackend.get("/users/logout");
            return response.data;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
        } catch (e: Error) {
            console.error("Error al cerrar sesión:", e);
        }
    }
);