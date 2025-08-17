'use client'

import * as React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CalendarIcon, Users, Wrench } from "lucide-react"
import MechanicsTable from "../components/mechanics-table"
import { InfoScreenType } from "@/src/core/shared/presentation/screens/info-screen"
import InfoScreen from "@/src/core/shared/presentation/screens/info-screen"
import LoadingScreen from "@/src/core/shared/presentation/screens/loading-screen"
import { useQueryMechanics } from "../../tanstack/mechanic-tanstack"
import DataCard from "@/src/core/shared/presentation/components/data-card"
import { Calendar } from "@/components/ui/calendar"
import { QueryMechanicDto } from "../../../data/entities/dto/query-mechanic.dto"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { formatDate } from "date-fns"
import { addDays } from "date-fns"
import { DateRange } from "react-day-picker"
import { MechanicOverviewChart } from "../components/mechanic-overview-chart"
import DefaultCard from "@/src/core/shared/presentation/components/default-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const TopPerformers = [
    {
        name: "Emily Rodriguez",
        earnings: 15200,
        image: "/avatars/emily.jpg",
        status: "Active"
    },
    {
        name: "Jessica Lee",
        earnings: 13600,
        image: "/avatars/jessica.jpg",
        status: "Active"
    },
    {
        name: "Sarah Johnson",
        earnings: 12500,
        image: "/avatars/sarah.jpg",
        status: "Active"
    },
    {
        name: "Amanda Davis",
        earnings: 11400,
        image: "/avatars/amanda.jpg",
        status: "Active"
    },
    {
        name: "Michael Chen",
        earnings: 9800,
        image: "/avatars/michael.jpg",
        status: "Active"
    },
    {
        name: "Hakim",
        earnings: 9800,
        image: "/avatars/michael.jpg",
        status: "Active"
    },
    {
        name: "Haziq",
        earnings: 9800,
        image: "/avatars/michael.jpg",
        status: "Active"
    },
]

const MechanicsScreen = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState("")
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(),
        to: addDays(new Date(), 7),
    })
    const [calendarOpen, setCalendarOpen] = React.useState(false)

    const [queryParams, setQueryParams] = useState<QueryMechanicDto>({
        page: currentPage,
        limit: 10
    })

    const {
        data: mechanics,
        isLoading,
        isError,
        error
    } = useQueryMechanics(queryParams)

    const handleSearch = (term: string) => {
        setSearchTerm(term)
        setQueryParams(prev => ({
            ...prev,
            search: term
        }))
    }

    const handleFilterChange = (filters: Record<string, string>) => {
        const newQueryParams: QueryMechanicDto = {
            ...queryParams,
            page: currentPage,
            limit: 10
        }

        Object.entries(filters).forEach(([key, value]) => {
            switch (key) {
                case 'is_active':
                    newQueryParams.is_active = value === 'true'
                    break
                case 'years_of_exp':
                    newQueryParams.years_of_exp = parseInt(value)
                    break
                case 'experience_level':
                    newQueryParams.experience_level = value
                    break
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

    if (isLoading) {
        return <LoadingScreen />
    }

    if (isError) {
        return (
            <div className="mx-auto py-4 px-4 w-full">
                <InfoScreen type={InfoScreenType.ERROR} title="Error" description={error?.message} />
            </div>
        )
    }

    return (
        <div className="mx-auto py-4 px-4 w-full">
            <div className="flex flex-col md:flex-row md:items-center items-start justify-between w-full gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Mechanics</h1>
                    <p className="text-sm text-muted-foreground">
                        Manage your mechanics here.
                    </p>
                </div>

                <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            onClick={() => setCalendarOpen(true)}
                            variant="outline"
                            className="w-[280px] justify-start text-left font-normal">
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <DataCard
                    title="Total Mechanics"
                    value={mechanics?.metadata?.total?.toString() || "0"}
                    icon={<Users className="w-4 h-4" />}
                    description="Total number of mechanics"
                />
                <DataCard
                    title="Active Mechanics"
                    value={(mechanics?.mechanics?.filter(m => m.is_active)?.length || 0).toString()}
                    icon={<Users className="w-4 h-4" />}
                    description="Total number of mechanics that are active"
                />
                <DataCard
                    title="Top Mechanics"
                    value={mechanics?.mechanics?.[0]?.user?.name || "N/A"}
                    icon={<Users className="w-4 h-4" />}
                    description="Top 1 mechanics by rating"
                />
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-6 gap-4">
                <div className="col-span-1 md:col-span-4">
                    <MechanicOverviewChart />
                </div>
                <div className="col-span-1 md:col-span-2">
                    <DefaultCard>
                        <div className="divide-y">
                            <div className="flex flex-col p-4">
                                <h1 className="text-lg font-bold">Top Performance</h1>
                                <p className="text-sm text-muted-foreground">
                                    Top 10 mechanics by performance
                                </p>
                            </div>

                            <div className="flex flex-col p-4">
                                <div className="flex flex-col space-y-4">
                                    {TopPerformers.slice(0, 7).map((performer, index) => (
                                        <div key={index} className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Avatar>
                                                    <AvatarImage src={performer.image} />
                                                    <AvatarFallback>{performer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium">{performer.name}</span>
                                                    <span className="text-sm text-muted-foreground">${performer.earnings.toLocaleString()}</span>
                                                </div>
                                            </div>
                                            <span className="text-xs px-2 py-1 rounded-full bg-green-50 text-green-600">
                                                {performer.status}
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
                <MechanicsTable
                    mechanics={mechanics}
                    currentPage={currentPage}
                    itemsPerPage={10}
                    isLoading={isLoading}
                    onSearch={handleSearch}
                    onFilterChange={handleFilterChange}
                    onPageChange={handlePageChange}
                    clearFilters={() => {
                        setQueryParams({
                            page: 1,
                            limit: 10
                        })
                    }}
                />
            </div>
        </div>
    )
}

export default MechanicsScreen