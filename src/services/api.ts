import axios from "axios";
import { tokenService } from "./tokenService";

const apiUrl = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: apiUrl,
});

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        const token = tokenService.get();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;