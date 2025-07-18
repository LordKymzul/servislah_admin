import { ServiceCenterModel } from "@/src/modules/service-centers/data/entities/model/service-center-model";


export interface CompanyModel {
    id: string;
    name: string;
    slug: string;
    description: string;
    email: string;
    logo: string;
    images: string[];
    service_centers: ServiceCenterModel[];
    created_at: string;
    updated_at: string;
}


