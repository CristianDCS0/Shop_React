import axios from 'axios';

export const apiexpress = axios.create({
  baseURL: 'https://honest-charisma-production.up.railway.app',
  timeout: 10000,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
});