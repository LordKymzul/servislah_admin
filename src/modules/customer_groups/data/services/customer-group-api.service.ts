import { axiosInstance } from "@/src/core/util/config";
import { QueryCustomerGroupDto } from "../entities/dto/query-customer-group.dto";
import { CustomerGroupModel } from "../entities/model/customer-group-model";
import { AxiosError } from "axios";
import { MetadataModel } from "@/src/core/shared/entities/model/metadata-model";

let customerGroups: CustomerGroupModel[] = [
    {
        id: "1",
        name: "Customer Group 1",
        description: "Description 1",
        is_active: true,
        customers: [
            {
                id: "1",
                user: {
                    id: "1",
                    name: "John Doe",
                    email: "john.doe@example.com",
                    status: "active",
                    created_at: "2021-01-01",
                    updated_at: "2021-01-01",
                }
            }
        ],
    },
    {
        id: "2",
        name: "Customer Group 2",
        description: "Description 2",
        is_active: true,
        customers: [
            {
                id: "2",
                user: {
                    id: "2",
                    name: "Jane Doe",
                    email: "jane.doe@example.com",
                    status: "active",
                    created_at: "2021-01-01",
                    updated_at: "2021-01-01",
                }
            }
        ],
    },
]
export const getCustomerGroups = async (token: string, query: QueryCustomerGroupDto) => {
    try {
        const response = await axiosInstance({ token: token }).get(`/customer-groups`, {
            params: query
        })
        let customerGroups: CustomerGroupModel[] = response.data.data.customer_groups
        let metadata: MetadataModel = response.data.data.metadata
        return {
            customer_groups: customerGroups,
            metadata: metadata
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data.message)
        }
        throw new Error("Failed to get customer groups")
    }
}


export const getCustomerGroupById = async (token: string, id: string) => {
    try {
        const response = await axiosInstance({ token: token }).get(`/customer-groups/${id}`)
        return response.data.data.customer_group
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data.message)
        }
        throw new Error("Failed to get customer group")
    }
}