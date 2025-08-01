"use client"

import InfoScreen, { InfoScreenType } from "@/src/core/shared/presentation/screens/info-screen"
import { useGetCustomers } from "../../tanstack/customer-tanstack"
import LoadingScreen from "@/src/core/shared/presentation/screens/loading-screen"
import CustomerTable from "../components/customer-table"


export const CustomerScreen = () => {

    const { data: customers, isLoading, isError, error } = useGetCustomers({
        page: 1,
        limit: 10,
    })


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
            <CustomerTable
            isLoading={isLoading}
                customers={customers?.customers || []}
                totalItems={customers?.metadata?.total || 0}
                currentPage={1}
                itemsPerPage={10}
                onSearch={() => { }}
                onFilterChange={() => { }}
                onPageChange={() => { }}
            />
        </div>
    )
}