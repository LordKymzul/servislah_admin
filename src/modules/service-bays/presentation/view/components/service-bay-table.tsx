'use client'

import { Badge } from "@/components/ui/badge"
import DefaultTable from "@/src/core/shared/presentation/components/default-table"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Edit, Eye, FileDown, Plus } from "lucide-react"
import { ResponseGetAllServiceBaysModel, ServiceBayModel } from "../../../data/entities/model/service-bay-model"

interface ServiceBayTableProps {
    serviceBays: ResponseGetAllServiceBaysModel | undefined,
    totalItems: number
    currentPage: number
    itemsPerPage: number
    onSearch: (term: string) => void
    onFilterChange: (filters: Record<string, string>) => void
    onPageChange: (page: number) => void
    isLoading: boolean
    enableHeader?: boolean
    clearFilters: () => void
}

const ServiceBayTable = ({
    serviceBays,
    totalItems,
    currentPage,
    itemsPerPage,
    onSearch,
    onFilterChange,
    onPageChange,
    isLoading,
    enableHeader = true,
    clearFilters
}: ServiceBayTableProps) => {
    const router = useRouter()

    const columns = [
        {
            header: "Bay Info",
            accessorKey: "name",
            cell: (row: ServiceBayModel) => (
                <div className="space-y-1">
                    <div className="font-medium">{row.name || `Bay ${row.id}`}</div>
                    <div className="text-sm text-muted-foreground">
                        Equipment: {row.appointments?.map((appointment) =>
                            appointment.items?.map((item) => item.service?.name).join(", ") || "None"
                        ).join(", ") || "None"}
                    </div>
                </div>
            ),
        },
        {
            header: "Specializations",
            accessorKey: "specializations",
            cell: (row: ServiceBayModel) => (
                <div className="flex flex-wrap gap-1">
                    {row.specializations?.map((spec: string, index: number) => (
                        <Badge key={index} variant="secondary">
                            {spec}
                        </Badge>
                    )) || "No specializations"}
                </div>
            ),
        },
        {
            header: "Status",
            accessorKey: "status",
            cell: (row: ServiceBayModel) => (
                <Badge
                    variant={row.status === "AVAILABLE" ? "default" :
                        row.status === "MAINTENANCE" ? "secondary" :
                            row.status === "OUT_OF_SERVICE" ? "destructive" :
                                "outline"}
                >
                    {row.status || "UNKNOWN"}
                </Badge>
            ),
        },
        {
            header: "Performance",
            accessorKey: "performance",
            cell: (row: ServiceBayModel) => (
                <div className="space-y-1">
                    <div className="text-sm">
                        {row.total_services_completed || 0} services completed
                    </div>
                    <div className="text-sm text-muted-foreground">
                        Avg. time: {row.average_service_time || 0} mins
                    </div>
                </div>
            ),
        },
    ]

    const filters = [
        {
            label: "Status",
            value: "status",
            options: [
                { label: "Available", value: "AVAILABLE" },
                { label: "Maintenance", value: "MAINTENANCE" },
                { label: "Out of Service", value: "OUT_OF_SERVICE" }
            ]
        },
        {
            label: "Specialization",
            value: "specialization",
            options: [
                { label: "Engine", value: "ENGINE" },
                { label: "Transmission", value: "TRANSMISSION" },
                { label: "Brakes", value: "BRAKES" },
                { label: "Electrical", value: "ELECTRICAL" }
            ]
        }
    ]

    return (
        <DefaultTable
            isLoading={isLoading}
            title="Service Bays"
            description="Manage service bays, equipment, and their current status"
            data={serviceBays?.service_bays || []}
            headerActions={[
                {
                    label: <Button variant="outline" size="sm">
                        <FileDown className="w-4 h-4 mr-1" />
                        Export
                    </Button>,
                    onClick: () => {
                        console.log("Export")
                    }
                },
                {
                    label: <Button variant="outline" size="sm">
                        <Plus className="w-4 h-4 mr-1" />
                        Add New
                    </Button>,
                    onClick: () => {
                        console.log("Add New Service Bay")
                    }
                }
            ]}
            columns={columns}
            filters={filters}
            enableFiltering={true}
            enableSearch={true}
            enableSorting={true}
            searchPlaceholder="Search service bays..."
            onSearch={onSearch}
            onFilterChange={onFilterChange}
            enablePagination={true}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={onPageChange}
            clearFilters={clearFilters}
            rowActions={[
                {
                    label: (
                        <div className="flex items-center gap-2">
                            <Edit className="h-4 w-4" />
                            <span>Edit</span>
                        </div>
                    ),
                    onClick: (row) => {
                        console.log("Edit:", row)
                    }
                },
                {
                    label: (
                        <div className="flex items-center gap-2">
                            <Eye className="h-4 w-4" />
                            <span>View Details</span>
                        </div>
                    ),
                    onClick: (row) => {
                        router.push(`/settings/service-center/service-bay/${row.id}`)
                    }
                }
            ]}
        />
    )
}

export default ServiceBayTable