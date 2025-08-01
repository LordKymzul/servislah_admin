'use client'

import LoadingScreen from "@/src/core/shared/presentation/screens/loading-screen"
import { useGetCustomerById } from "../../tanstack/customer-tanstack"
import InfoScreen from "@/src/core/shared/presentation/screens/info-screen"
import { InfoScreenType } from "@/src/core/shared/presentation/screens/info-screen"
import DefaultCard from "@/src/core/shared/presentation/components/default-card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Edit, Trash } from "lucide-react"
import { useState } from "react"
import EditCustomerSheet from "../components/edit-customer-sheet"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/src/core/util/helper"
import CustomerGroupTable from "@/src/modules/customer_groups/presentation/view/components/customer-group-table"
import AppointmentTable from "@/src/modules/appointments/presentation/view/components/appointment-table"


const CustomerDetailScreen = ({ customerId }: { customerId: string }) => {
    const { data: customer, isLoading, isError, error } = useGetCustomerById(customerId)
    const [isEditSheetOpen, setIsEditSheetOpen] = useState(false)
    if (isLoading) {
        return <LoadingScreen />
    }
    if (isError) {
        return <InfoScreen
            title="Error"
            description={error.message}
            type={InfoScreenType.ERROR}
        />
    }
    return (
        <div className="flex flex-col gap-4 items-start w-full p-6">
            <div className="w-full">
                <DefaultCard>
                    <div className="divide-y">
                        <div className="flex items-center justify-between p-4">
                            <h2 className="md:text-lg text-base font-semibold">{customer?.user?.email || 'N/A'}</h2>
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
                            <div className="text-sm">Name</div>
                            <div className="text-sm text-right">{customer?.user?.name || 'N/A'}</div>
                        </div>
                        <div className="flex items-center justify-between p-4">
                            <div className="text-sm">Status</div>
                            <div className="text-sm text-right">
                                <Badge variant="secondary">{customer?.user?.status || 'N/A'}</Badge>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-4">
                            <div className="text-sm">Phone</div>
                            <div className="text-sm text-right">{customer?.user?.phone || 'N/A'}</div>
                        </div>
                        <div className="flex items-center justify-between p-4">
                            <div className="text-sm">Joined</div>
                            <div className="text-sm text-right">{formatDate(customer?.user?.created_at) || 'N/A'}</div>
                        </div>
                    </div>
                </DefaultCard>
            </div>

            {
                isEditSheetOpen && (
                    <EditCustomerSheet
                        customer={customer}
                        open={isEditSheetOpen}
                        onOpenChange={setIsEditSheetOpen}
                    />
                )
            }

            <div className="w-full">
                <CustomerGroupTable
                    totalItems={customer?.customer_groups?.length || 0}
                    currentPage={1}
                    itemsPerPage={10}
                    onSearch={() => { }}
                    onFilterChange={() => { }}
                    onPageChange={() => { }}
                    customerGroups={customer?.customer_groups || []} />
            </div>

            <div className="w-full">
                <AppointmentTable
                    appointments={customer?.appointments || []}
                    totalItems={customer?.appointments?.length || 0}
                    currentPage={1}
                    itemsPerPage={10}
                    onSearch={() => { }}
                    onFilterChange={() => { }}
                    onPageChange={() => { }}
                />
            </div>



        </div>
    )
}

export default CustomerDetailScreen