import { MechanicModel } from "@/src/modules/mechanics/data/entities/model/mechanic-model";

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

export interface ServiceCenterOperatingHour {
    id?: string;
    service_center_id?: string;
    day?: number;
    open_time?: string;
    close_time?: string;
    is_active?: boolean;
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
    operating_hours?: ServiceCenterOperatingHour[];
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

