import { MetadataModel } from "@/src/core/shared/entities/model/metadata-model";
import { MechanicModel } from "@/src/modules/mechanics/data/entities/model/mechanic-model";
import { ServiceCenterModel } from "@/src/modules/service-centers/data/entities/model/service-center-model";

export interface SpecializationModel {
    id?: string;
    name?: string;
    description?: string;
    service_center_id?: string;
    service_center?: ServiceCenterModel;
    mechanics?: MechanicModel[];
    created_at?: Date;
    updated_at?: Date;
}



export interface SpecializationResponseModel {
    specializations: SpecializationModel[]
    metadata: MetadataModel
}