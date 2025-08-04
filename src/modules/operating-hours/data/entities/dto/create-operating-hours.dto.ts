export interface CreateOperatingHoursDto {
    service_center_id: string
    day: number
    open_time: string
    close_time: string
    is_active?: boolean
}