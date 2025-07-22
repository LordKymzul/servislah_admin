'use client'

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Eye, Building2, Wrench } from "lucide-react"
import { useRouter } from "next/navigation"
import { useQueryServiceCenters } from "../../tanstack/service-center-tanstack"
import { ServiceCenterModel } from "@/src/modules/service-centers/data/entities/model/service-center-model"
import { useState } from "react"
import DefaultTable from "@/src/core/shared/presentation/components/default-table"
import InfoScreen, { InfoScreenType } from "@/src/core/shared/presentation/screens/info-screen"
import LoadingScreen from "@/src/core/shared/presentation/screens/loading-screen"
import { toast } from "sonner"

const ServiceCenterScreen = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState("")
    const itemsPerPage = 10

    const { data: serviceCenters,
        isLoading,
        isError,
        error
    } = useQueryServiceCenters({
        page: currentPage,
        limit: itemsPerPage,
    });

    const router = useRouter();

    const handleViewServiceCenter = (serviceCenterId: string) => {
        router.push(`/settings/service-center/${serviceCenterId}`);
    }

    const columns = [
        {
            header: "Service Center Name",
            accessorKey: "name",
        },
        {
            header: "Phone",
            accessorKey: "phone",
        },
        {
            header: "Email",
            accessorKey: "email",
        },
        {
            header: "Address",
            accessorKey: "locations",
            cell: (row: ServiceCenterModel) => (
                <span>
                    {row.locations?.address}, {row.locations?.city}, {row.locations?.state}, {row.locations?.country}
                </span>
            ),
        },
    ]

    const filters = [
        {
            label: "City",
            value: "city",
            options: [
                { label: "Kuala Lumpur", value: "kuala_lumpur" },
                { label: "Penang", value: "penang" },
                { label: "Johor Bahru", value: "johor_bahru" },
                { label: "Melaka", value: "melaka" }
            ]
        },
        {
            label: "State",
            value: "state",
            options: [
                { label: "Selangor", value: "selangor" },
                { label: "Penang", value: "penang" },
                { label: "Johor", value: "johor" },
                { label: "Melaka", value: "melaka" }
            ]
        },
        {
            label: "Status",
            value: "status",
            options: [
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" },
                { label: "Pending", value: "pending" }
            ]
        }
    ]

    const handleSearch = (term: string) => {
        setSearchTerm(term)
        // Implement your search logic here
    }

    const handleFilterChange = (filters: Record<string, string>) => {
        console.log("Filters changed:", filters)
    }

    const handleSort = (column: string, direction: 'asc' | 'desc') => {
        // Implement your sorting logic here
        console.log("Sort:", column, direction)
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    if (isLoading) {
        return <LoadingScreen />
    }

    if (isError) {
        return <InfoScreen type={InfoScreenType.ERROR} title="Error" description={error?.message || "Failed to load service centers"} />
    }

    return (
        <div className="flex flex-col gap-4 w-full p-8">
            <DefaultTable
                title="Service Centers"
                description="Manage your service center's details"
                data={serviceCenters || []}
                columns={columns}
                filters={filters}
                enableFiltering={true}
                enableSearch={true}
                enableSorting={true}
                searchPlaceholder="Search service centers..."
                onSearch={handleSearch}
                onFilterChange={handleFilterChange}
                onSort={handleSort}
                enablePagination={true}
                totalItems={serviceCenters?.length || 0}
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
                        onClick: (row: ServiceCenterModel) => {
                            console.log("Edit:", row)
                            // Implement your edit action here
                        }
                    },
                    {
                        label: (
                            <div className="flex items-center gap-2">
                                <Eye className="h-4 w-4" />
                                <span>View Details</span>
                            </div>
                        ),
                        onClick: (row: ServiceCenterModel) => {
                            handleViewServiceCenter(row.id || "")
                        }
                    }
                ]}
            />
        </div>
    );
};

export default ServiceCenterScreen;