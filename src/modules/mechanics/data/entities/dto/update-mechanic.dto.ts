import { ExperienceLevel } from "@/src/core/util/constant"

export interface UpdateMechanicDto {
    user_id?: string
    service_center_id?: string
    experience_level?: ExperienceLevel
    years_of_exp?: number
    is_active?: boolean
    specialization_ids?: string[]
}

