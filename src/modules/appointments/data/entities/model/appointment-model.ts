import { ServiceBayModel } from "@/src/modules/service-bays/data/entities/model/service-bay-model";
import { MechanicModel } from "@/src/modules/mechanics/data/entities/model/mechanic-model";
import { UsersModel } from "@/src/modules/users/data/entities/model/users-model";
import { VehicleModel } from "@/src/modules/vehicles/data/entities/model/vehicle-model";
import { ServiceCenterModel, ServiceCenterService } from "@/src/modules/service-centers/data/entities/model/service-center-model";
import { ServiceModel } from "@/src/modules/services/data/entities/model/service-model";

export class AppointmentModel {
    id?: string;
    service_center_id?: string;
    user_id?: string;
    vehicle_id?: string;
    mechanic_id?: string;
    service_bay_id?: string;
    service_center?: ServiceCenterModel;
    user?: UsersModel;
    vehicle?: VehicleModel;
    mechanic?: MechanicModel;
    service_bay?: ServiceBayModel;
    items?: AppointmentItemModel[];
    date?: string;
    time?: string;
    status?: string;
    created_at?: Date;
    updated_at?: Date;
}



export interface AppointmentItemModel {
    id?: string;
    service_appointment_id?: string;
    service_appointment?: AppointmentModel;
    service_id?: string;
    service?: ServiceModel;
    created_at?: Date;
    updated_at?: Date;
}