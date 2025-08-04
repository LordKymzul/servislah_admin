import { axiosInstance } from "@/src/core/util/config"
import { QueryOperatingHoursDto } from "../entities/dto/query-operating-hours.dto"
import { OperatingHoursModel, ResponseOperatingHoursModel } from "../entities/model/operating-hours-model";
import { AxiosError } from "axios";
import { UpdateOperatingHoursDto } from "../entities/dto/update-operating-hours.dto";
import { CreateOperatingHoursDto } from "../entities/dto/create-operating-hours.dto";

export const getOperatingHours = async (token: string, query: QueryOperatingHoursDto): Promise<ResponseOperatingHoursModel> => {
    try {
        const response = await axiosInstance({ token: token }).get(`/operating-hours`, { params: query });
        let data: ResponseOperatingHoursModel = {
            operating_hours: response.data.data.operating_hours,
            metadata: response.data.data.metadata
        }
        return data
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data.message || "Failed to get operating hours");
        }
        throw new Error("Failed to get operating hours");
    }
}


export const getOperatingHourById = async (token: string, id: string): Promise<OperatingHoursModel> => {
    try {
        const response = await axiosInstance({ token: token }).get(`/operating-hours/${id}`);
        return response.data.data.operating_hours
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data.message || "Failed to get operating hour");
        }
        throw new Error("Failed to get operating hour");
    }
}

export const createOperatingHours = async (token: string, data: CreateOperatingHoursDto): Promise<OperatingHoursModel> => {
    try {
        const response = await axiosInstance({ token: token }).post(`/operating-hours`, data);
        return response.data.data.operating_hours
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data.message || "Failed to create operating hours");
        }
        throw new Error("Failed to create operating hours");
    }
}


export const updateOperatingHours = async (token: string, id: string, data: UpdateOperatingHoursDto): Promise<OperatingHoursModel> => {
    try {
        const response = await axiosInstance({ token: token }).patch(`/operating-hours/${id}`, data);
        if (response.status == 409) {
            throw new Error("Operating hours already exists");
        }
        return response.data.data.operating_hours
    } catch (error: any) {

        if (error instanceof AxiosError) {
            throw new Error(error.response?.data.message || "Failed to update operating hours");
        }
        throw new Error(error.message);
    }
}

export const deleteOperatingHours = async (token: string, id: string): Promise<OperatingHoursModel> => {
    try {
        const response = await axiosInstance({ token: token }).delete(`/operating-hours/${id}`);
        return response.data.data.operating_hours
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data.message || "Failed to delete operating hours");
        }
        throw new Error("Failed to delete operating hours");
    }
}