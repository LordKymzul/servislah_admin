import { UsersModel } from "@/src/modules/users/data/entities/model/users-model";

export interface MechanicModel {
    id?: string;
    user_id?: string;
    user?: UsersModel;
    service_center_id?: string;
    service_center?: any;
    experience_level?: string;
    is_active?: boolean;
    years_of_exp?: number;
    created_at?: Date;
    updated_at?: Date;
}

