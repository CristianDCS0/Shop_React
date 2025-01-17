import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { TypeProduct } from "@/types/TypeProduct.ts";
import {createProduct, deleteProduct, getProducts, updateProduct} from "@/store/features/products/thunkProduct.ts";

type ProductState = {
    product: TypeProduct[];
    loading: boolean;
    error: string | null;
};

const initialState: ProductState = {
    product: [],
    loading: false,
    error: null,
};
export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        /** GET PRODUCTS **/
        builder.addCase(getProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getProducts.fulfilled, (state, action: PayloadAction<TypeProduct[]>) => {
            state.loading = false;
            state.product = action.payload;
        });
        builder.addCase(getProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload ?? "Error al obtener productos";
        });

        /** CREATE PRODUCT **/
        builder.addCase(createProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(createProduct.fulfilled, (state, action: PayloadAction<TypeProduct>) => {
            state.loading = false;
            state.product.push(action.payload); // Agregar el producto creado al estado
        });
        builder.addCase(createProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload ?? "Error al crear productos";
        });

        /** UPDATE PRODUCT **/
        builder.addCase(updateProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateProduct.fulfilled, (state, action: PayloadAction<TypeProduct>) => {
            state.loading = false;
            const updatedProductIndex = state.product.findIndex((p) => p.id === action.payload.id);
            if (updatedProductIndex !== -1) {
                state.product[updatedProductIndex] = action.payload;
            }
        });
        builder.addCase(updateProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        /** DELETE PRODUCT **/
        builder.addCase(deleteProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(deleteProduct.fulfilled, (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.product = state.product.filter((product) => product.id !== action.payload);
        });
        builder.addCase(deleteProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload ?? "Error al eliminar productos";
        });
    },
});
export default productSlice.reducer;