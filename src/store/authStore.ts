import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {TypeUser} from "@/types/TypeUser.ts";
import {apiexpress} from "@/client/api.ts";

interface AuthStore {
    user: TypeUser | null;
    login: (user: TypeUser) => void;
    register: (user: TypeUser) => void;
    profile: () => void;
    logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,

            register: async(user)=> {
                try{
                    await apiexpress.post('/api/v1/users/register', user);
                }catch (e){
                    console.log(e);
                }
            },

            login: async (user) => {
                try{
                    await apiexpress.post('/api/v1/users/login', user);
                    useAuthStore.getState().profile();
                }catch (e) {
                    console.log(e);
                }
            },

            profile: async () => {
                try{
                    const {data} = await apiexpress.get('/api/v1/users/profile');
                    set({ user: data });
                }catch (e) {
                    console.log(e);
                }
            },

            logout: async () => {
                try{
                    await apiexpress.get('/api/v1/users/logout');
                    set({ user: null });
                }catch (e) {
                    console.log(e);
                }
            },
        }),
        {
            name: 'auth-storage',
        }
    )
);