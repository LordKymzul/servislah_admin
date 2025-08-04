import { MetadataModel } from "@/src/core/shared/entities/model/metadata-model";

export interface UsersModel {
    id?: string;
    name?: string;
    email: string;
    role?: string;
    status?: string;
    phone?: string;
    created_at?: string;
    updated_at?: string;

}



export interface UsersResponseModel {
    users: UsersModel[]
    metadata: MetadataModel
}