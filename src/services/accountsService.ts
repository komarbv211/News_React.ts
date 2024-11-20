import axios from 'axios';
import { tokenService } from './tokenService';

const api = import.meta.env.VITE_API_ACCOUNT_URL;

export default axios.create({
    baseURL: api
});

export const accountService = {
    login(accessToken: string) {
        tokenService.save(accessToken);
    },
    logout() {
        tokenService.clear();
    },
    isAuthenticated(): boolean {
        return tokenService.get() !== null;
    }
}