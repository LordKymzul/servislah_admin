"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
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
    Rocket,
    ChevronLeft,
    Eye
} from "lucide-react"
import { useQueryServiceCenterById, useQueryServiceCenters } from "../../tanstack/service-center-tanstack"
import { ServiceCenterModel, ServiceCenterService, SpecializationModel } from "@/src/modules/service-centers/data/entities/model/service-center-model"
import { useState } from "react"
import DataCard from "@/src/core/shared/presentation/components/data-card"
import DefaultCard from "@/src/core/shared/presentation/components/default-card"
import { AppointmentModel } from "@/src/modules/appointments/data/entities/model/appointment-model"
import { formatCurrency } from "@/src/core/util/helper"
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import InfoScreen, { InfoScreenType } from "@/src/core/shared/presentation/screens/info-screen"
import LoadingScreen from "@/src/core/shared/presentation/screens/loading-screen"

const ServiceCenterScreen = () => {
    const { data: serviceCenters,
        isLoading,
        isError,
        error
    } = useQueryServiceCenters({
        page: 1,
        limit: 10,
    });

    const router = useRouter();

    const handleViewServiceCenter = (serviceCenterId: string) => {
        router.push(`/settings/service-center/${serviceCenterId}`);
    }

    if (isLoading) {
        return (
            <LoadingScreen />
        )
    }

    if (isError) {
        return <InfoScreen type={InfoScreenType.ERROR} title="Error" description={error?.message || "Failed to load service centers"} />
    }

    return (
        <div className="flex flex-col gap-4 w-full p-8">

            <DefaultCard>
                {/* Header */}
                <div className="p-6 border-b flex flex-row items-center justify-between">
                    <div className="flex flex-col items-start gap-1">
                        <h2 className="text-xl font-semibold">Service Center</h2>
                        <p className="text-sm text-muted-foreground">Manage your service center's details</p>
                    </div>

                    <div className="flex flex-row items-center gap-2">
                        <Button variant="outline">
                            <Plus className="w-4 h-4" />
                            Add Service Center
                        </Button>
                    </div>

                </div>

                <Table>
                    <TableHeader className="hover:bg-transparent">
                        <TableRow>
                            <TableHead>Service Center Name</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Address</TableHead>
                            <TableHead className="w-12"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {serviceCenters && serviceCenters.length > 0 ? (
                            serviceCenters.map((serviceCenter: ServiceCenterModel) => (
                                <React.Fragment key={serviceCenter.id}>
                                    <TableRow>
                                        <TableCell>{serviceCenter.name}</TableCell>
                                        <TableCell>{serviceCenter.phone}</TableCell>
                                        <TableCell>{serviceCenter.email}</TableCell>
                                        <TableCell>{serviceCenter.locations?.address + ", " + serviceCenter.locations?.city + ", " + serviceCenter.locations?.state + ", " + serviceCenter.locations?.country}</TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="sm">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuItem>
                                                        <Edit className="h-4 w-4" />
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleViewServiceCenter(serviceCenter.id || "")}>
                                                        <Eye className="h-4 w-4" />
                                                        View
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>

                                        </TableCell>
                                    </TableRow>
                                </React.Fragment>
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

                    <TableFooter className="hover:bg-transparent w-full">
                        <TableRow>
                            <TableCell colSpan={5}>
                                <div className="flex items-center justify-between w-full p-4">
                                    <div className="flex-1 text-sm text-muted-foreground">
                                        {serviceCenters?.length} of {serviceCenters?.length} row(s) selected.
                                    </div>
                                    <div className="flex items-center space-x-6 lg:space-x-8">
                                        <div className="flex items-center space-x-2">
                                            <p className="text-sm font-medium">Rows per page</p>
                                            <select className="h-8 w-[70px] rounded-md border border-input bg-transparent">
                                                <option value="10">10</option>
                                                <option value="20">20</option>
                                                <option value="30">30</option>
                                                <option value="40">40</option>
                                                <option value="50">50</option>
                                            </select>
                                        </div>
                                        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                                            Page 1 of 1
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Button variant="outline" size="sm" disabled>
                                                <ChevronLeft className="h-4 w-4" />
                                            </Button>
                                            <Button variant="outline" size="sm" disabled>
                                                <ChevronRight className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>





            </DefaultCard>


        </div>

    );
};

export default ServiceCenterScreen;