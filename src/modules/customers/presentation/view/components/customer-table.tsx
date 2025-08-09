'use client'

import DefaultTable from "@/src/core/shared/presentation/components/default-table"
import { CustomersModel } from "@/src/modules/customers/data/entities/models/customers-model"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Eye, Plus, Trash } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import AddCustomersCustomerGroupDialog from "@/src/modules/customer_groups/presentation/view/components/add-customers-customer-group-dialog"
import DefaultAlertDialog from "@/src/core/shared/presentation/components/default-alert-dialog"

interface CustomerTableProps {
    customers: CustomersModel[]
    totalItems: number
    currentPage: number
    itemsPerPage: number
    isLoading: boolean
    onSearch: (term: string) => void
    onFilterChange: (filters: Record<string, string>) => void
    onPageChange: (page: number) => void

}


const CustomerTable = ({
    customers,
    totalItems,
    currentPage,
    itemsPerPage,
    isLoading,
    onSearch,
    onFilterChange,
    onPageChange,


}: CustomerTableProps) => {
    const router = useRouter()
    const [isAddCustomersCustomerGroupDialogOpen, setIsAddCustomersCustomerGroupDialogOpen] = useState(false)

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [selectedCustomer, setSelectedCustomer] = useState<CustomersModel | null>(null)


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
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" }
            ]
        }
    ]


    return (

        < div className="w-full" >
            <>
                <DefaultTable

                    title="Customers"
                    description="Manage customers in this group"
                    data={customers || []}
                    columns={columns}
                    filters={filters}
                    enableFiltering={true}
                    enableSearch={true}
                    enableSorting={true}
                    searchPlaceholder="Search customers..."
                    onSearch={onSearch}
                    onFilterChange={onFilterChange}
                    enablePagination={true}
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    onPageChange={onPageChange}
                    isLoading={isLoading}
                    headerActions={[
                        {
                            label: <Button onClick={() => setIsAddCustomersCustomerGroupDialogOpen(true)}>
                                <Plus className="w-4 h-4 mr-2" />
                                Add
                            </Button>,
                            onClick: () => {
                            }
                        }
                    ]}
                    rowActions={[

                        {
                            label: (
                                <div className="flex items-center gap-2">
                                    <Eye className="h-4 w-4" />
                                    <span>View Details</span>
                                </div>
                            ),
                            onClick: (row) => {
                                router.push(`/customers/${row.id}`)
                            }
                        },
                        {
                            label: (
                                <div className="flex items-center gap-2">
                                    <Trash className="h-4 w-4" />
                                    <span>Delete</span>
                                </div>
                            ),
                            onClick: (row) => {
                                setSelectedCustomer(row)
                                setIsDeleteDialogOpen(true)
                            }
                        }

                    ]}
                />
                <AddCustomersCustomerGroupDialog
                    isOpen={isAddCustomersCustomerGroupDialogOpen}
                    onClose={() => setIsAddCustomersCustomerGroupDialogOpen(false)}
                />
                <DefaultAlertDialog
                    onOpenChange={setIsDeleteDialogOpen}
                    open={isDeleteDialogOpen}
                    title="Delete Customer"
                    description="Are you sure you want to delete this customer?"

                    onConfirm={() => {

                    }}
                />
            </>
        </div >
    )
}

export default CustomerTable