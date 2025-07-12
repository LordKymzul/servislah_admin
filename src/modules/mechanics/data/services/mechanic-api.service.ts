import { axiosInstance } from "@/src/core/util/config";
import { QueryMechanicDto } from "../entities/dto/query-mechanic.dto";
import { MechanicModel, MechanicResponseModel } from "../entities/model/mechanic-model";
import { AxiosError } from "axios";
import { MetadataModel } from "@/src/core/shared/entities/model/metadata-model";

let mechanics: MechanicModel[] = [

    {
        id: "1",
        user_id: "1",
        user: {
            id: "1",
            name: "John Doe",
            email: "john.doe@example.com",
        },
        service_center_id: "1",
        service_center: {
            id: "1",
            name: "Service Center 1",
        },
        experience_level: "beginner",
        is_active: true,
        years_of_exp: 1,
        specializations: [],
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        id: "2",
        user_id: "2",
        user: {
            id: "2",
            name: "Jane Doe",
            email: "jane.doe@example.com",
        },
        service_center_id: "1",
        service_center: {
            id: "1",
            name: "Service Center 1",
        },
        experience_level: "beginner",
        specializations: [],
        is_active: true,
        years_of_exp: 1,
        created_at: new Date(),
        updated_at: new Date(),
    }
]
export const getMechanics = async (query: QueryMechanicDto, token: string): Promise<MechanicResponseModel> => {
    try {
        const response = await axiosInstance({ token: token }).get(`/mechanics`, {
            params: query
        });
        console.log('Mechanics Response', response.data.data);
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

