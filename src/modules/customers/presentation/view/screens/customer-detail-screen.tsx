'use client'

import LoadingScreen from "@/src/core/shared/presentation/screens/loading-screen"
import { useGetCustomerById } from "../../tanstack/customer-tanstack"
import InfoScreen from "@/src/core/shared/presentation/screens/info-screen"
import { InfoScreenType } from "@/src/core/shared/presentation/screens/info-screen"
import DefaultCard from "@/src/core/shared/presentation/components/default-card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Edit, Trash, Users, Car } from "lucide-react"
import { useState } from "react"
import EditCustomerSheet from "../components/edit-customer-sheet"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/src/core/util/helper"
import CustomerGroupTable from "@/src/modules/customer_groups/presentation/view/components/customer-group-table"
import AppointmentTable from "@/src/modules/appointments/presentation/view/components/appointment-table"
import CustomerGroupCustomersTable from "../components/customer-group-customers-table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CustomerTable from "../components/customer-table"
import DataCard from "@/src/core/shared/presentation/components/data-card"
import ReviewTable from "@/src/modules/reviews/presentation/view/components/review-table"
import { useGetReviews } from "@/src/modules/reviews/presentation/tanstack/review-tanstack"
import { useQueryAppointments } from "@/src/modules/appointments/presentation/tanstack/appointment-tanstack"
import { useGetCustomerGroups } from "@/src/modules/customer_groups/presentation/tanstack/customer-group-tanstack"
import VehiclesTable from "@/src/modules/vehicles/presentation/view/components/vehicles-table"

const CustomerDetailScreen = ({ customerId }: { customerId: string }) => {
    const { data: customer, isLoading, isError, error } = useGetCustomerById(customerId)
    const [isEditSheetOpen, setIsEditSheetOpen] = useState(false)
    const [activeTab, setActiveTab] = useState("appointments")

    // Review states
    const [reviewPage, setReviewPage] = useState(1)
    const [reviewSearch, setReviewSearch] = useState("")
    const [reviewFilters, setReviewFilters] = useState<Record<string, string>>({})

    // Appointment states
    const [appointmentPage, setAppointmentPage] = useState(1)
    const [appointmentSearch, setAppointmentSearch] = useState("")
    const [appointmentFilters, setAppointmentFilters] = useState<Record<string, string>>({})

    // Customer group states
    const [customerGroupPage, setCustomerGroupPage] = useState(1)
    const [customerGroupSearch, setCustomerGroupSearch] = useState("")
    const [customerGroupFilters, setCustomerGroupFilters] = useState<Record<string, string>>({})

    const {
        data: reviews,
        isLoading: isReviewsLoading
    } = useGetReviews({
        customer_id: customerId,
        page: reviewPage,
        limit: 10,
        ...reviewFilters
    })

    const {
        data: appointments,
        isLoading: isAppointmentsLoading
    } = useQueryAppointments({
        customer_id: customerId,
        page: appointmentPage,
        limit: 10,
        ...appointmentFilters
    })

    const {
        data: customerGroups,
        isLoading: isCustomerGroupsLoading
    } = useGetCustomerGroups({
        customer_id: customerId,
        page: customerGroupPage,
        limit: 10,
        ...customerGroupFilters
    })

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
        <>
            <div className="flex flex-col gap-4 items-start w-full p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                    <DataCard
                        title="Total Appointments"
                        value={appointments?.metadata?.total.toString() || "0"}
                        icon={<Users className="w-4 h-4" />}
                        description="Total number of appointments"
                    />
                    <DataCard
                        title="Total Customer Groups"
                        value={customerGroups?.metadata?.total.toString() || "0"}
                        icon={<Users className="w-4 h-4" />}
                        description="Total number of customer groups"
                    />
                    <DataCard
                        title="Total Reviews"
                        value={reviews?.metadata?.total.toString() || "0"}
                        icon={<Users className="w-4 h-4" />}
                        description="Total number of reviews"
                    />
                    <DataCard
                        title="Total Vehicles"
                        value={"0"}
                        icon={<Car className="w-4 h-4" />}
                        description="Total number of vehicles"
                    />
                </div>

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

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList>
                        <TabsTrigger value="appointments">Appointments</TabsTrigger>
                        <TabsTrigger value="customer_groups">Customer Groups</TabsTrigger>
                        <TabsTrigger value="reviews">Reviews</TabsTrigger>
                        <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
                    </TabsList>

                    <TabsContent value="appointments">
                        <div className="w-full">
                            <AppointmentTable
                                enableHeader={false}
                                isLoading={isAppointmentsLoading}
                                appointments={appointments?.appointments || []}
                                totalItems={appointments?.metadata?.total || 0}
                                currentPage={appointmentPage}
                                itemsPerPage={10}
                                onSearch={setAppointmentSearch}
                                onFilterChange={setAppointmentFilters}
                                onPageChange={setAppointmentPage}
                            />
                        </div>
                    </TabsContent>
                    <TabsContent value="customer_groups">
                        <div className="w-full">
                            <CustomerGroupCustomersTable
                                enableHeader={false}
                                isLoading={isCustomerGroupsLoading}
                                customerGroups={customerGroups?.customer_groups || []}
                                totalItems={customerGroups?.metadata?.total || 0}
                                currentPage={customerGroupPage}
                                itemsPerPage={10}
                                onSearch={setCustomerGroupSearch}
                                onFilterChange={setCustomerGroupFilters}
                                onPageChange={setCustomerGroupPage}
                            />
                        </div>
                    </TabsContent>
                    <TabsContent value="reviews">
                        <div>
                            <ReviewTable
                                clearFilters={() => {
                                    setReviewFilters({

                                    })
                                    setReviewPage(1)
                                }}
                                isLoading={isReviewsLoading}
                                reviews={reviews?.reviews || []}
                                totalItems={reviews?.metadata?.total || 0}
                                currentPage={reviewPage}
                                itemsPerPage={10}
                                onSearch={setReviewSearch}
                                onFilterChange={setReviewFilters}
                                onPageChange={setReviewPage}
                            />
                        </div>
                    </TabsContent>
                    <TabsContent value="vehicles">
                        <VehiclesTable

                        />
                    </TabsContent>
                </Tabs>
            </div>

            {isEditSheetOpen && (
                <EditCustomerSheet
                    customer={customer}
                    open={isEditSheetOpen}
                    onOpenChange={setIsEditSheetOpen}
                />
            )}
        </>
    )
}

export default CustomerDetailScreen