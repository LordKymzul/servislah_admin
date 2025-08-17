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
import DefaultCard from "@/src/core/shared/presentation/components/default-card"
import ServiceBayOverviewChart from "../components/service-bay-overview-chart"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDate } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { DateRange } from "react-day-picker"
import { addDays } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { QueryServiceBayDto } from "../../../data/entities/dto/query-service-bay.dto"

const ServiceBayScreen = () => {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const itemsPerPage = 10
  const [calendarOpen, setCalendarOpen] = React.useState(false)

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  })

  // Top performing service bays
  let TopPerformers: any[] = [
    {
      name: "Service Bay 1",
      image: "https://via.placeholder.com/150",
      value: 2500,
      rank: 1
    },
    {
      name: "Service Bay 2",
      image: "https://via.placeholder.com/150",
      value: 2200,
      rank: 2
    },
    {
      name: "Service Bay 3",
      image: "https://via.placeholder.com/150",
      value: 2000,
      rank: 3
    },
    {
      name: "Service Bay 4",
      image: "https://via.placeholder.com/150",
      value: 1800,
      rank: 4
    },
    {
      name: "Service Bay 5",
      image: "https://via.placeholder.com/150",
      value: 1600,
      rank: 5
    },
    {
      name: "Service Bay 6",
      image: "https://via.placeholder.com/150",
      value: 1500,
      rank: 6
    },
    {
      name: "Service Bay 7",
      image: "https://via.placeholder.com/150",
      value: 1400,
      rank: 7
    }
  ]

  const {
    data: serviceCenters,
    isLoading: isServiceCentersLoading,
    isError: isServiceCentersError,
    error: serviceCentersError
  } = useQueryServiceCenters({})

  const [selectedServiceCenterID, setSelectedServiceCenterID] = useState<string | null>(null)

  // Update selected service center ID when data is loaded
  React.useEffect(() => {
    if (serviceCenters?.service_centers.length && !selectedServiceCenterID) {
      const firstServiceCenter = serviceCenters.service_centers[0]
      setSelectedServiceCenterID(firstServiceCenter.id || null)
    }
  }, [serviceCenters, selectedServiceCenterID])

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
    service_center_id: selectedServiceCenterID || undefined
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

  const [queryParams, setQueryParams] = useState<QueryServiceBayDto>({
    page: currentPage,
    limit: itemsPerPage,
    service_center_id: selectedServiceCenterID || undefined
  })

  // Update query params when selected service center changes
  React.useEffect(() => {
    if (selectedServiceCenterID) {
      setQueryParams(prev => ({
        ...prev,
        service_center_id: selectedServiceCenterID
      }))
    }
  }, [selectedServiceCenterID])

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    setQueryParams((prev: QueryServiceBayDto) => ({
      ...prev,
      name: term
    }))
  }

  const handleFilterChange = (filters: Record<string, string>) => {
    const newQueryParams: QueryServiceBayDto = {
      ...queryParams,
      page: currentPage,
      limit: itemsPerPage
    }

    Object.entries(filters).forEach(([key, value]) => {
      if (key === 'status') {
        newQueryParams.status = value
      }
      if (key === 'specialization') {
        newQueryParams.specialization = value
      }
    })

    setQueryParams(newQueryParams)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    setQueryParams((prev: QueryServiceBayDto) => ({
      ...prev,
      page
    }))
  }

  if (isError) {
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Select
              onValueChange={handleServiceCenterChange}
              defaultValue={selectedServiceCenterID || undefined}
            >
              <SelectTrigger className="w-[300px]">
                <SelectValue placeholder="Service Center" />
              </SelectTrigger>
              <SelectContent>
                {serviceCenters?.service_centers.map((serviceCenter) => (
                  <SelectItem
                    key={serviceCenter.id}
                    value={serviceCenter.id || ""}
                  >{serviceCenter.name || "N/A"}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  onClick={() => setCalendarOpen(true)}
                  variant="outline" className="w-[280px] justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {formatDate(date.from, "LLL dd, y")} -{" "}
                        {formatDate(date.to, "LLL dd, y")}
                      </>
                    ) : (
                      formatDate(date.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                  className="rounded-md border shadow"
                />
              </PopoverContent>
            </Popover>
          </div>
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

        <div className="mt-4 grid grid-cols-1 md:grid-cols-6 gap-4">
          <div className="col-span-1 md:col-span-4">
            <ServiceBayOverviewChart />
          </div>
          <div className="col-span-1 md:col-span-2">
            <DefaultCard>
              <div className="divide-y">
                <div className="flex flex-col p-4">
                  <h1 className="text-lg font-bold">Most Used Service Bays</h1>
                  <p className="text-sm text-muted-foreground">
                    Top 10 service bays by number of services completed
                  </p>
                </div>

                <div className="flex flex-col p-4">
                  <div className="flex flex-col space-y-4">
                    {TopPerformers.slice(0, 7).map((performer, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={performer.image} />
                            <AvatarFallback>{performer.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">{performer.name}</span>
                            <span className="text-sm text-muted-foreground">{performer.value.toLocaleString()}</span>
                          </div>
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-600">
                          {performer.rank}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </DefaultCard>
          </div>
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
            isLoading={isLoading}
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
