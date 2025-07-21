'use client'
import DataCard from "@/src/core/shared/presentation/components/data-card"
import { Building2, MoreHorizontal, Edit, Eye, Plus, Search, SortAsc } from "lucide-react"
import { AnalyticsOverviewChart } from "../components/analytics-overview-chart"
import DefaultCard from "@/src/core/shared/presentation/components/default-card"



import * as React from "react"
import { Button } from "@/components/ui/button"

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

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input"

import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar"


let recentAppointments: any[] = [
    {
        date: "2025-01-01",
        total_appointments: 10,
        total_vehicles: 10,
        revenue: 1000,
    },
    {
        date: "2025-01-02",
        total_appointments: 10,
        total_vehicles: 10,
        revenue: 1000,
    },
    {
        date: "2025-01-03",
        total_appointments: 10,
        total_vehicles: 10,
        revenue: 1000,
    },
    {
        date: "2025-01-04",
        total_appointments: 10,
        total_vehicles: 10,
        revenue: 1000,
    },
    {
        date: "2025-01-05",
        total_appointments: 10,
        total_vehicles: 10,
        revenue: 1000,
    },
    {
        date: "2025-01-05",
        total_appointments: 10,
        total_vehicles: 10,
        revenue: 1000,
    },
    {
        date: "2025-01-05",
        total_appointments: 10,
        total_vehicles: 10,
        revenue: 1000,
    },
    {
        date: "2025-01-05",
        total_appointments: 10,
        total_vehicles: 10,
        revenue: 1000,
    },
    {
        date: "2025-01-05",
        total_appointments: 10,
        total_vehicles: 10,
        revenue: 1000,
    },
    {
        date: "2025-01-05",
        total_appointments: 10,
        total_vehicles: 10,
        revenue: 1000,
    },
    {
        date: "2025-01-05",
        total_appointments: 10,
        total_vehicles: 10,
        revenue: 1000,
    },
    {
        date: "2025-01-05",
        total_appointments: 10,
        total_vehicles: 10,
        revenue: 1000,
    },

    {
        date: "2025-01-05",
        total_appointments: 10,
        total_vehicles: 10,
        revenue: 1000,
    },

]


const AnalyticsOverviewScreen = () => {
    return (
        <div className="flex flex-col gap-4 w-full p-6">
            <div className="flex flex-col item-start">
                <h1 className="text-2xl  md:text-3xl font-bold">Overview</h1>
                <p className="text-sm md:text-base text-muted-foreground">
                    This is your overview of the system.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <DataCard
                    title="Total Service Centers"
                    value={"10"}
                    description="Total number of service centers"
                    icon={<Building2 className="h-4 w-4 text-blue-500" />}
                />
                <DataCard
                    title="Total Service Centers"
                    value={"10"}
                    description="Total number of service centers"
                    icon={<Building2 className="h-4 w-4 text-red-500" />}
                />
                <DataCard
                    title="Total Service Centers"
                    value={"10"}
                    description="Total number of service centers"
                    icon={<Building2 className="h-4 w-4 text-green-500" />}
                />
                <DataCard
                    title="Total Service Centers"
                    value={"10"}
                    description="Total number of service centers"
                    icon={<Building2 className="h-4 w-4 text-yellow-500" />}
                />
            </div>


            <AnalyticsOverviewChart />

            <Tabs defaultValue="appointments" className="w-full">
                <TabsList>
                    <TabsTrigger value="appointments">Appointments</TabsTrigger>
                    <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
                    <TabsTrigger value="revenue">Revenue</TabsTrigger>
                </TabsList>

                <TabsContent value="appointments">
                    <div className="flex flex-col gap-4 mt-2">
                        <RecentAppointmentsTable />
                    </div>
                </TabsContent>

                <TabsContent value="vehicles">
                    <div className="flex flex-col gap-4 mt-2">
                        <RecentAppointmentsTable />

                    </div>


                </TabsContent>

                <TabsContent value="revenue">
                    <div className="flex flex-col gap-4 mt-2">
                        <RecentAppointmentsTable />

                    </div>
                </TabsContent>


            </Tabs>



        </div >
    )
}

const RecentAppointmentsTable = () => {
    return (
        <DefaultCard>
            <div className="flex flex-col h-full">
                <div className="flex flex-col  p-6">
                    <h2 className="text-lg font-bold">Recent Appointments</h2>
                    <p className="text-sm text-muted-foreground">
                        This is your overview of the system.
                    </p>
                </div>


                <div className="flex flex-row items-center w-full justify-between px-6 border-y py-3 gap-2">
                    <div className="flex flex-row items-center gap-2">

                        {/* <div className="flex flex-row items-center gap-2">
                            {
                                Array.from({ length: 3 }).map((_, index) => (
                                    <Badge key={index} variant="outline">
                                        Filter {index + 1}
                                    </Badge>
                                ))
                            }
                        </div> */}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <Menubar>
                                <MenubarMenu>
                                    <MenubarTrigger >
                                        <Plus className="w-4 h-4" />
                                        Add Filter
                                    </MenubarTrigger>
                                    <MenubarContent>
                                        <MenubarItem>
                                            Date
                                        </MenubarItem>
                                        <MenubarItem>
                                            Service Center
                                        </MenubarItem>
                                        <MenubarItem>
                                            Vehicle
                                        </MenubarItem>
                                        <MenubarItem>
                                            Revenue
                                        </MenubarItem>
                                    </MenubarContent>


                                </MenubarMenu>
                            </Menubar>
                            <Button variant="outline">
                                Clear Filters
                            </Button>
                        </div>


                    </div>

                    <div className="flex flex-row items-center gap-2">
                        <Input placeholder="Search" />
                        <Button variant="outline" size="icon">
                            <SortAsc className="w-4 h-4" />

                        </Button>
                    </div>


                </div>



                <div className="flex-1 overflow-auto">
                    <Table>
                        <TableHeader className="bg-foreground/2" >
                            <TableRow >
                                <TableHead className="px-6">Name</TableHead>
                                <TableHead className=" py-3">Total Appointments</TableHead>
                                <TableHead className="py-3">Total Vehicles</TableHead>
                                <TableHead className=" py-3">Revenue</TableHead>
                                <TableHead className="w-12"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody >
                            {
                                recentAppointments.slice(0, 9).map((appointment: any, index: number) => (
                                    <TableRow key={index}>
                                        <TableCell className="px-6 py-3">{appointment.date}</TableCell>
                                        <TableCell className="py-3">{appointment.total_appointments}</TableCell>
                                        <TableCell className="py-3">{appointment.total_vehicles}</TableCell>
                                        <TableCell className="py-3">{appointment.revenue}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>

                        <TableFooter>
                            <TableRow className="border-t bg-foreground/2">
                                <TableCell colSpan={5} className="px-6 py-4">
                                    <div className="flex items-center justify-between">
                                        <div className="text-sm text-gray-600">
                                            1 — 20 of 31 results
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-sm text-gray-600">
                                                1 of 2 pages
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button variant="outline" className="text-sm px-3 py-1.5">
                                                    Prev
                                                </Button>
                                                <Button variant="outline" className="text-sm px-3 py-1.5">
                                                    Next
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                            </TableRow>
                        </TableFooter>

                    </Table>
                </div>
            </div>
        </DefaultCard>
    )
}



export default AnalyticsOverviewScreen