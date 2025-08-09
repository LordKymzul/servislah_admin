"use client"

import * as React from "react"
import { useState } from "react"
import { useQueryAppointments } from "../../tanstack/appointment-tanstack"
import { QueryAppointmentDto } from "../../../data/entities/dto/query-appointment.dto"
import AppointmentTable from "../components/appointment-table"
import { InfoScreenType } from "@/src/core/shared/presentation/screens/info-screen"
import InfoScreen from "@/src/core/shared/presentation/screens/info-screen"
import { CalendarIcon, User } from "lucide-react"
import { MessageCircle } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"

import { UserPlus } from "lucide-react"
import DataCard from "@/src/core/shared/presentation/components/data-card"
import { Users } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { AppointmentOverviewChart } from "../components/appointment-overview-chart"
import { Button } from "@/components/ui/button"
import { DateRange } from "react-day-picker"
import { addDays, format as formatDate } from "date-fns"

const AppointmentsScreen = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState("")
    const itemsPerPage = 10
    const [calendarOpen, setCalendarOpen] = useState(false)



    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(),
        to: addDays(new Date(), 20),
    })

    const [queryParams, setQueryParams] = useState<QueryAppointmentDto>({
        page: currentPage,
        limit: itemsPerPage
    })

    const { data: appointmentsData, isLoading, isError, error } = useQueryAppointments(queryParams)

    const handleSearch = (term: string) => {
        setSearchTerm(term)
        setQueryParams(prev => ({
            ...prev,
            search: term
        }))
    }

    const handleFilterChange = (filters: Record<string, string>) => {
        const newQueryParams: QueryAppointmentDto = {
            ...queryParams,
            page: currentPage,
            limit: itemsPerPage
        }

        Object.entries(filters).forEach(([key, value]) => {
            if (key === 'status') {
                newQueryParams.status = value
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

    if (isError) {
        return <InfoScreen type={InfoScreenType.ERROR} title="Error" description={error.message} />
    }



    return (
        <div className="mx-auto py-4 px-4 w-full">


            <div className="flex flex-col md:flex-row md:items-center items-start justify-between w-full gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Appointments</h1>
                    <p className="text-sm text-muted-foreground">
                        Manage your appointments here.
                    </p>
                </div>

                <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            onClick={() => setCalendarOpen(true)}
                            variant="outline"
                            className="w-[280px] justify-start text-left font-normal"
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date?.from ? (
                                date.to ? (
                                    <>
                                        {formatDate(date.from, "LLL dd, yyyy")} -{" "}
                                        {formatDate(date.to, "LLL dd, yyyy")}
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
                            onSelect={(newDate: DateRange | undefined) => {
                                setDate(newDate)

                            }}
                            numberOfMonths={2}
                            className="rounded-md border shadow"
                        />
                    </PopoverContent>
                </Popover>
            </div>

            <div className="grid grid-cols-1  lg:grid-cols-3 gap-4 w-full mt-4">
                <DataCard
                    title="Total Appointments"
                    value={"0"}
                    icon={<Users className="w-4 h-4" />}
                    description="Total number of customers"
                />
                <DataCard
                    title="Total Pending"
                    value={"0"}
                    icon={<UserPlus className="w-4 h-4" />}
                    description="Total number of new customers"
                />
                <DataCard
                    title="Total Completed"
                    value={"0"}
                    icon={<MessageCircle className="w-4 h-4" />}
                    description="Total number of feedback"
                />

            </div>


            <div className="mt-4 w-full">
                <AppointmentOverviewChart />
            </div>

            <div className="mt-4 w-full">
                <AppointmentTable
                    enableHeader={true}
                    appointments={appointmentsData?.appointments || []}
                    totalItems={appointmentsData?.metadata?.total || 0}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    onSearch={handleSearch}
                    onFilterChange={handleFilterChange}
                    isLoading={isLoading}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    )
}

export default AppointmentsScreen