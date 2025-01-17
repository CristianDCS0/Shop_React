import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TypeUser} from "@/types/TypeUser.ts";
import {createUser, loginUser, logoutUser} from "@/store/features/users/thunkUser";

type UserState = {
    user: TypeUser[];
    loading: boolean;
    error: string | null;
};

const initialState: UserState = {
    user: JSON.parse(localStorage.getItem('user') || '[]'),
    loading: false,
    error: null,
};

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        /* sign up user */
        builder.addCase(createUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(createUser.fulfilled, (state, action: PayloadAction<TypeUser>) => {
            state.loading = false;
            state.user.push(action.payload);
        });
        builder.addCase(createUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload ?? "Error al crear el usuario.";
        });

        /*Login user*/
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<TypeUser>) => {
            state.loading = false;
            state.user = [action.payload];
            localStorage.setItem('user', JSON.stringify(action.payload));
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload ?? "Error al iniciar sesion.";
        });

        /*Logout user*/
        builder.addCase(logoutUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.loading = false;
            state.user = [];
            localStorage.removeItem('user');
        });
        builder.addCase(logoutUser.rejected, (state, action) => {
            state.loading = false;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            state.error = action.payload || "Error al cerrar sesión.";
        });
    }
});

export default userSlice.reducer;