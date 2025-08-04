export interface QueryOperatingHoursDto {
    page?: number;
    limit?: number;
    open_time?: string;
    close_time?: string;
    is_active?: boolean;
    day?: number;
    service_center_id?: string;
}