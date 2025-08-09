import axios, { AxiosError } from "axios";
import { QueryAppointmentDto } from "../entities/dto/query-appointment.dto";
import { AppointmentModel, AppointmentResponseModel } from "../entities/model/appointment-model";
import { axiosInstance } from "@/src/core/util/config";
import { MetadataModel } from "@/src/core/shared/entities/model/metadata-model";
import { CustomersModel } from "@/src/modules/customers/data/entities/models/customers-model";



export const getAppointments = async (token: string, query: QueryAppointmentDto): Promise<AppointmentResponseModel> => {
    try {

        const response = await axiosInstance({ token: token }).get(`/appointments`, {
            params: query
        })

        let appointments: AppointmentModel[] = response.data.data.appoinments
        let metadata: MetadataModel = response.data.data.metadata

        return {
            appointments: appointments,
            metadata: metadata
        }

    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data.message || "An error occurred while fetching appointments");
        }
        throw new Error("An error occurred while fetching appointments");
    }
}

export const getAppointmentById = async (token: string, id: string): Promise<AppointmentModel> => {
    try {
        const response = await axiosInstance({ token: token }).get(`/appointments/${id}`)
        return response.data.data.appoinment
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data.message || "An error occurred while fetching appointment");
        }
        throw new Error("An error occurred while fetching appointment");
    }
}