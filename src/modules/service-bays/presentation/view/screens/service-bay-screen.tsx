"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Eye, Edit, Plus, FileDown, Users } from "lucide-react"
import { useQueryServiceBays } from "../../tanstack/service-bay-tanstack"
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

const ServiceBayScreen = () => {
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
    data: serviceBaysData,
    isLoading,
    isError,
    error
  } = useQueryServiceBays({
    service_center_id: selectedServiceCenterID || selectedServiceCenter?.id
  })

  const columns = [
    {
      header: "Bay Info",
      accessorKey: "name",
      cell: (row: any) => (
        <div className="space-y-1">
          <div className="font-medium">{row.name || `Bay ${row.id}`}</div>
          <div className="text-sm text-muted-foreground">
            Equipment: {row.appointments?.map((appointment: any) =>
              appointment.items?.map((item: any) => item.service?.name).join(", ") || "None"
            ).join(", ") || "None"}
          </div>
        </div>
      ),
    },
    {
      header: "Specializations",
      accessorKey: "specializations",
      cell: (row: any) => (
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
      cell: (row: any) => (
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
      cell: (row: any) => (
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

  if (isError || !serviceBaysData) {
    return <InfoScreen type={InfoScreenType.ERROR} title="Error" description={error?.message || "Failed to load service bays"} />
  }

  return (
    <>
      <div className="mx-auto py-4 px-4 w-full">
        <div className="flex flex-col md:flex-row gap-4 item-start md:items-center justify-between">

          <div className="flex flex-col item-start ">
            <h1 className="text-2xl font-bold">Service Bays</h1>
            <p className="text-sm text-muted-foreground">
              Manage service bays, equipment, and their current status
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
            title="Total Service Bays"
            value={"100"}
            icon={<Users className="w-4 h-4" />}
            description="Total number of service bays"
          />
          <DataCard
            title="Available Service Bays"
            value={"10"}
            icon={<Users className="w-4 h-4" />}
            description="Total number of service bays that are available"
          />
          <DataCard
            title="Most Used Service Bay"
            value={"Service Bay 1"}
            icon={<Users className="w-4 h-4" />}
            description="Most used service bay by number of services completed"
          />
        </div>

        <div className="mt-4">
          <DefaultTable
            title="Service Bays"
            description="Manage service bays, equipment, and their current status"
            data={serviceBaysData?.service_bays || []}
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
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            enablePagination={true}
            totalItems={serviceBaysData?.metadata?.total || 0}
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
                  router.push(`/settings/service-center/service-bay/${row.id}`)
                }
              }
            ]}
          />
        </div>
      </div>
    </>
  )
}

export default ServiceBayScreen
