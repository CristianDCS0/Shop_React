import axios from "axios";
// Configuración de Axios para api Express
export const apiBackend = axios.create({
    baseURL: 'http://localhost:8080/api/v1/',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});