import axios from 'axios';

export const apiexpress = axios.create({
  baseURL: 'https://honest-charisma-production.up.railway.app/api/v1/',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
});