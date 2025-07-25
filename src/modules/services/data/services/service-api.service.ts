import axios, { AxiosError } from "axios";
import { QueryServiceDto } from "../entities/dto/query-service.dto";
import { ResponseGetAllServicesModel, ServiceModel } from "../entities/model/service-model";
import { axiosInstance } from "@/src/core/util/config";
import { UpdateServiceDto } from "../entities/dto/update-service.dto";


export const getServices = async (token: string, query: QueryServiceDto): Promise<ResponseGetAllServicesModel> => {

    try {

        const response = await axiosInstance({ token: token }).get(`/services`, { params: query });
        let data: ResponseGetAllServicesModel = {
            metadata: response.data.data.metadata,
            services: response.data.data.services
        }
        return data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data.message);
        }
        throw new Error("Failed to fetch services");
    }
}

export const getServiceById = async (token: string, id: string): Promise<ServiceModel> => {
    try {
        const response = await axiosInstance({ token: token }).get(`/services/${id}`);
        console.log('Service Response', response.data);
        return response.data.data.service;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data.message);
        }
        throw new Error("Failed to fetch service");
    }
}

export const updateService = async (token: string, id: string, data: UpdateServiceDto): Promise<ServiceModel> => {
    try {
        const response = await axiosInstance({ token: token }).patch(`/services/${id}`, data);
        return response.data.data.service;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data.message);
        }
        throw new Error("Failed to update service");
    }
}