'use client'

import DefaultTable from "@/src/core/shared/presentation/components/default-table"
import { SpecializationModel, SpecializationResponseModel } from "@/src/modules/specialization/data/entities/model/specialization-model"
import { Badge } from "@/components/ui/badge"
import { Eye, Plus } from "lucide-react"
import { useRouter } from "next/navigation"

interface SpecializationTableProps {
    specializations: SpecializationResponseModel | undefined
    totalItems: number
    currentPage: number
    itemsPerPage: number
    isLoading: boolean
    onSearch: (term: string) => void
    onFilterChange: (filters: Record<string, string>) => void
    onPageChange: (page: number) => void
    clearFilters: () => void
}

const SpecializationTable = ({
    specializations,
    totalItems,
    currentPage,
    itemsPerPage,
    isLoading,
    onSearch,
    onFilterChange,
    onPageChange,
    clearFilters,
}: SpecializationTableProps) => {
    const router = useRouter()

    const columns = [
        {
            header: "Name",
            accessorKey: "name",
            cell: (row: SpecializationModel) => (
                <div className="text-sm font-medium">{row.name}</div>
            ),
        },
        {
            header: "Description",
            accessorKey: "description",
            cell: (row: SpecializationModel) => (
                <div className="text-sm max-w-[300px] truncate">
                    {row.description}
                </div>
            ),
        },
        {
            header: "Service Center",
            accessorKey: "service_center.name",
            cell: (row: SpecializationModel) => (
                <div className="text-sm">{row.service_center?.name}</div>
            ),
        },
        {
            header: "Mechanics",
            accessorKey: "mechanics",
            cell: (row: SpecializationModel) => (
                <div className="text-sm">
                    {row.mechanics?.length || 0} mechanics
                </div>
            ),
        },
        {
            header: "Created",
            accessorKey: "created_at",
            cell: (row: SpecializationModel) => (
                <div className="text-sm text-gray-500">
                    {row.created_at ? new Date(row.created_at).toLocaleDateString() : '-'}
                </div>
            ),
        },
    ]

    const filters = [
        {
            label: "Service Center",
            value: "service_center_id",
            options: [] // This should be populated with service center options from the parent component
        }
    ]

    return (
        <div className="w-full">
            <DefaultTable
                title="Specializations"
                description="Manage mechanic specializations and expertise"
                data={specializations?.specializations || []}
                columns={columns}
                filters={filters}
                enableFiltering={true}
                enableSearch={true}
                enableSorting={true}
                searchPlaceholder="Search specializations..."
                onSearch={onSearch}
                onFilterChange={onFilterChange}
                enablePagination={true}
                totalItems={specializations?.metadata?.total || 0}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={onPageChange}
                isLoading={isLoading}
                clearFilters={clearFilters}
                rowActions={[
                    {
                        label: (
                            <div className="flex items-center gap-2">
                                <Eye className="h-4 w-4" />
                                <span>View Details</span>
                            </div>
                        ),
                        onClick: (row) => {
                            router.push(`/settings/service-center/specializations/${row.id}`)
                        }
                    }
                ]}
            />
        </div>
    )
}

export default SpecializationTable