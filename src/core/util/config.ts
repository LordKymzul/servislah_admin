import axios, { AxiosInstance } from "axios";
import { PYTHON_GATEWAY_URL } from "./constant";

export const axiosInstance = ({ token, path }: { token?: string, path?: string }): AxiosInstance => {
    return axios.create({
        baseURL: path || PYTHON_GATEWAY_URL,
        headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
        },
    });
}