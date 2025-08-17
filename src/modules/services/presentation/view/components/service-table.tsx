'use client'
import { Badge } from "@/components/ui/badge"
import DefaultTable from "@/src/core/shared/presentation/components/default-table"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ResponseGetAllServicesModel, ServiceModel } from "../../../data/entities/model/service-model"
import { Button } from "@/components/ui/button"
import { Edit, Eye, FileDown, Plus } from "lucide-react"


interface ServiceTableProps {
    services: ResponseGetAllServicesModel | undefined,
    totalItems: number
    currentPage: number
    itemsPerPage: number
    onSearch: (term: string) => void
    onFilterChange: (filters: Record<string, string>) => void
    onPageChange: (page: number) => void
    isLoading: boolean
    enableHeader: boolean
    clearFilters: () => void
}

const ServiceTable = ({
    services,
    totalItems,
    currentPage,
    itemsPerPage,
    onSearch,
    onFilterChange,
    onPageChange,
    isLoading,
    enableHeader = true,
    clearFilters
}: ServiceTableProps) => {

    const router = useRouter()



    const columns = [
        {
            header: "Name",
            accessorKey: "name",
        },
        {
            header: "Description",
            accessorKey: "description",
        },
        {
            header: "Price",
            accessorKey: "price",
        },
        {
            header: "Duration",
            accessorKey: "duration",
        },
        {
            header: "Available",
            accessorKey: "is_active",
            cell: (row: any) => (
                <Badge variant={row.is_active ? "default" : "outline"}>
                    {row.is_active ? "Available" : "Not Available"}
                </Badge>
            ),
        },
    ]

    const filters = [
        {
            label: "Status",
            value: "is_active",
            options: [
                { label: "Available", value: "true" },
                { label: "Not Available", value: "false" }
            ]
        },
        {
            label: "Duration",
            value: "duration",
            options: [
                { label: "0-1 Hour", value: "0-60" },
                { label: "1-2 Hours", value: "60-120" },
                { label: "2-3 Hours", value: "120-180" },
                { label: "3-4 Hours", value: "180-240" }
            ]
        },
        {
            label: "Price Range",
            value: "price",
            options: [
                { label: "Under $100", value: "0-100" },
                { label: "100-500", value: "100-500" },
                { label: "500-1000", value: "500-1000" }
            ]
        }
    ]



    return (
        <DefaultTable
            isLoading={isLoading}
            title="Services"
            description="Manage your service offerings and pricing"
            data={services?.services || []}
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
                        console.log("Add New Service")
                    }
                }
            ]}
            columns={columns}
            filters={filters}
            enableFiltering={true}
            enableSearch={true}
            enableSorting={true}
            searchPlaceholder="Search services..."
            onSearch={onSearch}
            onFilterChange={onFilterChange}
            enablePagination={true}
            totalItems={services?.metadata?.total || 0}
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
                        router.push(`/settings/service-center/services/${row.id}`)
                    }
                }
            ]}
        />
    )
}

export default ServiceTable