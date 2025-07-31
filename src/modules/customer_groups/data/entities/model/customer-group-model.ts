import { MetadataModel } from "@/src/core/shared/entities/model/metadata-model";
import { CustomersModel } from "@/src/modules/customers/data/entities/models/customers-model";
export interface CustomerGroupModel {
    id?: string;
    name?: string;
    description?: string;
    is_active?: boolean;
    customers?: CustomersModel[]
    created_at?: string;
    updated_at?: string;
}

export interface CustomerGroupResponseModel {
    customer_groups: CustomerGroupModel[];
    metadata: MetadataModel;
}