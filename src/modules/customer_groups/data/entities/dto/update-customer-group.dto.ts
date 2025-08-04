export interface UpdateCustomerGroupDto {
    name?: string
    description?: string
    is_active?: boolean
    customer_ids?: string[]
}