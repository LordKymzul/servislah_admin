import axios, { AxiosError } from "axios";
import { QueryServiceDto } from "../entities/dto/query-service.dto";
import { ServiceModel } from "../entities/model/service-model";
import { axiosInstance } from "@/src/core/util/config";
import { UpdateServiceDto } from "../entities/dto/update-service.dto";


export const getServices = async (token: string, query: QueryServiceDto): Promise<ServiceModel[]> => {

    try {

        const response = await axiosInstance({ token: token }).get(`/services`, { params: query });
        return response.data.data.services;
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
        const response = await axiosInstance({ token: token }).put(`/services/${id}`, data);
        return response.data.data.service;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data.message);
        }
        throw new Error("Failed to update service");
    }
}