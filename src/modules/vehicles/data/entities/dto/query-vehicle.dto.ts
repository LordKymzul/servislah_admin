export interface QueryVehicleDto {
  search?: string;
  status?: "ACTIVE" | "INACTIVE" | "MAINTENANCE";
  make?: string;
  model?: string;
  year?: number;
  fuel_type?: string;
  transmission?: string;
  page?: number;
  limit?: number;
}
