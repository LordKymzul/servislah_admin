import { axiosInstance } from "@/src/core/util/config";
import { QueryMechanicDto } from "../entities/dto/query-mechanic.dto";
import { MechanicModel, MechanicResponseModel } from "../entities/model/mechanic-model";
import { AxiosError } from "axios";
import { MetadataModel } from "@/src/core/shared/entities/model/metadata-model";

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

