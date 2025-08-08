export interface QueryReviewDto {
    page?: number
    limit?: number
    service_center_id?: string
    service_appointment_id?: string
    customer_id?: string
    rating?: number
    is_active?: boolean
}

