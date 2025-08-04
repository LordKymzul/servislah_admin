import { axiosInstance } from "@/src/core/util/config";
import { SpecializationModel, SpecializationResponseModel } from "../entities/model/specialization-model";
import { QuerySpecializationDto } from "../entities/dto/query-specialization.dto";
import { MetadataModel } from "@/src/core/shared/entities/model/metadata-model";
import { AxiosError } from "axios";

export const getSpecializations = async (token: string, query: QuerySpecializationDto): Promise<SpecializationResponseModel> => {
    try {
        const response = await axiosInstance({ token: token }).get(`/specializations`, { params: query });
        let specializations: SpecializationModel[] = response.data.data.specializations;
        let metadata: MetadataModel = response.data.data.metadata;
        return {
            specializations,
            metadata
        };
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data.message);
        }
        throw new Error("Failed to get specializations");
    }

}

export const getSpecializationById = async (token: string, id: string): Promise<SpecializationModel> => {
    try {
        const response = await axiosInstance({ token: token }).get(`/specializations/${id}`);
        return response.data.data.specialization;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data.message);
        }
        throw new Error("Failed to get specialization");
    }
}