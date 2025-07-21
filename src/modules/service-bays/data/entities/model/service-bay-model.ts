import { ServiceCenterModel } from "@/src/modules/service-centers/data/entities/model/service-center-model";

export interface ServiceBayModel {
  id?: string;
  name?: string;
  bay_number?: string;
  service_center_id?: string;
  service_center?: ServiceCenterModel
  capacity?: number;
  equipment?: string[];
  specializations?: string[];
  current_vehicle?: {
    id?: string;
    make?: string;
    model?: string;
    license_plate?: string;
    owner_name?: string;
  };
  current_appointment_id?: string;
  status?: "AVAILABLE" | "OCCUPIED" | "MAINTENANCE" | "OUT_OF_SERVICE";
  hourly_rate?: number;
  last_maintenance_date?: string;
  next_maintenance_date?: string;
  total_services_completed?: number;
  average_service_time?: number;
  created_at?: string;
  updated_at?: string;
}
