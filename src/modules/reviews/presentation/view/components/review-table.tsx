'use client'

import DefaultTable from "@/src/core/shared/presentation/components/default-table"
import { ReviewModel } from "@/src/modules/reviews/data/entities/model/review-model"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Eye, Plus, Star } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface ReviewTableProps {
    reviews: ReviewModel[]
    totalItems: number
    currentPage: number
    itemsPerPage: number
    isLoading: boolean
    onSearch: (term: string) => void
    onFilterChange: (filters: Record<string, string>) => void
    onPageChange: (page: number) => void
    clearFilters: () => void
}

const ReviewTable = ({
    reviews,
    totalItems,
    currentPage,
    itemsPerPage,
    isLoading,
    onSearch,
    onFilterChange,
    onPageChange,
    clearFilters,
}: ReviewTableProps) => {
    const router = useRouter()

    const columns = [
        {
            header: "Customer",
            accessorKey: "customer.user.email",
            cell: (row: ReviewModel) => (
                <div className="text-sm">{row.customer?.user?.email}</div>
            ),
        },
        {
            header: "Service Center",
            accessorKey: "service_center.name",
            cell: (row: ReviewModel) => (
                <div className="text-sm">{row.service_center?.name}</div>
            ),
        },
        {
            header: "Rating",
            accessorKey: "rating",
            cell: (row: ReviewModel) => (
                <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{row.rating}</span>
                </div>
            ),
        },
        {
            header: "Comment",
            accessorKey: "comment",
            cell: (row: ReviewModel) => (
                <div className="text-sm max-w-[300px] truncate">
                    {row.comment}
                </div>
            ),
        },
        {
            header: "Status",
            accessorKey: "is_active",
            cell: (row: ReviewModel) => (
                <Badge variant={row.is_active ? "default" : "secondary"}>
                    {row.is_active ? 'Active' : 'Inactive'}
                </Badge>
            ),
        },
        {
            header: "Created",
            accessorKey: "created_at",
            cell: (row: ReviewModel) => (
                <div className="text-sm text-gray-500">
                    {new Date(row.created_at).toLocaleDateString()}
                </div>
            ),
        },
    ]

    const filters = [
        {
            label: "Status",
            value: "is_active",
            options: [
                { label: "Active", value: "true" },
                { label: "Inactive", value: "false" }
            ]
        },
        {
            label: "Rating",
            value: "rating",
            options: [
                { label: "5 Stars", value: "5" },
                { label: "4 Stars", value: "4" },
                { label: "3 Stars", value: "3" },
                { label: "2 Stars", value: "2" },
                { label: "1 Star", value: "1" }
            ]
        }
    ]

    return (
        <div className="w-full">
            <DefaultTable
                title="Reviews"
                description="Customer reviews and ratings"
                data={reviews || []}
                columns={columns}
                filters={filters}
                enableFiltering={true}
                enableSearch={true}
                enableSorting={true}
                searchPlaceholder="Search reviews..."
                onSearch={onSearch}
                onFilterChange={onFilterChange}
                enablePagination={true}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={onPageChange}
                isLoading={isLoading}
                clearFilters={clearFilters}
                rowActions={[
                    {
                        label: (
                            <div className="flex items-center gap-2">
                                <Eye className="h-4 w-4" />
                                <span>View Details</span>
                            </div>
                        ),
                        onClick: (row) => {
                            router.push(`/reviews/${row.id}`)
                        }
                    }
                ]}
            />
        </div>
    )
}

export default ReviewTable
