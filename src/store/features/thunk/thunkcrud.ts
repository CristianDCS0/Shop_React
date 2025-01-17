import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiBackend} from "@/store/features/api/apiBackend";
export function createThunk<T, K extends keyof T>(action: string, url: string, fieldsOmit: K[]){
    return createAsyncThunk<T, T, { rejectValue: string }>(
        action,
        async (data, { rejectWithValue }) => {
            try {
                const dat = { ...data };
                fieldsOmit.forEach((field) => delete dat[field]);
                const response = await apiBackend.post<T>(url, dat);
                return response.data;
            } catch (e) {
                console.error("Error en la solicitud:", e);
                return rejectWithValue("Error en la operación. Inténtalo de nuevo.");
            }
        }
    );
}