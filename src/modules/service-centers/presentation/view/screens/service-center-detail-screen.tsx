"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Building2,
    Phone,
    Mail,
    MapPin,
    Users,
    Wrench,
    Search,
    Plus,
    Clock,
    Star,
    ChevronRight,
    TrendingUp,
    CheckCircle,
    XCircle,
    AlertCircle,
    MoreHorizontal,
    Edit,
    Trash2,
    ArrowUpRight,
    Rocket,
    Trash,
    CalendarIcon,
    Calendar
} from "lucide-react"
import { useQueryServiceCenterById, useQueryServiceCenters } from "../../tanstack/service-center-tanstack"
import { ServiceCenterModel, ServiceCenterService, SpecializationModel } from "@/src/modules/service-centers/data/entities/model/service-center-model"
import { useState } from "react"
import DataCard from "@/src/core/shared/presentation/components/data-card"
import DefaultCard from "@/src/core/shared/presentation/components/default-card"
import { AppointmentModel } from "@/src/modules/appointments/data/entities/model/appointment-model"
import LoadingScreen from "@/src/core/shared/presentation/screens/loading-screen"
import { InfoScreenType } from "@/src/core/shared/presentation/screens/info-screen"
import InfoScreen from "@/src/core/shared/presentation/screens/info-screen"
import EditServiceCenterSheet from "../components/edit-service-center-sheet"
import EditServiceCenterLocationSheet from "../components/edit-service-center-location-sheet"
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import ServiceCenterOverviewChart from "../components/service-center-overview-chart"
import ServiceCenterDetailSalesChart from "../components/service-center-detail-sales-chart"
import { addDays, formatDate } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { DateRange } from "react-day-picker"
import { Calendar as CalendarShadcn } from "@/components/ui/calendar"
import { Tabs, TabsTrigger, TabsList, TabsContent } from "@/components/ui/tabs"
import DefaultTable from "@/src/core/shared/presentation/components/default-table"
import AppointmentTable from "@/src/modules/appointments/presentation/view/components/appointment-table"
import ServicesDataTable from "@/src/modules/services/presentation/view/components/services-data-table"
import ServiceTable from "@/src/modules/services/presentation/view/components/service-table"
import { useQueryServices } from "@/src/modules/services/presentation/tanstack/service-tanstack"
import ServiceBayTable from "@/src/modules/service-bays/presentation/view/components/service-bay-table"
import { useQueryServiceBays } from "@/src/modules/service-bays/presentation/tanstack/service-bay-tanstack"
import SpecializationTable from "@/src/modules/specialization/presentation/view/components/specialization-table"
import { useQuerySpecializations } from "@/src/modules/specialization/presentation/tanstack/specialization-tanstack"
import { useQueryMe } from "@/src/modules/users/presentation/tanstack/user-tanstack"
import { useQueryMechanics } from "@/src/modules/mechanics/presentation/tanstack/mechanic-tanstack"
import MechanicsTable from "@/src/modules/mechanics/presentation/view/components/mechanics-table"
import CustomerTable from "@/src/modules/customers/presentation/view/components/customer-table"
import ReviewTable from "@/src/modules/reviews/presentation/view/components/review-table"
import { useGetReviews } from "@/src/modules/reviews/presentation/tanstack/review-tanstack"

