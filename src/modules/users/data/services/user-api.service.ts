import { axiosInstance } from "@/src/core/util/config";
import { UsersModel, UsersResponseModel } from "../entities/model/users-model";
import { AxiosError } from "axios";
import { QueryUserDto } from "../entities/dto/query-user.dto";
import { MetadataModel } from "@/src/core/shared/entities/model/metadata-model";

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



export const getUsers = async (token: string, query: QueryUserDto): Promise<UsersResponseModel> => {
    try {
        const response = await axiosInstance({ token: token }).get(`/users`, { params: query });
        let users: UsersModel[] = response.data.data.users;
        let metadata: MetadataModel = response.data.data.metadata;
        return {
            users,
            metadata
        };
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data.message);
        }
        throw new Error("Failed to get users");
    }
}