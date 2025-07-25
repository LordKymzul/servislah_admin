import { axiosInstance } from "@/src/core/util/config";
import { ServiceCenterModel } from "../entities/model/service-center-model";
import { AxiosError } from "axios";
import { QueryServiceCenterDto } from "../entities/dto/query-service-center.dto";
import { UpdateServiceCenterDto } from "../entities/dto/update-service-center.dto";

let serviceCenters: ServiceCenterModel[] = [
    {
        id: "9fdab4d0-f1a4-4d27-9d63-6966e1336463",
        name: "ServisLah Express Gombak",
        phone: "0378901234",
        email: "g@servislah.com",
        image: "https://firebasestorage.googleapis.com/v0/b/servislah-e0a85.firebasestorage.app/o/service_center%2Fservice_center_1749822507?alt=media",
        company_id: "a8a1d2fb-dd67-429a-97fe-b1d0e87ae36c",
        company: null,
        mechanics: [],
        specializations: [],
        services: [],
        locations: {
            id: "9fdab4d0-f1a4-4d27-9d63-6966e1336463",
            service_center_id: "9fdab4d0-f1a4-4d27-9d63-6966e1336463",
            address: "Jalan SS2/24, SS2",
            latitude: 3.1126,
            longitude: 101.6197,
            city: "Kuala Lumpur",
            state: "Wilayah Persekutuan",
            country: "Malaysia",
            zip_code: "53000",
            created_at: "2025-06-13T21:48:31.474067+08:00",
            updated_at: "2025-06-13T21:48:31.474067+08:00"
        },
        appointments: null,
        operating_hours: [
            {
                id: "9dd8a507-f26b-40a7-82a0-e59ef6794128",
                service_center_id: "9fdab4d0-f1a4-4d27-9d63-6966e1336463",
                day: 1,
                open_time: "10:00",
                close_time: "17:00",
                is_active: true,
                created_at: "2025-06-13T21:48:31.474067+08:00",
                updated_at: "2025-06-13T21:54:09.107081+08:00"
            }
        ],
        reviews: [],
        service_bays: null,
        created_at: "2025-06-13T21:48:31.474067+08:00",
        updated_at: "2025-06-13T21:48:31.474067+08:00"
    }
];

export const getServiceCenters = async (token: string, query: QueryServiceCenterDto): Promise<ServiceCenterModel[]> => {
    try {
        const response = await axiosInstance({ token: token }).get(`/service-centers`, { params: query });
        return response.data.data.service_centers;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data.message || "Failed to get service centers");
        }
        throw new Error("Failed to get service centers");
    }
}


export const getServiceCenterById = async (token: string, id: string): Promise<ServiceCenterModel> => {
    try {
        const response = await axiosInstance({ token: token }).get(`/service-centers/${id}`);
        return response.data.data.service_center;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data.message || "Failed to get service center");
        }
        throw new Error("Failed to get service center");
    }
}

export const updateServiceCenter = async (token: string, id: string, data: UpdateServiceCenterDto): Promise<ServiceCenterModel> => {
    try {
        const response = await axiosInstance({ token: token }).patch(`/service-centers/${id}`, data);
        return response.data.data.service_center;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data.message || "Failed to update service center");
        }
        throw new Error("Failed to update service center");
    }
}