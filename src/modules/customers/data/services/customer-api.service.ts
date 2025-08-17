import { axiosInstance } from "@/src/core/util/config";
import { QueryCustomerDto } from "../entities/dto/query-customer.dto";
import { AxiosError } from "axios";
import { MetadataModel } from "@/src/core/shared/entities/model/metadata-model";
import { CustomersModel, CustomersResponseModel } from "../entities/models/customers-model";

export const getCustomers = async (token: string, query: QueryCustomerDto): Promise<CustomersResponseModel> => {
    try {
        const response = await axiosInstance({ token: token }).get(`/customers`, {
            params: query
        })
        let customers: CustomersModel[] = response.data.data.customers
        let metadata: MetadataModel = response.data.data.metadata
        return {
            customers: customers,
            metadata: metadata
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data.message)
        }
        throw new Error("Failed to get customers")
    }
}

export const getCustomerById = async (token: string, id: string): Promise<CustomersModel> => {
    try {
        const response = await axiosInstance({ token: token }).get(`/customers/${id}`)
        return response.data.data.customer
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data.message)
        }
        throw new Error("Failed to get customer")
    }
}

export const getCustomersByMechanicId = async (token: string, mechanicId: string, query: QueryCustomerDto): Promise<CustomersResponseModel> => {
    try {
        const response = await axiosInstance({ token: token }).get(`/customers/mechanic/${mechanicId}`, {
            params: query
        })
        let customers: CustomersModel[] = response.data.data.customers
        let metadata: MetadataModel = response.data.data.metadata
        return {
            customers: customers,
            metadata: metadata
        }
    }
    catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data.message)
        }
        throw new Error("Failed to get customers by mechanic id")
    }

}