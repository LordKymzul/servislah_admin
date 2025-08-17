export interface QueryServiceDto {
    max_price?: number;
    min_price?: number;
    max_duration?: number;
    min_duration?: number;
    is_active?: boolean;
    service_center_id?: string;
    service_center_name?: string;
    page?: number;
    limit?: number;
}



