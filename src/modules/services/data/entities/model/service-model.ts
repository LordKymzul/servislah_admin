import { MetadataModel } from "@/src/core/shared/entities/model/metadata-model";
import { AppointmentItemModel } from "@/src/modules/appointments/data/entities/model/appointment-model";
import { ServiceCenterModel } from "@/src/modules/service-centers/data/entities/model/service-center-model";

export interface ServiceModel {
    id?: string;
    name?: string;
    description?: string;
    price?: number;
    duration?: number;
    is_active?: boolean;
    service_center_id?: string;
    service_center?: ServiceCenterModel;
    appoinment_items?: AppointmentItemModel[];
    created_at?: string;
    updated_at?: string;
}



export interface ResponseGetAllServicesModel {
    metadata: MetadataModel;
    services: ServiceModel[];
}