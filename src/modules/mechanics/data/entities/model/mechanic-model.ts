import { MetadataModel } from "@/src/core/shared/entities/model/metadata-model";
import { AppointmentModel } from "@/src/modules/appointments/data/entities/model/appointment-model";
import { ServiceCenterModel } from "@/src/modules/service-centers/data/entities/model/service-center-model";
import { SpecializationModel } from "@/src/modules/specialization/data/entities/model/specialization-model";
import { UsersModel } from "@/src/modules/users/data/entities/model/users-model";

export interface MechanicModel {
    id?: string;
    user_id?: string;
    user?: UsersModel;
    service_center_id?: string;
    service_center?: ServiceCenterModel;
    appointments?: AppointmentModel[];
    experience_level?: string;
    is_active?: boolean;
    years_of_exp?: number;
    specializations?: SpecializationModel[];
    created_at?: Date;
    updated_at?: Date;
}





export interface MechanicResponseModel {
    mechanics: MechanicModel[];
    metadata: MetadataModel;
}