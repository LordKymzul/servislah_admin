"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Eye, ChevronLeft, ChevronRight, Wrench, MoreHorizontal, Edit, Plus } from "lucide-react"
import ServicesDataTable from "../components/services-data-table"
import { useQueryServices } from "../../tanstack/service-tanstack"
import LoadingScreen from "@/src/core/shared/presentation/screens/loading-screen"
import { InfoScreenType } from "@/src/core/shared/presentation/screens/info-screen"
import InfoScreen from "@/src/core/shared/presentation/screens/info-screen"
import DefaultCard from "@/src/core/shared/presentation/components/default-card"
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
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useQueryServiceCenters } from "@/src/modules/service-centers/presentation/tanstack/service-center-tanstack"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"


const ServicesScreen = () => {

    const {
        data: serviceCenters,
        isLoading: isServiceCentersLoading,
        isError: isServiceCentersError,
        error: serviceCentersError
    } = useQueryServiceCenters({

    })

    const router = useRouter()

    const selectedServiceCenter = serviceCenters?.[0]

    const [selectedServiceCenterID, setSelectedServiceCenterID] = useState<string | null>(selectedServiceCenter?.id || null)

    const handleServiceCenterChange = (serviceCenterId: string) => {
        toast.success(`Selected service center: ${serviceCenterId}`)
        setSelectedServiceCenterID(serviceCenterId)
    }
    const { data: services,
        isLoading,
        isError,
        error } = useQueryServices({
            service_center_id: selectedServiceCenterID || selectedServiceCenter?.id
        })



    if (isLoading) {
        return <LoadingScreen />
    }

    if (isError || !services) {
        return <InfoScreen type={InfoScreenType.ERROR} title="Error" description={error?.message || "Failed to load services"} />
    }


    return (
        <div className="mx-auto py-4 px-4 w-full">
            <DefaultCard>
                <div className="p-6 border-b flex flex-col md:flex-row md:items-center  items-start gap-2 justify-between">
                    <div className="flex flex-col items-start gap-1">
                        <h2 className="text-xl font-semibold">Services</h2>
                        <p className="text-sm text-muted-foreground">Manage your service offerings and pricing</p>
                    </div>

                    <div className="flex md:flex-row flex-col md:items-center items-start gap-2">
                        <Select
                            onValueChange={handleServiceCenterChange}
                            defaultValue={selectedServiceCenter?.id}
                        >
                            <SelectTrigger className="w-[300px]">
                                <SelectValue placeholder="Service Center" />
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    serviceCenters?.map((serviceCenter) => (
                                        <SelectItem
                                            key={serviceCenter.id}
                                            value={serviceCenter.id || ""}
                                        >{serviceCenter.name || "N/A"}</SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>

                        <Button>
                            <Plus className="h-4 w-4" />
                            Add Service
                        </Button>
                    </div>
                </div>
                <Table>
                    <TableHeader className="hover:bg-transparent">
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead>Available</TableHead>
                            <TableHead className="w-12"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            services?.services.map((service) => (
                                <TableRow key={service.id}>
                                    <TableCell>{service.name}</TableCell>
                                    <TableCell>{service.description}</TableCell>
                                    <TableCell>{service.price}</TableCell>
                                    <TableCell>{service.duration}</TableCell>
                                    <TableCell>
                                        <Badge variant={service.is_active ? "default" : "outline"}>
                                            {service.is_active ? "Available" : "Not Available"}
                                        </Badge>
                                    </TableCell>
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
                                                <DropdownMenuItem onClick={() => router.push(`/settings/service-center/services/${service.id}`)}>
                                                    <Eye className="h-4 w-4" />
                                                    View
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>

                                    </TableCell>
                                </TableRow>
                            ))
                        }

                    </TableBody>


                    <TableFooter className="hover:bg-transparent w-full">
                        <TableRow>
                            <TableCell colSpan={5}>
                                <div className="flex items-center justify-between w-full p-4">
                                    <div className="flex-1 text-sm text-muted-foreground">
                                        {services?.metadata?.total} of {services?.metadata?.total} row(s) selected.
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
    )
}

export default ServicesScreen;