import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {apiexpress} from "@/client/api.ts";
import {TypeProduct} from "@/types/TypeProduct.ts";

interface ProductStore {
    products: TypeProduct[];
    getProducts: () => Promise<void>;
}

export const useProductStore = create<ProductStore>()(
    persist(
        (set) => ({
            products: [],
            getProducts: async () => {
                try {
                    const { data } = await apiexpress.get('/products');
                    set({ products: data });
                } catch (error) {
                    console.error('Error fetching products:', error);
                }
            },
        }),
        {
            name: 'product-storage',
        }
    )
)