const ServiceCenterDetailScreen = ({ service_center_id }: { service_center_id: string }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [openEditServiceCenterLocationSheet, setOpenEditServiceCenterLocationSheet] = useState(false)
    const [openEditServiceCenterSheet, setOpenEditServiceCenterSheet] = useState(false)
    const [calendarOpen, setCalendarOpen] = React.useState(false)
    const [activeTab, setActiveTab] = React.useState("overview")

    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(),
        to: addDays(new Date(), 7),
    })

    const {
        data: serviceCenter,
        isLoading: isServiceCenterLoading,
        isError: isServiceCenterError,
        error: serviceCenterError
    } = useQueryServiceCenterById({ service_center_id });


    const {
        data: services,
        isLoading: isServicesLoading,
        isError: isServicesError,
        error: servicesError
    } = useQueryServices({
        service_center_id: service_center_id,
        page: 1,
        limit: 100
    })

    const {
        data: serviceBays,
        isLoading: isServiceBaysLoading,
        isError: isServiceBaysError,
        error: serviceBaysError
    } = useQueryServiceBays({
        service_center_id: service_center_id,
        page: 1,
        limit: 100
    })

    const {
        data: specializations,
        isLoading: isSpecializationsLoading,
        isError: isSpecializationsError,
        error: specializationsError
    } = useQuerySpecializations({
        service_center_id: service_center_id,
        page: 1,
        limit: 100
    })

    const {
        data: mechanics,
        isLoading: isMechanicsLoading,
        isError: isMechanicsError,
        error: mechanicsError
    } = useQueryMechanics({
        service_center_id: service_center_id,
        page: 1,
        limit: 100
    })

    const {
        data: reviews,
        isLoading: isReviewsLoading,
        isError: isReviewsError,
        error: reviewsError
    } = useGetReviews({
        service_center_id: service_center_id,
        page: 1,
        limit: 100
    })


    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-MY', {
            style: 'currency',
            currency: 'MYR'
        }).format(amount);
    };

    const formatDuration = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        if (hours > 0) {
            return `${hours}h ${mins}m`;
        }
        return `${mins}m`;
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'COMPLETED':
                return 'bg-green-50 text-green-700 border-green-200';
            case 'IN_PROGRESS':
                return 'bg-blue-50 text-blue-700 border-blue-200';
            case 'PENDING':
                return 'bg-amber-50 text-amber-700 border-amber-200';
            default:
                return 'bg-gray-50 text-gray-700 border-gray-200';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'COMPLETED':
                return <CheckCircle className="h-3 w-3" />;
            case 'IN_PROGRESS':
                return <Clock className="h-3 w-3" />;
            case 'PENDING':
                return <AlertCircle className="h-3 w-3" />;
            default:
                return <XCircle className="h-3 w-3" />;
        }
    };

    if (isServiceCenterLoading) {
        return <LoadingScreen />
    }

    if (isServiceCenterError || !serviceCenter) {
        return <InfoScreen type={InfoScreenType.ERROR} title="Error" description={serviceCenterError?.message || "Failed to load service center"} />
    }

    const serviceCenterData = serviceCenter;


    // Calculate stats
    const totalAppointments = serviceCenterData.appointments?.length || 0;
    const completedAppointments = serviceCenterData.appointments?.filter((apt: any) => apt.status === 'COMPLETED').length || 0;
    const pendingAppointments = serviceCenterData.appointments?.filter((apt: any) => apt.status === 'PENDING').length || 0;
    const totalServices = serviceCenterData.services?.length || 0;
    const totalSpecializations = serviceCenterData.specializations?.length || 0;
    const totalMechanics = serviceCenterData.mechanics?.length || 0;

    return (

        <>


            <div className="flex flex-col items-start p-4 gap-4 w-full">
                <div className="flex flex-col md:flex-row gap-4 item-start md:items-center justify-between w-full">
                    <div className="flex flex-col items-start">
                        <h1 className="text-2xl font-bold">{serviceCenterData.name}</h1>
                        <p className="text-sm text-muted-foreground font-light">Service Center Information</p>
                    </div>

                    <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                onClick={() => setCalendarOpen(true)}
                                variant="outline" className="w-[280px] justify-start text-left font-normal">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date?.from ? (
                                    date.to ? (
                                        <>
                                            {formatDate(date.from, "LLL dd, y")} -{" "}
                                            {formatDate(date.to, "LLL dd, y")}
                                        </>
                                    ) : (
                                        formatDate(date.from, "LLL dd, y")
                                    )
                                ) : (
                                    <span>Pick a date range</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <CalendarShadcn

                                mode="range"
                                defaultMonth={date?.from}
                                selected={date}
                                onSelect={setDate}
                                numberOfMonths={2}
                                className="rounded-md border shadow"
                            />
                        </PopoverContent>
                    </Popover>
                </div>


                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
                    <DataCard
                        title="Total Appointments"
                        value={totalAppointments}
                        description="Total appointments"
                        icon={<Calendar className="w-4 h-4" />} />
                    <DataCard
                        title="Total Mechanics"
                        value={"10"}
                        description="Total mechanics working in the service center"
                        icon={<CheckCircle className="w-4 h-4" />} />
                    <DataCard
                        title="Total Services"
                        value={pendingAppointments}
                        description="Total services offered"
                        icon={<AlertCircle className="w-4 h-4" />} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
                    <div className="w-full lg:col-span-2">
                        <ServiceCenterOverviewChart />
                    </div>
                    <div className="w-full lg:col-span-1">
                        <ServiceCenterDetailSalesChart />
                    </div>
                </div>


                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="appointments">Appointments</TabsTrigger>
                        <TabsTrigger value="services">Services</TabsTrigger>
                        <TabsTrigger value="services_bay">Service Bays</TabsTrigger>
                        <TabsTrigger value="specializations">Specializations</TabsTrigger>
                        <TabsTrigger value="mechanics">Mechanics</TabsTrigger>
                        <TabsTrigger value="customers">Customers</TabsTrigger>
                        <TabsTrigger value="reviews">Reviews</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview">
                        <div className="flex flex-col gap-4 mt-4">
                            <DefaultCard>

                                <div className="p-4 md:p-6 border-b flex flex-row items-center justify-between">
                                    <div className="flex flex-col items-start gap-1">
                                        <h2 className="text-lg md:text-xl font-semibold">Service Center</h2>
                                        <p className="text-xs md:text-sm text-muted-foreground">Manage your service center's details</p>
                                    </div>

                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem onClick={() => setOpenEditServiceCenterSheet(true)}>
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

                                <div className="divide-y">
                                    <div className="flex items-center justify-between p-6">
                                        <div className="text-sm">Service Center ID</div>
                                        <div className="text-sm">
                                            <Badge variant="secondary">{serviceCenterData?.id || 'N/A'}</Badge>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between p-6">
                                        <div className="text-sm">Name</div>
                                        <div className="text-sm text-right">{serviceCenterData.name || 'N/A'}</div>
                                    </div>

                                    <div className="flex items-center justify-between p-6">
                                        <div className="text-sm">Phone</div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium">{serviceCenterData.phone || 'N/A'}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between p-6">
                                        <div className="text-sm">Email</div>
                                        <div className="text-sm">
                                            <Badge variant="secondary">{serviceCenterData.email || 'N/A'}</Badge>
                                        </div>
                                    </div>
                                </div>

                            </DefaultCard>


                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">

                                <DefaultCard>
                                    <div className="p-6 border-b flex flex-row items-center justify-between">
                                        <h2 className="text-xl font-semibold">Location</h2>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem onClick={() => setOpenEditServiceCenterLocationSheet(true)}>
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
                                    <div className="divide-y">

                                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 md:p-6">
                                            <div className="text-sm mb-2 md:mb-0">Address</div>
                                            <div className="text-sm">
                                                <Badge variant="secondary" className="break-all">{serviceCenterData?.locations?.address || 'N/A'}</Badge>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between p-6">
                                            <div className="text-sm">City</div>
                                            <div className="text-sm text-right">{serviceCenterData.locations?.city || 'N/A'}</div>
                                        </div>

                                        <div className="flex items-center justify-between p-6">
                                            <div className="text-sm">State</div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium">{serviceCenterData.locations?.state || 'N/A'}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between p-6">
                                            <div className="text-sm">Country</div>
                                            <div className="text-sm">
                                                <Badge variant="secondary">{serviceCenterData.locations?.country || 'N/A'}</Badge>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between p-6">
                                            <div className="text-sm">Zip Code</div>
                                            <div className="text-sm">
                                                <Badge variant="secondary">{serviceCenterData.locations?.zip_code || 'N/A'}</Badge>
                                            </div>
                                        </div>
                                    </div>

                                </DefaultCard>

                                <DefaultCard>
                                    <div className="p-4 md:p-6 border-b flex flex-row items-center justify-between">
                                        <div>
                                            <h2 className="text-lg md:text-xl font-semibold">Media</h2>
                                        </div>
                                        <div className="flex flex-row items-center gap-2">
                                            <Button variant="ghost" size="icon">
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="divide-y">
                                        <div className="flex items-center justify-between p-6">
                                            <img
                                                src={serviceCenterData.image}
                                                alt={serviceCenterData.name}
                                                className="w-full h-full object-cover rounded-lg" />
                                        </div>

                                    </div>
                                </DefaultCard>


                            </div>



                        </div>
                    </TabsContent>

                    <TabsContent value="appointments">
                        <div className="w-full mt-4">
                            <AppointmentTable
                                enableHeader={true}
                                appointments={[]}
                                totalItems={0}
                                currentPage={1}
                                itemsPerPage={10}
                                onSearch={() => { }}
                                onFilterChange={() => { }}
                                isLoading={false}
                                onPageChange={() => { }}
                            />
                        </div>
                    </TabsContent>

                    <TabsContent value="services">
                        <div className="w-full mt-4">
                            <ServiceTable
                                services={services}
                                totalItems={0}
                                currentPage={1}
                                itemsPerPage={10}
                                onSearch={() => { }}
                                onFilterChange={() => { }}
                                onPageChange={() => { }}
                                isLoading={false}
                                enableHeader={true}
                                clearFilters={() => { }}
                            />
                        </div>
                    </TabsContent>

                    <TabsContent value="services_bay">
                        <div className="w-full mt-4">
                            <ServiceBayTable
                                serviceBays={serviceBays}
                                totalItems={0}
                                currentPage={1}
                                itemsPerPage={10}
                                onSearch={() => { }}
                                onFilterChange={() => { }}
                                onPageChange={() => { }}
                                isLoading={false}
                                enableHeader={true}
                                clearFilters={() => { }}
                            />
                        </div>
                    </TabsContent>

                    <TabsContent value="specializations">
                        <div className="w-full mt-4">
                            <SpecializationTable
                                specializations={specializations}
                                totalItems={0}
                                currentPage={1}
                                itemsPerPage={10}
                                onSearch={() => { }}
                                onFilterChange={() => { }}
                                onPageChange={() => { }}
                                isLoading={false}
                                clearFilters={() => { }}
                            />
                        </div>
                    </TabsContent>

                    <TabsContent value="mechanics">
                        <div className="w-full mt-4">
                            <MechanicsTable
                                mechanics={mechanics}
                                currentPage={1}
                                itemsPerPage={10}
                                onSearch={() => { }}
                                onFilterChange={() => { }}
                                onPageChange={() => { }}
                                isLoading={false}
                                clearFilters={() => { }}
                            />
                        </div>
                    </TabsContent>

                    <TabsContent value="customers">
                        <div className="w-full mt-4">
                            <CustomerTable
                                customers={[]}
                                currentPage={1}
                                itemsPerPage={10}
                                onSearch={() => { }}
                                onFilterChange={() => { }}
                                onPageChange={() => { }}
                                isLoading={false}
                                totalItems={0}
                            />
                        </div>
                    </TabsContent>

                    <TabsContent value="reviews">
                        <div className="w-full mt-4">
                            <ReviewTable
                                reviews={reviews?.reviews || []}
                                currentPage={1}
                                itemsPerPage={10}
                                onSearch={() => { }}
                                onFilterChange={() => { }}
                                onPageChange={() => { }}
                                isLoading={false}
                                totalItems={reviews?.metadata?.total || 0}
                                clearFilters={() => { }}
                            />
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

            <EditServiceCenterLocationSheet service_center={serviceCenterData} open={openEditServiceCenterLocationSheet} onOpenChange={setOpenEditServiceCenterLocationSheet} />
            <EditServiceCenterSheet service_center={serviceCenterData} open={openEditServiceCenterSheet} onOpenChange={setOpenEditServiceCenterSheet} />
        </>


    );
};

export default ServiceCenterDetailScreen;