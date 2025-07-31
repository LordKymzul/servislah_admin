'use client'

import { Card } from "@/components/ui/card"
import { useGetCustomerGroupById } from "../../tanstack/customer-group-tanstack"
import { Edit, MoreHorizontal, Plus, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import DefaultTable from "@/src/core/shared/presentation/components/default-table"
import { useState } from "react"
import { CustomersModel } from "@/src/modules/customers/data/entities/models/customers-model"
import DefaultCard from "@/src/core/shared/presentation/components/default-card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import CustomerGroupEditSheet from "../components/customer-group-edit-sheet"
import InfoScreen, { InfoScreenType } from "@/src/core/shared/presentation/screens/info-screen"
import LoadingScreen from "@/src/core/shared/presentation/screens/loading-screen"

const CustomerGroupDetailScreen = ({ customerGroupId }: { customerGroupId: string }) => {
    const { data: customerGroup, isLoading, isError, error } = useGetCustomerGroupById(customerGroupId)
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10
    const [isEditSheetOpen, setIsEditSheetOpen] = useState(false)

    const columns = [
        {
            header: "Email",
            accessorKey: "user.email",
            cell: (row: CustomersModel) => (
                <div className="text-sm">{row.user?.email}</div>
            ),
        },

        {
            header: "Status",
            accessorKey: "user.status",
            cell: (row: CustomersModel) => (
                <Badge variant="secondary">
                    {row.user?.status || 'Registered'}
                </Badge>
            ),
        },
        {
            header: "Created",
            accessorKey: "user.created_at",
            cell: (row: CustomersModel) => (
                <div className="text-sm text-gray-500">
                    {row.user?.created_at ? new Date(row.user?.created_at).toLocaleDateString() : 'N/A'}
                </div>
            ),
        },
    ]

    const filters = [
        {
            label: "Status",
            value: "status",
            options: [
                { label: "Registered", value: "registered" },
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" }
            ]
        }
    ]

    const handleSearch = (term: string) => {
        console.log("Search:", term)
    }

    const handleFilterChange = (filters: Record<string, string>) => {
        console.log("Filters:", filters)
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
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

    if (isLoading) {
        return (
            <LoadingScreen />
        )
    }


    return (
        <div className="flex flex-col gap-4 items-start w-full p-6">
            {/* Group Name Card */}
            <div className="w-full">
                <DefaultCard>
                    <div className="divide-y">
                        <div className="flex items-center justify-between p-4">
                            <h2 className="md:text-lg text-base font-semibold">{customerGroup?.name || 'N/A'}</h2>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem onClick={() => setIsEditSheetOpen(true)}>
                                        <Edit className="w-4 h-4 mr-2" />
                                        Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Trash className="w-4 h-4 mr-2" />
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <div className="flex items-center justify-between p-4">
                            <div className="text-sm">Customers</div>
                            <div className="text-sm text-right">{customerGroup?.customers?.length || 0}</div>
                        </div>
                    </div>
                </DefaultCard>
            </div>

            {/* Edit Sheet */}
            {
                isEditSheetOpen && (
                    <CustomerGroupEditSheet
                        customerGroup={customerGroup}
                        open={isEditSheetOpen}
                        onOpenChange={setIsEditSheetOpen}
                    />
                )
            }

            {/* Customers Table */}
            <div className="w-full">
                <DefaultTable
                    title="Customers"
                    description="Manage customers in this group"
                    data={customerGroup?.customers || []}
                    columns={columns}
                    filters={filters}
                    enableFiltering={true}
                    enableSearch={true}
                    enableSorting={true}
                    searchPlaceholder="Search customers..."
                    onSearch={handleSearch}
                    onFilterChange={handleFilterChange}
                    enablePagination={true}
                    totalItems={customerGroup?.customers?.length || 0}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                    headerActions={[
                        {
                            label: <Button>
                                <Plus className="w-4 h-4 mr-2" />
                                Add
                            </Button>,
                            onClick: () => {
                                console.log("Add customer")
                            }
                        }
                    ]}
                />
            </div>
        </div>
    )
}

export default CustomerGroupDetailScreen