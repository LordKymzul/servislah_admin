"use client"

import InfoScreen, { InfoScreenType } from "@/src/core/shared/presentation/screens/info-screen"
import { useGetOperatingHours } from "../../tanstack/operating-hours-tanstack"
import LoadingScreen from "@/src/core/shared/presentation/screens/loading-screen"
import OperatingHoursTable from "../components/operating-hours-table"
import { useState } from "react"
import { useQueryServiceCenters } from "@/src/modules/service-centers/presentation/tanstack/service-center-tanstack"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"

export const OperatingHoursScreen = () => {
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

    const { data: operatingHoursData, isLoading, isError, error } = useGetOperatingHours({
        page: currentPage,
        limit: itemsPerPage,
        service_center_id: selectedServiceCenterID || selectedServiceCenter?.id
    })

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

    if (isLoading || isServiceCentersLoading) {
        return <LoadingScreen />
    }

    if (isError || !operatingHoursData) {
        return <InfoScreen
            title="Error"
            description={error?.message || "Failed to load operating hours"}
            type={InfoScreenType.ERROR}
        />
    }

    if (isServiceCentersError || !serviceCenters) {
        return <InfoScreen
            title="Error"
            description={serviceCentersError?.message || "Failed to load service centers"}
            type={InfoScreenType.ERROR}
        />
    }

    return (
        <div className="mx-auto py-4 px-4 w-full">
            <div className="mb-4">
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

            <OperatingHoursTable
                service_center_id={selectedServiceCenterID || selectedServiceCenter?.id || ""}
                isLoading={isLoading}
                operatingHours={operatingHoursData?.operating_hours || []}
                totalItems={operatingHoursData?.metadata?.total || 0}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                onSearch={handleSearch}
                onFilterChange={handleFilterChange}
                onPageChange={handlePageChange}
            />
        </div>
    )
}

export default OperatingHoursScreen