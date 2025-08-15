'use client'
import DefaultCard from "@/src/core/shared/presentation/components/default-card"
import { useQueryServiceById } from "../../tanstack/service-tanstack"
import { formatCurrency } from "@/src/lib/utils"
import { Badge } from "@/components/ui/badge"
import EditServiceSheet from "../components/edit-service-sheet"
import DefaultTable from "@/src/core/shared/presentation/components/default-table"
import Link from "next/link"
import { formatDate } from "@/src/core/util/helper"
import LoadingScreen from "@/src/core/shared/presentation/screens/loading-screen"
import InfoScreen from "@/src/core/shared/presentation/screens/info-screen"
import { InfoScreenType } from "@/src/core/shared/presentation/screens/info-screen"
import { useState } from "react"

const ServicesDetailScreen = ({ service_id }: { service_id: string }) => {

    const { data: service, isLoading, isError, error } = useQueryServiceById(service_id)


    const columns = [
        {
            header: "ID",
            accessorKey: "id",
            cell: (row: any) => (

                <Link href={`/appointments/${row.id}`}>
                    <div className="text-sm text-muted-foreground">{row.id || "N/A"}</div>
                </Link>
            )
        },
        {
            header: "Appointment ID",
            accessorKey: "service_appointment_id",
            cell: (row: any) => (

                <Link href={`/appointments/${row.service_appointment_id}`}>
                    <div className="text-sm text-muted-foreground">{row.service_appointment_id || "N/A"}</div>
                </Link>
            )
        },
        {
            header: "Date",
            accessorKey: "date",
            cell: (row: any) => (

                <div className="text-sm text-muted-foreground">{formatDate(row.created_at) || "N/A"}</div>
            )
        },
        {
            header: "Price",
            accessorKey: "price",
            cell: (row: any) => (

                <Badge variant={
                    row.price > 0 ? "default" : "outline"
                }>
                    {formatCurrency(row.price)}
                </Badge>
            ),
        },
        {
            header: "Duration (Minutes)",
            accessorKey: "duration",
            cell: (row: any) => (
                <div>
                    {row.duration}
                </div>
            ),
        }

    ]

    if (isLoading) {
        return <LoadingScreen />
    }

    if (isError) {
        return <InfoScreen type={InfoScreenType.ERROR} title="Error" description={error?.message} />
    }

    return (
        <>
            <div className="flex flex-col gap-4 w-full p-6">


                <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                    <div className="flex flex-col gap-4 md:col-span-4 col-span-6">
                        <DefaultCard>
                            <div className="p-6 border-b flex flex-col md:flex-row md:items-center  items-start gap-2 justify-between">
                                <div className="flex flex-col items-start">
                                    <h2 className="text-xl font-semibold">Service Details</h2>
                                    <p className="text-sm text-muted-foreground">
                                        This is your detail of the service.
                                    </p>
                                </div>
                                <EditServiceSheet service={service} />
                            </div>

                            <div className="divide-y">
                                <div className="flex items-center justify-between p-6">
                                    <div className="text-sm">Name</div>
                                    <div className="text-sm text-right">{service?.name || 'N/A'}</div>
                                </div>

                                <div className="flex items-center justify-between p-6">
                                    <div className="text-sm">Description</div>
                                    <div className="text-sm text-right">{service?.description || 'N/A'}</div>
                                </div>

                                <div className="flex items-center justify-between p-6">
                                    <div className="text-sm">Price</div>
                                    <div className="text-sm text-right">{formatCurrency(service?.price || 0)}</div>
                                </div>

                                <div className="flex items-center justify-between p-6">
                                    <div className="text-sm">Duration</div>
                                    <div className="text-sm text-right">{service?.duration || 'N/A'}</div>
                                </div>

                                <div className="flex items-center justify-between p-6">
                                    <div className="text-sm">Available</div>
                                    <div className="text-sm text-right">{service?.is_active ? <Badge variant="default">Available</Badge> : <Badge variant="outline">Not Available</Badge>}</div>
                                </div>

                                <div className="flex items-center justify-between p-6">
                                    <div className="text-sm">Service Center ID</div>
                                    <div className="text-sm text-right">{service?.service_center_id || 'N/A'}</div>
                                </div>

                            </div>
                        </DefaultCard>


                        <DefaultTable
                            title="Appointments"
                            description="This is the list of appointments for this service."
                            columns={columns}
                            data={service?.appoinment_items || []}
                        />
                    </div>

                    <div className="md:col-span-2 col-span-6">
                        <DefaultCard>
                            <div className="p-6 border-b flex flex-col md:flex-row md:items-center  items-start gap-2 justify-between">
                                <div className="flex flex-col items-start">
                                    <h2 className="text-xl font-bold">Service Center</h2>
                                    <p className="text-sm text-muted-foreground">
                                        This is the service center for this service.
                                    </p>
                                </div>
                                {/* <EditServiceSheet service={service} /> */}
                            </div>

                            <div className="divide-y">
                                <div className="flex items-center justify-between p-6">
                                    <div className="text-sm">Name</div>
                                    <div className="text-sm text-right">{service?.service_center?.name || 'N/A'}</div>
                                </div>

                                <div className="flex items-center justify-between p-6">
                                    <div className="text-sm">Phone</div>
                                    <div className="text-sm text-right">{service?.service_center?.phone || 'N/A'}</div>
                                </div>

                                <div className="flex items-center justify-between p-6">
                                    <div className="text-sm">Email</div>
                                    <div className="text-sm text-right">{service?.service_center?.email || 'N/A'}</div>
                                </div>

                            </div>

                        </DefaultCard>
                    </div>
                </div>

            </div>

        </>
    )
}

export default ServicesDetailScreen