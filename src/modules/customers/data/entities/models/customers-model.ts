import { MetadataModel } from "@/src/core/shared/entities/model/metadata-model";
import { AppointmentModel } from "@/src/modules/appointments/data/entities/model/appointment-model";
import { CustomerGroupModel } from "@/src/modules/customer_groups/data/entities/model/customer-group-model";
import { UsersModel } from "@/src/modules/users/data/entities/model/users-model";

export interface CustomersModel {
    id?: string;
    user_id?: string;
    user?: UsersModel;
    appointments?: AppointmentModel[];
    customer_groups?: CustomerGroupModel[];
    created_at?: string;
    updated_at?: string;
}

export interface CustomersResponseModel {
    customers: CustomersModel[];
    metadata: MetadataModel;
}