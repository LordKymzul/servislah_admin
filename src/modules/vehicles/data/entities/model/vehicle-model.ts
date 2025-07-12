import { MetadataModel } from "@/src/core/shared/entities/model/metadata-model";
import { AppointmentModel } from "@/src/modules/appointments/data/entities/model/appointment-model";
import { UsersModel } from "@/src/modules/users/data/entities/model/users-model";

export interface VehicleModel {
  id?: string;
  model?: string;
  year?: number;
  color?: string;
  license_plate?: string;
  user?: UsersModel | null;
  user_id?: string;
  fuel_type?: string;
  images?: string[];
  appointments?: AppointmentModel[];
  created_at?: string;
  updated_at?: string;
}



export interface VehicleResponseModel {
  vehicles: VehicleModel[];
  metadata: MetadataModel;
}