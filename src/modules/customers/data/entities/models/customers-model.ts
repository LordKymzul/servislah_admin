import { UsersModel } from "@/src/modules/users/data/entities/model/users-model";

export interface CustomersModel {
    id?: string;
    user_id?: string;
    user?: UsersModel;
    created_at?: string;
    updated_at?: string;
}