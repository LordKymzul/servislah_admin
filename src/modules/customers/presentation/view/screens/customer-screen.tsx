"use client"

import InfoScreen, { InfoScreenType } from "@/src/core/shared/presentation/screens/info-screen"
import { useGetCustomers } from "../../tanstack/customer-tanstack"
import LoadingScreen from "@/src/core/shared/presentation/screens/loading-screen"
import CustomerTable from "../components/customer-table"
import DataCard from "@/src/core/shared/presentation/components/data-card"
import { CalendarIcon, MessageCircle, User, UserPlus, Users } from "lucide-react"
import { CustomerOverviewChart } from "../components/customer-overview-chart"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { addDays, format as formatDate } from "date-fns"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { DateRange } from "react-day-picker"
import { QueryCustomerDto } from "../../../data/entities/dto/query-customer.dto"

export const CustomerScreen = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState("")
    const itemsPerPage = 10

    const [queryParams, setQueryParams] = useState<QueryCustomerDto>({
        page: currentPage,
        limit: itemsPerPage
    })

    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(),
        to: addDays(new Date(), 20),
    })
    const [calendarOpen, setCalendarOpen] = useState(false)

    const { data: customers, isLoading, isError, error } = useGetCustomers(queryParams)

    const handleSearch = (term: string) => {
        setSearchTerm(term)
        setQueryParams(prev => ({
            ...prev,
            search: term
        }))
    }

    const handleFilterChange = (filters: Record<string, string>) => {
        const newQueryParams: QueryCustomerDto = {
            ...queryParams,
            page: currentPage,
            limit: itemsPerPage
        }

        Object.entries(filters).forEach(([key, value]) => {
            // if (key === 'is_active') {
            //     newQueryParams. = value === 'true'
            // }
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
        return (
            <InfoScreen
                title="Error"
                description={error.message}
                type={InfoScreenType.ERROR}
            />
        )
    }

    return (
        <div className="flex flex-col gap-4 items-start w-full p-6">
            <div className="flex flex-col md:flex-row md:items-center items-start justify-between w-full gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Customers</h1>
                    <p className="text-sm text-muted-foreground">
                        Manage your customers here.
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
                            onSelect={(newDate) => {
                                setDate(newDate)

                            }}
                            numberOfMonths={2}
                            className="rounded-md border shadow"
                        />
                    </PopoverContent>
                </Popover>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                <DataCard
                    title="Total Customers"
                    value={customers?.metadata?.total.toString() || "0"}
                    icon={<Users className="w-4 h-4" />}
                    description="Total number of customers"
                />
                <DataCard
                    title="New Customers"
                    value={customers?.metadata?.total.toString() || "0"}
                    icon={<UserPlus className="w-4 h-4" />}
                    description="Total number of new customers"
                />
                <DataCard
                    title="Total Feedback"
                    value={customers?.metadata?.total.toString() || "0"}
                    icon={<MessageCircle className="w-4 h-4" />}
                    description="Total number of feedback"
                />
                <DataCard
                    title="Top Customers"
                    value={customers?.metadata?.total?.toString() || "0"}
                    icon={<User className="w-4 h-4" />}
                    description="Top customers by rating"
                />
            </div>

            <div className="mt-4 w-full">
                <CustomerOverviewChart />
            </div>

            <CustomerTable
                isLoading={isLoading}
                customers={customers?.customers || []}
                totalItems={customers?.metadata?.total || 0}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                onSearch={handleSearch}
                onFilterChange={handleFilterChange}
                onPageChange={handlePageChange}
            />
        </div>
    )
}