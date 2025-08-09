'use client'

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Plus, Users } from "lucide-react"
import ReviewTable from "../components/review-table"
import { useState } from "react"
import { QueryReviewDto } from "../../../data/entities/dto/query-review.dto"
import { useGetReviews } from "../../tanstack/review-tanstack"
import DataCard from "@/src/core/shared/presentation/components/data-card"

const ReviewScreen = () => {

    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState("")



    const [queryParams, setQueryParams] = useState<QueryReviewDto>({
        page: currentPage,
        limit: 10
    })

    const {
        data: reviews,
        isLoading,
        isError,
        error
    } = useGetReviews(
        {
            ...queryParams,
        }
    )

    const handleSearch = (term: string) => {
        setSearchTerm(term)
        setQueryParams(prev => ({
            ...prev,

        }))
    }

    const handleFilterChange = (filters: Record<string, string>) => {
        const newQueryParams: QueryReviewDto = {
            ...queryParams,
            page: currentPage,
            limit: 10
        }

        Object.entries(filters).forEach(([key, value]) => {
            if (key === 'is_active') {
                newQueryParams.is_active = value === 'true'
            }
            if (key === 'rating') {
                newQueryParams.rating = Number(value)
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


    return (
        <div className="mx-auto py-4 px-4 w-full">

            <div className="flex flex-col md:flex-row md:items-center items-start justify-between w-full gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Reviews</h1>
                    <p className="text-sm text-muted-foreground">
                        Manage your reviews here.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <DataCard
                    title="Total Reviews"
                    value={"100"}
                    icon={<Users className="w-4 h-4" />}
                    description="Total number of reviews"
                />
                <DataCard
                    title="Active Reviews"
                    value={"10"}
                    icon={<Users className="w-4 h-4" />}
                    description="Total number of mechanics that are active"
                />
                <DataCard
                    title="Recent Reviews"
                    value={"Hakim"}
                    icon={<Users className="w-4 h-4" />}
                    description="Recent reviewer by rating"
                />
            </div>

            <div className="mt-4 w-full">
                <ReviewTable
                    reviews={reviews?.reviews || []}
                    totalItems={reviews?.metadata?.total || 0}
                    currentPage={currentPage}
                    itemsPerPage={10}
                    onSearch={handleSearch}
                    onFilterChange={handleFilterChange}
                    onPageChange={handlePageChange}
                    isLoading={isLoading}
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

export default ReviewScreen
