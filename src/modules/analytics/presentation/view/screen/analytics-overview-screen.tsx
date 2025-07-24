'use client'
import DataCard from "@/src/core/shared/presentation/components/data-card"
import { Building2, Eye, Pencil } from "lucide-react"
import { AnalyticsOverviewChart } from "../components/analytics-overview-chart"
import DefaultTable from "@/src/core/shared/presentation/components/default-table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

let recentAppointments: any[] = [
    {
        date: "2025-01-01",
        total_appointments: 10,
        total_vehicles: 10,
        revenue: 1000,
    },
    {
        date: "2025-01-02",
        total_appointments: 10,
        total_vehicles: 10,
        revenue: 1000,
    },
    {
        date: "2025-01-03",
        total_appointments: 10,
        total_vehicles: 10,
        revenue: 1000,
    },
    {
        date: "2025-01-04",
        total_appointments: 10,
        total_vehicles: 10,
        revenue: 1000,
    },
    {
        date: "2025-01-05",
        total_appointments: 10,
        total_vehicles: 10,
        revenue: 1000,
    },
    {
        date: "2025-01-05",
        total_appointments: 10,
        total_vehicles: 10,
        revenue: 1000,
    },
    {
        date: "2025-01-05",
        total_appointments: 10,
        total_vehicles: 10,
        revenue: 1000,
    },
    {
        date: "2025-01-05",
        total_appointments: 10,
        total_vehicles: 10,
        revenue: 1000,
    },
    {
        date: "2025-01-05",
        total_appointments: 10,
        total_vehicles: 10,
        revenue: 1000,
    },
    {
        date: "2025-01-05",
        total_appointments: 10,
        total_vehicles: 10,
        revenue: 1000,
    },
    {
        date: "2025-01-05",
        total_appointments: 10,
        total_vehicles: 10,
        revenue: 1000,
    },
    {
        date: "2025-01-05",
        total_appointments: 10,
        total_vehicles: 10,
        revenue: 1000,
    },

    {
        date: "2025-01-05",
        total_appointments: 10,
        total_vehicles: 10,
        revenue: 1000,
    },

]

const AnalyticsOverviewScreen = () => {
    return (
        <div className="flex flex-col gap-4 w-full p-6">
            <div className="flex flex-col item-start">
                <h1 className="text-2xl  md:text-3xl font-bold">Overview</h1>
                <p className="text-sm md:text-base text-muted-foreground">
                    This is your overview of the system.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <DataCard
                    title="Total Service Centers"
                    value={"10"}
                    description="Total number of service centers"
                    icon={<Building2 className="h-4 w-4 text-blue-500" />}
                />
                <DataCard
                    title="Total Service Centers"
                    value={"10"}
                    description="Total number of service centers"
                    icon={<Building2 className="h-4 w-4 text-red-500" />}
                />
                <DataCard
                    title="Total Service Centers"
                    value={"10"}
                    description="Total number of service centers"
                    icon={<Building2 className="h-4 w-4 text-green-500" />}
                />
                <DataCard
                    title="Total Service Centers"
                    value={"10"}
                    description="Total number of service centers"
                    icon={<Building2 className="h-4 w-4 text-yellow-500" />}
                />
            </div>


            <AnalyticsOverviewChart />

            <Tabs defaultValue="appointments" className="w-full">
                <TabsList>
                    <TabsTrigger value="appointments">Mechanics</TabsTrigger>
                    <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
                    <TabsTrigger value="revenue">Service Centers</TabsTrigger>
                </TabsList>

                <TabsContent value="appointments">
                    <div className="flex flex-col gap-4 mt-2">
                        <RecentAppointmentsTable />
                    </div>
                </TabsContent>

                <TabsContent value="vehicles">
                    <div className="flex flex-col gap-4 mt-2">
                        <RecentAppointmentsTable />
                    </div>
                </TabsContent>

                <TabsContent value="revenue">
                    <div className="flex flex-col gap-4 mt-2">
                        <RecentAppointmentsTable />
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

const RecentAppointmentsTable = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState("")
    const itemsPerPage = 10

    const columns = [
        {
            header: "Date",
            accessorKey: "date",
        },
        {
            header: "Total Appointments",
            accessorKey: "total_appointments",
        },
        {
            header: "Total Vehicles",
            accessorKey: "total_vehicles",
        },
        {
            header: "Revenue",
            accessorKey: "revenue",
            cell: (row: any) => (
                <span className="font-medium">
                    ${row.revenue.toLocaleString()}
                </span>
            ),
        },
    ]

    const filters = [
        {
            label: "Date",
            value: "date",
        },
        {
            label: "Service Center",
            value: "service_center",
        },
        {
            label: "Vehicle",
            value: "vehicle",
        },
        {
            label: "Revenue",
            value: "revenue",
        },
    ]

    const handleSearch = (term: string) => {
        setSearchTerm(term)
        // Implement your search logic here
    }

    const handleFilterChange = (filters: Record<string, string>) => {
        // Implement your filter logic here
        console.log("Filters changed:", filters)
    }

    const handleSort = (column: string, direction: 'asc' | 'desc') => {
        // Implement your sorting logic here
        console.log("Sort:", column, direction)
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        // Implement your pagination logic here
    }

    return (
        <DefaultTable
            title="Recent Appointments"
            description="Overview of recent appointments in the system"
            data={recentAppointments}
            columns={columns}
            filters={filters}
            enableFiltering={true}
            enableSearch={true}
            enableSorting={true}
            searchPlaceholder="Search appointments..."
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            onSort={handleSort}
            enablePagination={true}
            totalItems={recentAppointments.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            rowActions={[
                {
                    label: (
                        <div className="flex items-center gap-2">
                            <Eye className="h-4 w-4" />
                            <span>View Details</span>
                        </div>
                    ),
                    onClick: (row) => {
                        console.log("View details:", row)
                        // Implement your view action here
                    }
                },
                {
                    label: (
                        <div className="flex items-center gap-2">
                            <Pencil className="h-4 w-4" />
                            <span>Edit</span>
                        </div>
                    ),
                    onClick: (row) => {
                        console.log("Edit:", row)
                        // Implement your edit action here
                    }
                }
            ]}
        />
    )
}

export default AnalyticsOverviewScreen