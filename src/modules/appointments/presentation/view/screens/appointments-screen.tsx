"use client"

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal, Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { AppointmentModel } from "../../../data/entities/model/appointment-model"
import { useQueryAppointments } from "../../tanstack/appointment-tanstack"
import { QueryAppointmentDto } from "../../../data/entities/dto/query-appointment.dto"
import { AppointmentsDataTable } from "../components/appointments-data-table"



const AppointmentsScreen = () => {
    const [query] = React.useState<QueryAppointmentDto>({})
    const { data: appointments, isLoading } = useQueryAppointments(query)

    return (
        <div className="mx-auto py-4 px-4 w-full">
            <div className="flex md:flex-row flex-col justify-between md:items-center mb-6 gap-4">
                <div className="space-y-2">
                    <h1 className="md:text-3xl text-2xl font-bold">Appointments</h1>
                    <p className="text-sm text-muted-foreground font-light">
                        Manage your appointments here
                    </p>
                </div>
                <div>
                    <Button>
                        <Calendar className="mr-2 h-4 w-4" />
                        New Appointment
                    </Button>
                </div>
            </div>
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
            ) : (
                <AppointmentsDataTable data={appointments || []} />
            )}
        </div>
    )
}

export default AppointmentsScreen;