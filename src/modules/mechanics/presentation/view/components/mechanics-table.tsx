'use client'

import { useState } from "react"
import DefaultTable from "@/src/core/shared/presentation/components/default-table"
import { useQueryMechanics } from "../../tanstack/mechanic-tanstack"
import { QueryMechanicDto } from "../../../data/entities/dto/query-mechanic.dto"
import { Badge } from "@/components/ui/badge"
import { Edit, Eye, FileDown, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

const MechanicsTable = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState("")
    const itemsPerPage = 10

    const [queryParams, setQueryParams] = useState<QueryMechanicDto>({
        page: currentPage,
        limit: itemsPerPage
    })

    const { data: mechanicsData, isLoading } = useQueryMechanics(queryParams)
    const router = useRouter()

    const columns = [
        {
            header: "Name",
            accessorKey: "name",
            cell: (row: any) => (

                <div>

                    <div className="font-medium">{row.user?.name || "N/A"}</div>
                    <div className="text-sm text-muted-foreground">{row.user?.email || "N/A"}</div>
                </div>
            )
        },
        {
            header: "Experience Level",
            accessorKey: "experience_level",
            cell: (row: any) => (

                <Badge variant={
                    row.experience_level === "EXPERT" ? "default" :
                        row.experience_level === "INTERMEDIATE" ? "secondary" : "outline"
                }>
                    {row.experience_level.charAt(0) + row.experience_level.slice(1).toLowerCase()}
                </Badge>
            ),
        },
        {
            header: "Years of Experience",
            accessorKey: "years_of_exp",
            cell: (row: any) => (
                <span>{row.years_of_exp} {row.years_of_exp === 1 ? 'year' : 'years'}</span>
            ),
        },
        {
            header: "Status",
            accessorKey: "is_active",
            cell: (row: any) => (
                <Badge variant={row.is_active ? "default" : "destructive"}>
                    {row.is_active ? "Active" : "Inactive"}
                </Badge>
            ),
        },
    ]

    const filters = [
        {
            label: "Experience Level",
            value: "experience_level",
            options: [
                { label: "Beginner", value: "BEGINNER" },
                { label: "Intermediate", value: "INTERMEDIATE" },
                { label: "Expert", value: "EXPERT" }
            ]
        },
        {
            label: "Status",
            value: "is_active",
            options: [
                { label: "Active", value: "true" },
                { label: "Inactive", value: "false" }
            ]
        },
        {
            label: "Years of Experience",
            value: "years_of_exp",
            options: [
                { label: "1+ years", value: "1" },
                { label: "2+ years", value: "2" },
                { label: "3+ years", value: "3" },
                { label: "5+ years", value: "5" },
                { label: "10+ years", value: "10" }
            ]
        }
    ]

    const handleSearch = (term: string) => {
        setSearchTerm(term)
        setQueryParams(prev => ({
            ...prev,
            search: term
        }))
    }

    const handleFilterChange = (filters: Record<string, string>) => {
        const newQueryParams: QueryMechanicDto = {
            page: currentPage,
            limit: itemsPerPage
        }

        // Convert string values to appropriate types based on QueryMechanicDto
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

    const handleViewMechanic = (mechanicId: string) => {
        router.push(`/mechanics/${mechanicId}`)
    }

    return (
        <DefaultTable
            title="Mechanics"
            description="Manage your mechanics and their assignments"
            data={mechanicsData?.mechanics || []}
            headerActions={[
                {
                    label: <Button variant="outline" size="sm">
                        <FileDown className="w-4 h-4 mr-1" />
                        Export
                    </Button>,
                    onClick: () => {
                        console.log("Add New")
                    }
                },
                {
                    label: <Button variant="outline" size="sm">
                        <Plus className="w-4 h-4 mr-1" />
                        Add New
                    </Button>,
                    onClick: () => {
                        console.log("Add New")
                    }
                }
            ]}
            columns={columns}
            filters={filters}
            enableFiltering={true}
            enableSearch={true}
            enableSorting={true}
            searchPlaceholder="Search mechanics..."
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            enablePagination={true}
            totalItems={mechanicsData?.metadata?.total || 0}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            rowActions={[
                {
                    label: (
                        <div className="flex items-center gap-2">
                            <Edit className="h-4 w-4" />
                            <span>Edit</span>
                        </div>
                    ),
                    onClick: (row) => {
                        console.log("Edit:", row)
                        // Implement edit action
                    }
                },
                {
                    label: (
                        <div className="flex items-center gap-2">
                            <Eye className="h-4 w-4" />
                            <span>View Details</span>
                        </div>
                    ),
                    onClick: (row) => {
                        handleViewMechanic(row.id)
                    }
                }
            ]}
        />
    )
}

export default MechanicsTable