import { MetadataModel } from "@/src/core/shared/entities/model/metadata-model";
import { ServiceCenterModel } from "@/src/modules/service-centers/data/entities/model/service-center-model";

export interface OperatingHoursModel {
    id?: string;
    service_center_id?: string;
    day?: number;
    open_time?: string;
    close_time?: string;
    is_active?: boolean;
    created_at?: string;
    updated_at?: string;
    service_center?: ServiceCenterModel;
}
export interface ResponseOperatingHoursModel {
    operating_hours: OperatingHoursModel[];
    metadata: MetadataModel
}