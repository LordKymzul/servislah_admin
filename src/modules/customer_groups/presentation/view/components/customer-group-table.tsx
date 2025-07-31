'use client'

import { useState } from "react"
import DefaultTable from "@/src/core/shared/presentation/components/default-table"
import { useGetCustomerGroups } from "../../tanstack/customer-group-tanstack"
import { QueryCustomerGroupDto } from "../../../data/entities/dto/query-customer-group.dto"
import { Badge } from "@/components/ui/badge"
import { Edit, Eye, FileDown, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { CustomerGroupModel } from "../../../data/entities/model/customer-group-model"
import { Button } from "@/components/ui/button"

const CustomerGroupTable = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState("")
    const itemsPerPage = 10

    const [queryParams, setQueryParams] = useState<QueryCustomerGroupDto>({
        page: currentPage,
        limit: itemsPerPage
    })

    const { data: customerGroupsData, isLoading } = useGetCustomerGroups(queryParams)
    const router = useRouter()

    const columns = [
        {
            header: "Name",
            accessorKey: "name",
            cell: (row: CustomerGroupModel) => (
                <div className="font-medium">{row.name}</div>
            ),
        },
        {
            header: "Description",
            accessorKey: "description",
            cell: (row: CustomerGroupModel) => (
                <div className="text-sm text-muted-foreground">{row.description}</div>
            ),
        },
        {
            header: "Status",
            accessorKey: "is_active",
            cell: (row: CustomerGroupModel) => (
                <Badge variant={row.is_active ? "default" : "destructive"}>
                    {row.is_active ? "Active" : "Inactive"}
                </Badge>
            ),
        },
        {
            header: "Customers",
            accessorKey: "customers",
            cell: (row: CustomerGroupModel) => (
                <Badge variant="secondary">
                    {row.customers?.length || 0} customers
                </Badge>
            ),
        },
        {
            header: "Created At",
            accessorKey: "created_at",
            cell: (row: CustomerGroupModel) => (
                <div className="text-sm">
                    {row.created_at ? new Date(row.created_at).toLocaleDateString() : "N/A"}
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
        const newQueryParams: QueryCustomerGroupDto = {
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

    const handleViewCustomerGroup = (customerGroupId: string) => {
        router.push(`/customer-groups/${customerGroupId}`)
    }



    return (
        <DefaultTable
            title="Customer Groups"
            description="Manage customer groups in the system"
            data={customerGroupsData?.customer_groups || []}
            columns={columns}
            filters={filters}
            enableFiltering={true}
            enableSearch={true}
            enableSorting={true}
            searchPlaceholder="Search customer groups..."
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            enablePagination={true}
            totalItems={customerGroupsData?.metadata?.total || 0}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            headerActions={[
                {
                    label: <Button variant="outline" size="sm">
                        <FileDown className="w-4 h-4 mr-1" />
                        Export
                    </Button>,
                    onClick: () => {
                        console.log("Export")
                    }
                },
                {
                    label: <Button variant="outline" size="sm">
                        <Plus className="w-4 h-4 mr-1" />
                        Create
                    </Button>,
                    onClick: () => {
                        console.log("Add Customer Group")
                    }
                }
            ]}
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
                        handleViewCustomerGroup(row.id || "")
                    }
                }
            ]}
        />
    )
}

export default CustomerGroupTable