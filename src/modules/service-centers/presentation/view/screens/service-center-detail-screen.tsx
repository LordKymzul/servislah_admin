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
    Calendar,
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
    Rocket
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

const ServiceCenterDetailScreen = ({ service_center_id }: { service_center_id: string }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const {
        data: serviceCenter,
        isLoading: isServiceCenterLoading,
        isError: isServiceCenterError,
        error: serviceCenterError
    } = useQueryServiceCenterById({ service_center_id });

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

        <div className="p-4 md:p-8 space-y-4 md:space-y-8 min-h-screen">
            <div className="flex flex-col lg:flex-row items-start justify-between gap-4 w-full">
                <div className="w-full lg:w-3/4">
                    <div className="flex flex-col gap-4">
                        <DefaultCard>
                            {/* Header */}
                            <div className="p-4 md:p-6 border-b flex flex-row items-center justify-between">
                                <div className="flex flex-col items-start gap-1">
                                    <h2 className="text-lg md:text-xl font-semibold">Service Center</h2>
                                    <p className="text-xs md:text-sm text-muted-foreground">Manage your service center's details</p>
                                </div>

                                <Button variant="ghost" size="icon">
                                    <ArrowUpRight className="w-4 h-4" />
                                </Button>

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

                        <DefaultCard>
                            <div className="p-6 border-b flex flex-row items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold">Data</h2>
                                    <p className="text-sm text-muted-foreground">Manage your service center's data</p>
                                </div>
                                <div className="flex flex-row items-center gap-2">
                                    <Button variant="ghost" size="icon">
                                        <ArrowUpRight className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                            <div className="divide-y">

                                <div className="flex items-center justify-between p-6">
                                    <div className="text-sm">Appointments</div>
                                    <div className="text-sm text-right">{totalAppointments || 'N/A'}</div>
                                </div>

                                <div className="flex items-center justify-between p-6">
                                    <div className="text-sm">Completed Appointments</div>
                                    <div className="text-sm text-right">{completedAppointments || 'N/A'}</div>
                                </div>

                                <div className="flex items-center justify-between p-6">
                                    <div className="text-sm">Pending Appointments</div>
                                    <div className="text-sm text-right">{pendingAppointments || 'N/A'}</div>
                                </div>

                                <div className="flex items-center justify-between p-6">
                                    <div className="text-sm">Services</div>
                                    <div className="text-sm text-right">{totalServices || 'N/A'}</div>
                                </div>


                            </div>
                        </DefaultCard>

                        <DefaultCard>
                            <div className="p-6 border-b flex flex-row items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold">Services</h2>
                                    <p className="text-sm text-muted-foreground">Manage your service center's services</p>
                                </div>
                            </div>

                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="hidden md:table-cell w-12"></TableHead>
                                        <TableHead>Service Name</TableHead>
                                        <TableHead className="hidden md:table-cell">Duration</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="w-12"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {serviceCenterData.services && serviceCenterData.services.length > 0 ? (
                                        serviceCenterData.services
                                            .filter((service: ServiceCenterService) =>
                                                service.name?.toLowerCase().includes(searchQuery.toLowerCase())
                                            )
                                            .map((service: ServiceCenterService) => (
                                                <TableRow key={service.id}>
                                                    <TableCell className="hidden md:table-cell">
                                                        <div className="p-2 bg-primary/10 rounded-lg w-fit">
                                                            <Wrench className="h-4 w-4 text-primary" />
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div>
                                                            <p className="font-medium">{service.name}</p>
                                                            <p className="text-xs md:text-sm text-muted-foreground">{service.description || 'No description'}</p>
                                                            <div className="md:hidden text-xs text-muted-foreground mt-1">
                                                                {service.duration ? formatDuration(service.duration) : '-'}
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="hidden md:table-cell text-muted-foreground">
                                                        {service.duration ? formatDuration(service.duration) : '-'}
                                                    </TableCell>
                                                    <TableCell className="font-medium">
                                                        {formatCurrency(service.price || 0)}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge
                                                            variant={service.is_active ? "default" : "secondary"}
                                                            className="text-xs"
                                                        >
                                                            {service.is_active ? "Active" : "Inactive"}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Button variant="ghost" size="sm">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center py-8">
                                                <Wrench className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                                                <p className="text-muted-foreground">No services found</p>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </DefaultCard>

                        <DefaultCard>

                            <div className="p-6 border-b flex flex-row items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold">Specializations</h2>
                                    <p className="text-sm text-muted-foreground">Manage your service center's specializations</p>
                                </div>
                            </div>
                            <Table>
                                <TableHeader className="hover:bg-transparent">
                                    <TableRow>
                                        <TableHead className="hidden md:table-cell w-12"></TableHead>
                                        <TableHead>Specialization Name</TableHead>
                                        <TableHead className="hidden md:table-cell">Description</TableHead>
                                        <TableHead className="w-12"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
                                        serviceCenterData.specializations && serviceCenterData.specializations.length > 0 && serviceCenterData.specializations.map((spec: SpecializationModel) => (
                                            <TableRow
                                                className="hover:bg-transparent"
                                                key={spec.id}>
                                                <TableCell className="hidden md:table-cell">
                                                    <div className="p-2 bg-primary/10 rounded-lg w-fit">
                                                        <Rocket className="h-4 w-4 text-primary" />
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div>
                                                        <p className="font-medium">{spec.name}</p>
                                                        <p className="md:hidden text-xs text-muted-foreground">{spec.description || 'N/A'}</p>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">{spec.description || 'N/A'}</TableCell>
                                                <TableCell>
                                                    <Button variant="ghost" size="sm">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                    {
                                        serviceCenterData.specializations && serviceCenterData.specializations.length === 0 && (
                                            <TableRow>
                                                <TableCell colSpan={6} className="text-center py-8">
                                                    <Rocket className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                                                    <p className="text-muted-foreground">No specializations found</p>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    }
                                </TableBody>
                            </Table>


                        </DefaultCard>
                    </div>

                </div>

                <div className="w-full lg:w-1/4">
                    <div className="flex flex-col gap-4">

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


                        <DefaultCard>
                            <div className="p-6 border-b flex flex-row items-center justify-between">
                                <h2 className="text-xl font-semibold">Location</h2>
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
                                <h2 className="text-lg md:text-xl font-semibold">Recent Appointments</h2>
                            </div>

                            <div className="divide-y">
                                {
                                    serviceCenterData.appointments && serviceCenterData.appointments.length > 0 && serviceCenterData.appointments.slice(0, 6).map((appointment: AppointmentModel) => (
                                        <div
                                            key={appointment.id}
                                            className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 md:p-6">
                                            <div className="text-sm mb-1 md:mb-0">
                                                <Badge
                                                    variant={appointment.status === 'COMPLETED' ? 'default' :
                                                        appointment.status === 'PENDING' ? 'secondary' :
                                                            'outline'}>
                                                    {appointment.status}
                                                </Badge>
                                            </div>
                                            <p className="text-xs text-muted-foreground">
                                                {new Date(appointment.date || '').toLocaleDateString('en-MY')} at {new Date(appointment.time || '').toLocaleTimeString('en-MY', { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    ))
                                }
                                {
                                    serviceCenterData.appointments && serviceCenterData.appointments.length === 0 && (
                                        <div className="text-center py-6 md:py-8">
                                            <Calendar className="h-6 w-6 md:h-8 md:w-8 text-muted-foreground mx-auto mb-2" />
                                            <p className="text-sm text-muted-foreground">No appointments found</p>
                                        </div>
                                    )
                                }
                            </div>
                        </DefaultCard>
                    </div>
                </div>
            </div >




        </div >
    );
};

export default ServiceCenterDetailScreen;