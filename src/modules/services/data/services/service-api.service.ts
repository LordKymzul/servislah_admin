import { QueryServiceDto } from "../entities/dto/query-service.dto";
import { ServiceModel } from "../entities/model/service-model";

let services: ServiceModel[] = [

    {
        id: "afb818bf-90ea-4ca5-b2b9-1783b86a0b4d",
        name: "Oil Replacement",
        description: "-",
        price: 645.4,
        duration: 44,
        is_active: true,
        service_center_id: "4ce54aa3-6dec-4960-bda5-dc6c8813c931",
        service_center: {
            id: "4ce54aa3-6dec-4960-bda5-dc6c8813c931",
            name: "Service Center 1",
            phone: "123-456-7890",
            email: "info@servicecenter1.com",
            image: "https://via.placeholder.com/150",
            company_id: "1234567890",
            company: null,
            mechanics: [],
            specializations: [],
            services: [],
            locations: {
                id: "4ce54aa3-6dec-4960-bda5-dc6c8813c931",
                service_center_id: "4ce54aa3-6dec-4960-bda5-dc6c8813c931",
                address: "123 Main St",
                latitude: 37.7749,
                longitude: -122.4194,
                city: "Anytown",
                state: "CA",
                country: "USA",
                zip_code: "12345",
                created_at: "2025-06-12T23:10:09.4471+08:00",
                updated_at: "2025-06-12T23:10:09.4471+08:00"
            },
            appointments: null,
            operating_hours: [],
        },
        appoinment_items: null,
        created_at: "2025-06-12T23:10:09.4471+08:00",
        updated_at: "2025-06-12T23:10:09.4471+08:00"
    },
    {
        id: "afb818bf-90ea-4ca5-b2b9-1783b86a0b4d",
        name: "Oil Replacement",
        description: "-",
        price: 645.4,
        duration: 44,
        is_active: true,
        service_center_id: "4ce54aa3-6dec-4960-bda5-dc6c8813c931",
        service_center: {
            id: "4ce54aa3-6dec-4960-bda5-dc6c8813c931",
            name: "Service Center 1",
            phone: "123-456-7890",
            email: "info@servicecenter1.com",
            image: "https://via.placeholder.com/150",
            company_id: "1234567890",
            company: null,
            mechanics: [],
            specializations: [],
            services: [],
            locations: {
                id: "4ce54aa3-6dec-4960-bda5-dc6c8813c931",
                service_center_id: "4ce54aa3-6dec-4960-bda5-dc6c8813c931",
                address: "123 Main St",
                latitude: 37.7749,
                longitude: -122.4194,
                city: "Anytown",
                state: "CA",
                country: "USA",
                zip_code: "12345",
                created_at: "2025-06-12T23:10:09.4471+08:00",
                updated_at: "2025-06-12T23:10:09.4471+08:00"
            },
            appointments: null,
            operating_hours: [],
        },
        appoinment_items: null,
        created_at: "2025-06-12T23:10:09.4471+08:00",
        updated_at: "2025-06-12T23:10:09.4471+08:00"
    }
]

export const getServices = async (query: QueryServiceDto): Promise<ServiceModel[]> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return services;
}