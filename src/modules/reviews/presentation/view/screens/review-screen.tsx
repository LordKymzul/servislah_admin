'use client'

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import ReviewTable from "../components/review-table"
import { useState } from "react"
import { QueryReviewDto } from "../../../data/entities/dto/query-review.dto"
import { useGetReviews } from "../../tanstack/review-tanstack"

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
    )
}

export default ReviewScreen
