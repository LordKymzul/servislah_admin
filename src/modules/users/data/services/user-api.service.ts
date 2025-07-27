import { axiosInstance } from "@/src/core/util/config";
import { UsersModel } from "../entities/model/users-model";
import { AxiosError } from "axios";

export const getUserById = async (token: string, id: string): Promise<UsersModel> => {
    try {
        const response = await axiosInstance({ token: token }).get(`/users/${id}`);
        return response.data.data.user;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data.message);
        }
        throw new Error("Failed to get user");
    }
}

