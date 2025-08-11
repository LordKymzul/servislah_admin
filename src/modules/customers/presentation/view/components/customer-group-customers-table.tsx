'use client'

import DefaultTable from "@/src/core/shared/presentation/components/default-table"
import { CustomersModel } from "@/src/modules/customers/data/entities/models/customers-model"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Eye, Plus, Trash } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import AddCustomersCustomerGroupDialog from "@/src/modules/customer_groups/presentation/view/components/add-customers-customer-group-dialog"
import { CustomerGroupModel } from "@/src/modules/customer_groups/data/entities/model/customer-group-model"
import AddCustomerGroupCustomerDialog from "./add-customer-group-customer-dialog"

interface CustomerGroupCustomersTableProps {
    customerGroups: CustomerGroupModel[]
    totalItems: number
    currentPage: number
    itemsPerPage: number
    isLoading: boolean
    onSearch: (term: string) => void
    onFilterChange: (filters: Record<string, string>) => void
    onPageChange: (page: number) => void
    enableHeader?: boolean,
    enableSelection?: boolean,
    selectedRows?: any[],
    onSelectionChange?: (selectedRows: any[]) => void
}


const CustomerGroupCustomersTable = ({
    customerGroups,
    totalItems,
    currentPage,
    itemsPerPage,
    isLoading,
    onSearch,
    onFilterChange,
    onPageChange,
    enableHeader = true,
    enableSelection = false,
    selectedRows,
    onSelectionChange,

}: CustomerGroupCustomersTableProps) => {
    const router = useRouter()
    const [isAddCustomersCustomerGroupDialogOpen, setIsAddCustomersCustomerGroupDialogOpen] = useState(false)
    const columns = [
        {
            header: "Name",
            accessorKey: "name",
            cell: (row: CustomerGroupModel) => (
                <div className="text-sm">{row.name}</div>
            ),
        },

        {
            header: "Customers",
            accessorKey: "customers",
            cell: (row: CustomerGroupModel) => (
                <Badge variant="secondary">
                    {row.customers?.length || 0}
                </Badge>
            ),
        },


    ]

    const filters = [

    ]


    return (

        < div className="w-full" >
            <>
                <DefaultTable
                    enableSelection={enableSelection}
                    selectedRows={selectedRows}
                    onSelectionChange={onSelectionChange}
                    title="Customer Groups"
                    description="Manage customers in this group"
                    data={customerGroups || []}
                    columns={columns}
                    filters={[]}
                    enableFiltering={false}
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
                    headerActions={enableHeader ? [
                        {

                            label: <Button onClick={() => setIsAddCustomersCustomerGroupDialogOpen(true)}>
                                <Plus className="w-4 h-4 mr-2" />
                                Add
                            </Button>,
                            onClick: () => {
                            }
                        }


                    ] : []}
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
                                router.push(`/customers/${row.id}`)
                            }
                        },
                        {
                            label: (
                                <div className="flex items-center gap-2">
                                    <Trash className="h-4 w-4" />
                                    <span>Remove</span>
                                </div>
                            ),
                            onClick: (row) => {
                                router.push(`/customers/${row.id}`)
                            }
                        }
                    ]}
                />
                <AddCustomerGroupCustomerDialog
                    isOpen={isAddCustomersCustomerGroupDialogOpen}
                    onClose={() => setIsAddCustomersCustomerGroupDialogOpen(false)}
                />
            </>
        </div >
    )
}

export default CustomerGroupCustomersTable;