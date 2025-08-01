"use client"

import * as React from "react"
import { useState } from "react"
import { useQueryAppointments } from "../../tanstack/appointment-tanstack"
import { QueryAppointmentDto } from "../../../data/entities/dto/query-appointment.dto"
import AppointmentTable from "../components/appointment-table"
import { InfoScreenType } from "@/src/core/shared/presentation/screens/info-screen"
import InfoScreen from "@/src/core/shared/presentation/screens/info-screen"

const AppointmentsScreen = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState("")
    const itemsPerPage = 10

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
            <AppointmentTable
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
    )
}

export default AppointmentsScreen