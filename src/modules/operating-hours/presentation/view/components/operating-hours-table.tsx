'use client'

import DefaultTable from "@/src/core/shared/presentation/components/default-table"
import { OperatingHoursModel } from "@/src/modules/operating-hours/data/entities/model/operating-hours-model"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Eye, Plus, Trash2 } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { getDayName } from "@/src/core/util/helper"
import AddOperatingHoursDialog from "./add-operating-hours-dialog"
import { useDeleteOperatingHours } from "../../tanstack/operating-hours-tanstack"
import { toast } from "sonner"
import DefaultAlertDialog from "@/src/core/shared/presentation/components/default-alert-dialog"

interface OperatingHoursTableProps {
    operatingHours: OperatingHoursModel[]
    totalItems: number
    currentPage: number
    itemsPerPage: number
    isLoading: boolean
    onSearch: (term: string) => void
    onFilterChange: (filters: Record<string, string>) => void
    onPageChange: (page: number) => void
    service_center_id: string
}

const OperatingHoursTable = ({
    operatingHours,
    totalItems,
    currentPage,
    itemsPerPage,
    isLoading,
    onSearch,
    onFilterChange,
    onPageChange,
    service_center_id,
}: OperatingHoursTableProps) => {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)

    const { mutate: deleteOperatingHours, isPending } = useDeleteOperatingHours()
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [selectedOperatingHours, setSelectedOperatingHours] = useState<OperatingHoursModel | null>(null)

    const handleDelete = (id: string) => {
        deleteOperatingHours(id)
    }


    const columns = [
        {
            header: "Day",
            accessorKey: "day",
            cell: (row: OperatingHoursModel) => (
                <div className="text-sm">
                    {getDayName(row.day || 0)}
                </div>
            ),
        },
        {
            header: "Opening Time",
            accessorKey: "open_time",
            cell: (row: OperatingHoursModel) => (
                <div className="text-sm">
                    {row.open_time || 'N/A'}
                </div>
            ),
        },
        {
            header: "Closing Time",
            accessorKey: "close_time",
            cell: (row: OperatingHoursModel) => (
                <div className="text-sm">
                    {row.close_time || 'N/A'}
                </div>
            ),
        },
        {
            header: "Status",
            accessorKey: "is_active",
            cell: (row: OperatingHoursModel) => (
                <Badge variant={row.is_active ? "default" : "secondary"}>
                    {row.is_active ? 'Active' : 'Inactive'}
                </Badge>
            ),
        },
    ]

    const filters = [
        {
            label: "Status",
            value: "is_active",
            options: [
                { label: "Active", value: "true" },
                { label: "Inactive", value: "false" }
            ]
        }
    ]

    return (
        <div className="w-full">
            <DefaultTable
                title="Operating Hours"
                description="Manage service center operating hours"
                data={operatingHours || []}
                columns={columns}
                filters={filters}
                enableFiltering={true}
                enableSearch={true}
                enableSorting={true}
                searchPlaceholder="Search operating hours..."
                onSearch={onSearch}
                onFilterChange={onFilterChange}
                enablePagination={true}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={onPageChange}
                isLoading={isLoading}
                headerActions={[
                    {
                        label: <Button onClick={() => {
                            setIsOpen(true)
                        }}>
                            <Plus className="w-4 h-4 mr-2" />
                            Add
                        </Button>,
                        onClick: () => {
                            // Handle add action
                        }
                    }
                ]}
                rowActions={[
                    {
                        label: (
                            <div className="flex items-center gap-2">
                                <Eye className="h-4 w-4" />
                                <span>View Details</span>
                            </div>
                        ),
                        onClick: (row) => {
                            router.push(`/settings/service-center/operating-hours/${row.id}`)
                        }
                    },
                    {
                        label: (
                            <div

                                className="flex items-center gap-2"
                            >
                                <Trash2 className="h-4 w-4" />
                                <span>Delete</span>
                            </div>
                        ),
                        onClick: (row) => {
                            setSelectedOperatingHours(row)
                            setIsDeleteModalOpen(true)
                        }
                    },

                ]}
            />
            <AddOperatingHoursDialog
                service_center_id={service_center_id}
                isOpen={isOpen}
                onClose={() => { setIsOpen(false) }}
            />

            <DefaultAlertDialog
                open={isDeleteModalOpen}
                onOpenChange={setIsDeleteModalOpen}
                title="Delete Operating Hours"
                description="Are you sure you want to delete this operating hours?"
                onConfirm={() => {
                    deleteOperatingHours(selectedOperatingHours?.id || '', {
                        onSettled: () => {
                            setIsDeleteModalOpen(false)
                        },

                    })
                }}
            />
        </div>
    )
}



export default OperatingHoursTable