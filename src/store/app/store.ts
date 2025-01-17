import { configureStore } from '@reduxjs/toolkit';
import ProductReducer from '@/store/features/products/productSlice';
import UserReducer from '@/store/features/users/userSlice';
export const store = configureStore({
    reducer: {
        products: ProductReducer,
        users: UserReducer,
    },
})

// Tipos derivados del store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store

// Tipo para Thunks (acciones asincrónicas)
export type AppThunk<ReturnType = void> = (
    dispatch: AppDispatch,
    getState: () => RootState
) => ReturnType;