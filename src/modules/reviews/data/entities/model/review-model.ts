import { MetadataModel } from "@/src/core/shared/entities/model/metadata-model"
import { AppointmentModel } from "@/src/modules/appointments/data/entities/model/appointment-model"
import { CustomersModel } from "@/src/modules/customers/data/entities/models/customers-model"
import { ServiceCenterModel } from "@/src/modules/service-centers/data/entities/model/service-center-model"

export interface ReviewModel {
    id: string
    service_appointment_id: string
    service_center_id: string
    customer_id: string
    service_appointment: AppointmentModel
    service_center: ServiceCenterModel
    customer: CustomersModel
    rating: number
    comment: string
    is_active: boolean
    images: string[]
    created_at: string
    updated_at: string
}



export interface ReviewsResponseModel {
    reviews: ReviewModel[]
    metadata: MetadataModel
}