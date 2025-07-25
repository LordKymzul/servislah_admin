'use client'
import LoadingScreen from "@/src/core/shared/presentation/screens/loading-screen"
import { useQueryServiceBayById } from "../../tanstack/service-bay-tanstack"
import { InfoScreenType } from "@/src/core/shared/presentation/screens/info-screen"
import InfoScreen from "@/src/core/shared/presentation/screens/info-screen"
import DefaultCard from "@/src/core/shared/presentation/components/default-card"
import EditServiceBaySheet from "../components/edit-service-bay-sheet"
import { formatCurrency } from "@/src/core/util/helper"
import Link from "next/link"
import { formatDate } from "@/src/core/util/helper"
import { Badge } from "@/components/ui/badge"
import DefaultTable from "@/src/core/shared/presentation/components/default-table"
import { AppointmentModel } from "@/src/modules/appointments/data/entities/model/appointment-model"

const ServiceBayDetailScreen = ({ service_bay_id }: { service_bay_id: string }) => {

    const columns = [
        {
            header: "ID",
            accessorKey: "id",
            cell: (row: AppointmentModel) => (

                <Link href={`/appointments/${row.id}`}>
                    <div className="text-sm text-muted-foreground">{row.id || "N/A"}</div>
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
            header: "Mechanic",
            accessorKey: "mechanic",
            cell: (row: AppointmentModel) => (

                <Badge variant={
                    row.mechanic_id ? "default" : "outline"
                }>
                    {row.mechanic_id ? row.mechanic_id : "N/A"}
                </Badge>
            ),
        },
        {
            header: "Status",
            accessorKey: "status",
            cell: (row: AppointmentModel) => (
                <div>
                    {row.status?.replace("_", " ")}
                </div>
            ),
        }

    ]

    const {
        data: serviceBay,
        isLoading,
        isError,
        error } = useQueryServiceBayById(service_bay_id)

    if (isLoading) {
        return <LoadingScreen />
    }

    if (isError) {
        return <InfoScreen type={InfoScreenType.ERROR} title="Error" description={error?.message} />
    }

    return <div className="flex flex-col gap-4 w-full p-6">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="flex flex-col gap-4 md:col-span-4 col-span-6">
                <DefaultCard>
                    <div className="p-6 border-b flex flex-col md:flex-row md:items-center  items-start gap-2 justify-between">
                        <div className="flex flex-col items-start">
                            <h2 className="text-xl font-semibold">Service Bay Details</h2>
                            <p className="text-sm text-muted-foreground">
                                This is your detail of the service bay.
                            </p>
                        </div>
                        <EditServiceBaySheet service_bay={serviceBay} />
                    </div>

                    <div className="divide-y">
                        <div className="flex items-center justify-between p-6">
                            <div className="text-sm">ID</div>
                            <div className="text-sm text-right">{serviceBay?.id || 'N/A'}</div>
                        </div>

                        <div className="flex items-center justify-between p-6">
                            <div className="text-sm">Service Center ID</div>
                            <div className="text-sm text-right">{serviceBay?.service_center_id || 'N/A'}</div>
                        </div>

                        <div className="flex items-center justify-between p-6">
                            <div className="text-sm">Name</div>
                            <div className="text-sm text-right">{serviceBay?.name || 'N/A'}</div>
                        </div>
                    </div>
                </DefaultCard>

                <DefaultTable
                    title="Appointments"
                    description="This is the list of appointments for this service."
                    columns={columns}
                    data={serviceBay?.appointments || []}
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
                            <div className="text-sm text-right">{serviceBay?.service_center?.name || 'N/A'}</div>
                        </div>

                        <div className="flex items-center justify-between p-6">
                            <div className="text-sm">Phone</div>
                            <div className="text-sm text-right">{serviceBay?.service_center?.phone || 'N/A'}</div>
                        </div>

                        <div className="flex items-center justify-between p-6">
                            <div className="text-sm">Email</div>
                            <div className="text-sm text-right">{serviceBay?.service_center?.email || 'N/A'}</div>
                        </div>

                    </div>

                </DefaultCard>
            </div>
        </div>
    </div>
}

export default ServiceBayDetailScreen