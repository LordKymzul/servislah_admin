export interface VehicleModel {
  id?: string;
  make?: string;
  model?: string;
  year?: number;
  color?: string;
  license_plate?: string;
  vin?: string;
  owner?: {
    id?: string;
    name?: string;
    email?: string;
  };
  user_id?: string;
  last_service_date?: string;
  next_service_date?: string;
  mileage?: number;
  fuel_type?: string;
  transmission?: string;
  engine_size?: string;
  status?: "ACTIVE" | "INACTIVE" | "MAINTENANCE";
  created_at?: string;
  updated_at?: string;
}
