import {createAsyncThunk} from "@reduxjs/toolkit";
import {TypeProduct} from "@/types/TypeProduct.ts";
import {apiBackend} from "@/store/features/api/apiBackend";
import {createThunk} from "@/store/features/thunk/thunkcrud";

// Thunk para obtener productos
export const getProducts = createAsyncThunk<TypeProduct[], void, { rejectValue: string }>(
    "products/getProducts",
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiBackend.get("/products");
            return response.data; // Lista de productos obtenida desde el servidor
        } catch (e:any) {
            console.error("Error al obtener productos:", e);
            return rejectWithValue(e.response?.data?.message || "Error al obtener productos.");
        }
    }
);

// Thunk para crear un nuevo producto excluir el id, created_at, updated_at, count
/*export const createProduct = createAsyncThunk(
    "products/createProduct",
    async (product: Omit<TypeProduct, 'id' | 'created_at' | 'updated_at' | 'count'>) => {
        try {
            const response = await apiBackend.post("/products", product);
            return response.data; // Devuelve el producto creado desde el servidor
        } catch (e) {
            console.error(e);
        }
    }
);*/

export const createProduct = createThunk<TypeProduct, 'id' | 'created_at' | 'updated_at' | 'count'>(
    "products/createProduct",
    "/products",
    ['id', 'created_at', 'updated_at', 'count']
);

// Thunk para actualizar un producto excluir el id, created_at
export const updateProduct = createAsyncThunk(
    "products/updateProduct",
    async (
        { id, product }: { id: string; product: Omit<TypeProduct, "id" | "created_at" | "updated_at" | "count"> },
        { rejectWithValue }
    ) => {
        try {
            const response = await apiBackend.put(`/products/${id}`, product);
            return response.data; // Producto actualizado desde el servidor
        } catch (e) {
            console.error("Error al actualizar el producto:", e);
            return rejectWithValue(e);
        }
    }
);

// Thunk para eliminar un producto
export const deleteProduct = createAsyncThunk<string, string, { rejectValue: string }>(
    "products/deleteProduct",
    async (id, { rejectWithValue } ) => {
        try {
            await apiBackend.delete(`/products/${id}`);
            return id; // Devuelve el ID del producto eliminado
        } catch (e:any) {
            console.error("Error al eliminar el producto:", e);
            return rejectWithValue(e.response?.data?.message || "Error al obtener productos.");
        }
    }
);