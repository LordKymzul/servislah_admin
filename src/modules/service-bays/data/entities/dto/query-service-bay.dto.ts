export interface QueryServiceBayDto {
  search?: string;
  status?: "AVAILABLE" | "OCCUPIED" | "MAINTENANCE" | "OUT_OF_SERVICE";
  service_center_id?: string;
  specialization?: string;
  capacity?: number;
  page?: number;
  limit?: number;
}
