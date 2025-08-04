import { axiosInstance } from "@/src/core/util/config";
import { QueryMechanicDto } from "../entities/dto/query-mechanic.dto";
import { MechanicModel, MechanicResponseModel } from "../entities/model/mechanic-model";
import { AxiosError } from "axios";
import { MetadataModel } from "@/src/core/shared/entities/model/metadata-model";
import { CreateMechanicDto } from "../entities/dto/create-mechanic.dto";
import { UpdateMechanicDto } from "../entities/dto/update-mechanic.dto";

export const getMechanics = async (query: QueryMechanicDto, token: string): Promise<MechanicResponseModel> => {
    try {
        const response = await axiosInstance({ token: token }).get(`/mechanics`, {
            params: query
        });
        let mechanics: MechanicModel[] = response.data.data.mechanics;
        let metadata: MetadataModel = response.data.data.metadata;
        return {
            mechanics,
            metadata
        };
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data.message);
        }
        throw new Error("Failed to get mechanics");
    }
}



export const getMechanicById = async (mechanicId: string, token: string): Promise<MechanicModel> => {
    try {
        const response = await axiosInstance({ token: token }).get(`/mechanics/${mechanicId}`);
        return response.data.data.mechanic;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data.message);
        }
        throw new Error("Failed to get mechanic");
    }
}



export const createMechanic = async (data: CreateMechanicDto, token: string): Promise<MechanicModel> => {
    try {
        const response = await axiosInstance({ token: token }).post(`/mechanics`, data);
        return response.data.data.mechanic;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data.message);
        }
        throw new Error("Failed to create mechanic");
    }
}

export const deleteMechanic = async (mechanicId: string, token: string): Promise<MechanicModel> => {
    try {
        const response = await axiosInstance({ token: token }).delete(`/mechanics/${mechanicId}`);
        return response.data.data.mechanic;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data.message);
        }
        throw new Error("Failed to delete mechanic");
    }
}

export const updateMechanic = async (mechanicId: string, data: UpdateMechanicDto, token: string): Promise<MechanicModel> => {
    try {
        const response = await axiosInstance({ token: token }).patch(`/mechanics/${mechanicId}`, data);
        return response.data.data.mechanic;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data.message);
        }
        throw new Error("Failed to update mechanic");
    }
}