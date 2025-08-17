import { MetadataModel } from "@/src/core/shared/entities/model/metadata-model";
import { MechanicModel } from "@/src/modules/mechanics/data/entities/model/mechanic-model";
import { OperatingHoursModel } from "@/src/modules/operating-hours/data/entities/model/operating-hours-model";

export interface ServiceCenterLocation {
    id?: string;
    service_center_id?: string;
    address?: string;
    latitude?: number;
    longitude?: number;
    city?: string;
    state?: string;
    country?: string;
    zip_code?: string;
    created_at?: string;
    updated_at?: string;
}



export interface ServiceCenterService {
    id?: string;
    name?: string;
    description?: string;
    price?: number;
    duration?: number;
    is_active?: boolean;
    service_center_id?: string;
    service_center?: ServiceCenterModel;
    appoinment_items?: any;
    created_at?: string;
    updated_at?: string;
}


export interface ServiceCenterModel {
    id?: string;
    name?: string;
    phone?: string;
    email?: string;
    image?: string;
    company_id?: string;
    company?: any;
    mechanics?: MechanicModel[];
    specializations?: SpecializationModel[];
    services?: ServiceCenterService[];
    locations?: ServiceCenterLocation;
    appointments?: any;
    operating_hours?: OperatingHoursModel[];
    reviews?: any[];
    service_bays?: any;
    created_at?: string;
    updated_at?: string;
}


export interface SpecializationModel {
    id?: string;
    name?: string;
    description?: string;
    service_center_id?: string;
    service_center?: ServiceCenterModel;
}



export interface ServiceCenterResponseModel {
    service_centers: ServiceCenterModel[];
    metadata: MetadataModel;
}