'use client'

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import CustomerGroupTable from "../components/customer-group-table"
import { QueryCustomerGroupDto } from "../../../data/entities/dto/query-customer-group.dto"
import { useState } from "react"
import { useGetCustomerGroups } from "../../tanstack/customer-group-tanstack"
import { InfoScreenType } from "@/src/core/shared/presentation/screens/info-screen"
import InfoScreen from "@/src/core/shared/presentation/screens/info-screen"
import LoadingScreen from "@/src/core/shared/presentation/screens/loading-screen"

export const CustomerGroupScreen = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState("")
    const itemsPerPage = 10

    const [queryParams, setQueryParams] = useState<QueryCustomerGroupDto>({
        page: currentPage,
        limit: itemsPerPage
    })

    const { data: customerGroupsData, isLoading, isError, error } = useGetCustomerGroups(queryParams)

    const handleSearch = (term: string) => {
        setSearchTerm(term)
        setQueryParams(prev => ({
            ...prev,
            search: term
        }))
    }

    const handleFilterChange = (filters: Record<string, string>) => {
        const newQueryParams: QueryCustomerGroupDto = {
            ...queryParams,
            page: currentPage,
            limit: itemsPerPage
        }

        Object.entries(filters).forEach(([key, value]) => {
            if (key === 'is_active') {
                newQueryParams.is_active = value === 'true'
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
            <CustomerGroupTable
                clearFilters={() => {
                    setQueryParams({
                        page: 1,
                        limit: itemsPerPage
                    })
                }}
                isLoading={isLoading}
                customerGroups={customerGroupsData?.customer_groups || []}
                totalItems={customerGroupsData?.metadata?.total || 0}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                onSearch={handleSearch}
                onFilterChange={handleFilterChange}
                onPageChange={handlePageChange}
            />
        </div>
    )
}