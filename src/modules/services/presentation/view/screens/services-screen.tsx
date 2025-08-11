"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Eye, Edit, Plus, FileDown, Users } from "lucide-react"
import { useQueryServices } from "../../tanstack/service-tanstack"
import LoadingScreen from "@/src/core/shared/presentation/screens/loading-screen"
import { InfoScreenType } from "@/src/core/shared/presentation/screens/info-screen"
import InfoScreen from "@/src/core/shared/presentation/screens/info-screen"
import DefaultTable from "@/src/core/shared/presentation/components/default-table"
import { Badge } from "@/components/ui/badge"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useQueryServiceCenters } from "@/src/modules/service-centers/presentation/tanstack/service-center-tanstack"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import DataCard from "@/src/core/shared/presentation/components/data-card"

const ServicesScreen = () => {
    const router = useRouter()
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState("")
    const itemsPerPage = 10

    const {
        data: serviceCenters,
        isLoading: isServiceCentersLoading,
        isError: isServiceCentersError,
        error: serviceCentersError
    } = useQueryServiceCenters({})

    const selectedServiceCenter = serviceCenters?.[0]
    const [selectedServiceCenterID, setSelectedServiceCenterID] = useState<string | null>(selectedServiceCenter?.id || null)

    const handleServiceCenterChange = (serviceCenterId: string) => {
        toast.success(`Selected service center: ${serviceCenterId}`)
        setSelectedServiceCenterID(serviceCenterId)
    }

    const {
        data: servicesData,
        isLoading,
        isError,
        error
    } = useQueryServices({
        service_center_id: selectedServiceCenterID || selectedServiceCenter?.id
    })

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
        }
    ]

    const handleSearch = (term: string) => {
        setSearchTerm(term)
        // Add search functionality when API supports it
    }

    const handleFilterChange = (filters: Record<string, string>) => {
        // Add filter functionality when API supports it
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        // Add pagination functionality when API supports it
    }

    if (isLoading) {
        return <LoadingScreen />
    }

    if (isError || !servicesData) {
        return <InfoScreen type={InfoScreenType.ERROR} title="Error" description={error?.message || "Failed to load services"} />
    }

    return (
        <div className="mx-auto py-4 px-4 w-full">
            <div className="flex flex-col md:flex-row gap-4 item-start md:items-center justify-between">

                <div className="flex flex-col item-start ">
                    <h1 className="text-2xl font-bold">Services</h1>
                    <p className="text-sm text-muted-foreground">
                        Manage your service offerings and pricing
                    </p>
                </div>
                <Select
                    onValueChange={handleServiceCenterChange}
                    defaultValue={selectedServiceCenter?.id}
                >
                    <SelectTrigger className="w-[300px]">
                        <SelectValue placeholder="Service Center" />
                    </SelectTrigger>
                    <SelectContent>
                        {serviceCenters?.map((serviceCenter) => (
                            <SelectItem
                                key={serviceCenter.id}
                                value={serviceCenter.id || ""}
                            >{serviceCenter.name || "N/A"}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <DataCard
                    title="Total Services"
                    value={"100"}
                    icon={<Users className="w-4 h-4" />}
                    description="Total number of services"
                />
                <DataCard
                    title="Available Services"
                    value={"10"}
                    icon={<Users className="w-4 h-4" />}
                    description="Total number of services that are available"
                />
                <DataCard
                    title="Most Used Services"
                    value={"Oil Change"}
                    icon={<Users className="w-4 h-4" />}
                    description="Most used service by number of services completed"
                />
            </div>

            <div className="mt-4">
                <DefaultTable
                    title="Services"
                    description="Manage your service offerings and pricing"
                    data={servicesData?.services || []}
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
                    onSearch={handleSearch}
                    onFilterChange={handleFilterChange}
                    enablePagination={true}
                    totalItems={servicesData?.metadata?.total || 0}
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
            </div>




        </div>
    )
}

export default ServicesScreen;