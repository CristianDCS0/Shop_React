import axios from "axios";
// Configuración de Axios para api Express
export const apiBackend = axios.create({
    baseURL: 'https://honest-charisma-production.up.railway.app/api/v1/',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});