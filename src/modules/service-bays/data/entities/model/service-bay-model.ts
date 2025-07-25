import { MetadataModel } from "@/src/core/shared/entities/model/metadata-model";
import { AppointmentItemModel, AppointmentModel } from "@/src/modules/appointments/data/entities/model/appointment-model";
import { ServiceCenterModel } from "@/src/modules/service-centers/data/entities/model/service-center-model";
import { VehicleModel } from "@/src/modules/vehicles/data/entities/model/vehicle-model";

export interface ServiceBayModel {
  id?: string;
  name?: string;
  service_center_id?: string;
  service_center?: ServiceCenterModel;
  appointments?: AppointmentModel[];
  specializations?: string[];
  status?: 'AVAILABLE' | 'MAINTENANCE' | 'OUT_OF_SERVICE' | 'OCCUPIED';
  current_vehicle?: VehicleModel;
  total_services_completed?: number;
  average_service_time?: number;
  created_at?: string;
  updated_at?: string;
}

export interface ResponseGetAllServiceBaysModel {
  metadata: MetadataModel,
  service_bays: ServiceBayModel[]
}