'use client'

import { useState } from "react"
import DefaultTable from "@/src/core/shared/presentation/components/default-table"
import { useQueryVehicles } from "../../tanstack/vehicle-tanstack"
import { QueryVehicleDto } from "../../../data/entities/dto/query-vehicle.dto"
import { Badge } from "@/components/ui/badge"
import { Edit, Eye } from "lucide-react"
import { useRouter } from "next/navigation"
import { VehicleModel } from "../../../data/entities/model/vehicle-model"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const VehiclesTable = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState("")
    const itemsPerPage = 10

    const [queryParams, setQueryParams] = useState<QueryVehicleDto>({
        page: currentPage,
        limit: itemsPerPage
    })

    const { data: vehiclesData, isLoading } = useQueryVehicles(queryParams)
    const router = useRouter()

    const columns = [
        {
            header: "Vehicle",
            accessorKey: "model",
            cell: (row: VehicleModel) => (
                <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                        <AvatarImage
                            src={row.images?.[0]}
                            alt={row.model || "Vehicle"}
                        />
                        <AvatarFallback>
                            {row.model?.substring(0, 2).toUpperCase() || "VH"}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="font-medium">{row.model}</div>
                        <div className="text-sm text-muted-foreground">Year: {row.year}</div>
                    </div>
                </div>
            ),
        },
        {
            header: "Color",
            accessorKey: "color",
            cell: (row: VehicleModel) => (
                <div className="flex items-center gap-2">
                    <div
                        className="w-4 h-4 rounded-full border"
                        style={{ backgroundColor: row.color?.toLowerCase() }}
                    />
                    {row.color}
                </div>
            ),
        },
        {
            header: "License Plate",
            accessorKey: "license_plate",
            cell: (row: VehicleModel) => (
                <Badge variant="outline">
                    {row.license_plate}
                </Badge>
            ),
        },
        {
            header: "Owner",
            accessorKey: "user",
            cell: (row: VehicleModel) => (
                <div>
                    <div className="font-medium">{row.user?.name || "N/A"}</div>
                    <div className="text-sm text-muted-foreground">{row.user?.email || "N/A"}</div>
                </div>
            ),
        },
        {
            header: "Fuel Type",
            accessorKey: "fuel_type",
            cell: (row: VehicleModel) => (
                <Badge variant="secondary">
                    {row.fuel_type}
                </Badge>
            ),
        },
    ]

    const filters = [
        {
            label: "Fuel Type",
            value: "fuel_type",
            options: [
                { label: "Gasoline", value: "GASOLINE" },
                { label: "Electric", value: "ELECTRIC" },
                { label: "Hybrid", value: "HYBRID" }
            ]
        }
    ]

    const handleSearch = (term: string) => {
        setSearchTerm(term)
        setQueryParams(prev => ({
            ...prev,
            search: term
        }))
    }

    const handleFilterChange = (filters: Record<string, string>) => {
        const newQueryParams: QueryVehicleDto = {
            page: currentPage,
            limit: itemsPerPage
        }

        // Convert string values to appropriate types based on QueryVehicleDto
        Object.entries(filters).forEach(([key, value]) => {
            if (key === 'fuel_type') {
                newQueryParams.fuel_type = value
            }
        })

        
        setQueryParams(newQueryParams)
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        setQueryParams(prev => ({
            ...prev,
            page
        }))
    }

    const handleViewVehicle = (vehicleId: string) => {
        router.push(`/vehicles/${vehicleId}`)
    }

    return (
        <DefaultTable
            title="Vehicles"
            description="Manage all vehicles in the system"
            data={vehiclesData?.vehicles || []}
            columns={columns}
            filters={filters}
            enableFiltering={true}
            enableSearch={true}
            enableSorting={true}
            searchPlaceholder="Search vehicles..."
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            enablePagination={true}
            totalItems={vehiclesData?.metadata?.total || 0}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
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
                        // Implement edit action
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
                        handleViewVehicle(row.id || "")
                    }
                }
            ]}
        />
    )
}

export default VehiclesTable