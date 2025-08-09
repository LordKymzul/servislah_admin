'use client'

import DefaultTable from "@/src/core/shared/presentation/components/default-table"
import { AppointmentModel } from "../../../data/entities/model/appointment-model"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Edit, Eye, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { formatDate, formatTime } from "@/src/core/util/helper"
import { useState } from "react"
import DefaultAlertDialog from "@/src/core/shared/presentation/components/default-alert-dialog"

interface AppointmentTableProps {
    appointments: AppointmentModel[]
    totalItems: number
    currentPage: number
    itemsPerPage: number
    onSearch: (term: string) => void
    onFilterChange: (filters: Record<string, string>) => void
    onPageChange: (page: number) => void
    isLoading: boolean
    enableHeader: boolean
}

const AppointmentTable = ({
    appointments,
    totalItems,
    currentPage,
    itemsPerPage,
    onSearch,
    onFilterChange,
    onPageChange,
    isLoading,
    enableHeader = true
}: AppointmentTableProps) => {
    const router = useRouter()

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [selectedAppointment, setSelectedAppointment] = useState<AppointmentModel | null>(null)

    const columns = [
        {
            header: "Customer",
            accessorKey: "customer.name",
            cell: (row: AppointmentModel) => (
                <div className="font-medium">{row.customer?.user?.email || 'N/A'}</div>
            ),
        },
        {
            header: "Vehicle",
            accessorKey: "vehicle.model",
            cell: (row: AppointmentModel) => (
                <div className="text-sm text-muted-foreground">
                    {row.vehicle ? `${row.vehicle.model} (${row.vehicle.license_plate})` : 'N/A'}
                </div>
            ),
        },
        {
            header: "Status",
            accessorKey: "status",
            cell: (row: AppointmentModel) => (
                <Badge variant={
                    row.status === 'COMPLETED' ? 'default' :
                        row.status === 'CANCELLED' ? 'destructive' :
                            row.status === 'PENDING' ? 'secondary' : 'outline'
                }>
                    {row.status || 'N/A'}
                </Badge>
            ),
        },
        {
            header: "Date",
            accessorKey: "date",
            cell: (row: AppointmentModel) => (
                <div className="text-sm">
                    {formatDate(row.date) || 'N/A'}
                </div>
            ),
        },
        {
            header: "Time",
            accessorKey: "time",
            cell: (row: AppointmentModel) => (
                <div className="text-sm">
                    {formatTime(row.time) || 'N/A'}
                </div>
            ),
        }
    ]

    const filters = [
        {
            label: "Status",
            value: "status",
            options: [
                { label: "Completed", value: "COMPLETED" },
                { label: "Pending", value: "PENDING" },
                { label: "Cancelled", value: "CANCELLED" }
            ]
        }
    ]

    return (
        <>
            <div className="w-full">
                <DefaultTable

                    title="Appointments"
                    description="Manage your appointments here"
                    data={appointments}
                    columns={columns}
                    filters={filters}
                    enableFiltering={true}
                    enableSearch={true}
                    enableSorting={true}
                    searchPlaceholder="Search appointments..."
                    onSearch={onSearch}
                    onFilterChange={onFilterChange}
                    enablePagination={true}
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    onPageChange={onPageChange}
                    isLoading={isLoading}
                    headerActions={enableHeader ? [
                        {
                            label: <Button>
                                <Calendar className="w-4 h-4 mr-2" />
                                New Appointment
                            </Button>,
                            onClick: () => {
                                console.log("Add appointment")
                            }
                        }
                    ] : []}
                    rowActions={[

                        {
                            label: (
                                <div className="flex items-center gap-2">
                                    <Eye className="h-4 w-4" />
                                    <span>View Details</span>
                                </div>
                            ),
                            onClick: (row) => {
                                router.push(`/appointments/${row.id}`)
                            }
                        },
                        {
                            label: (
                                <div className="flex items-center gap-2">
                                    <Trash2 className="h-4 w-4" />
                                    <span>Delete</span>
                                </div>
                            ),
                            onClick: (row) => {
                                setSelectedAppointment(row)
                                setIsDeleteModalOpen(true)
                            }
                        },
                    ]}
                />
            </div>

            <DefaultAlertDialog
                open={isDeleteModalOpen}
                onOpenChange={setIsDeleteModalOpen}
                title="Delete Appointment"
                description="Are you sure you want to delete this appointment?"
                onConfirm={() => {
                    console.log("Delete:", selectedAppointment)
                }}
            />
        </>
    )
}

export default AppointmentTable
