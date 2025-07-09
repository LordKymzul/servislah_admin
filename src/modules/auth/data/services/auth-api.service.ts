import { axiosInstance } from "@/src/core/util/config";
import { LoginDto } from "../entities/dto/login-dto";
import { LoginResponseModel } from "../entities/model/login-response-model";
import { AxiosError } from "axios";
import { RegisterDto } from "../entities/dto/register-dto";
import { RegisterResponseModel } from "../entities/model/register-response-model";
import { GOLANG_SERVER_URL } from "@/src/core/util/constant";


export const customLogin = async (loginDto: LoginDto): Promise<LoginResponseModel> => {
    try {
        const response = await axiosInstance({ path: GOLANG_SERVER_URL }).post('/auth/login', loginDto);

        return response.data.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data.message || "Failed to login");
        }
        throw new Error("Failed to login");
    }
}

export const customRegister = async (registerDto: RegisterDto): Promise<RegisterResponseModel> => {
    try {
        const response = await axiosInstance({ path: GOLANG_SERVER_URL }).post('/auth/register', registerDto);
        return response.data.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data.message || "Failed to register");
        }
        throw new Error("Failed to register");
    }
}