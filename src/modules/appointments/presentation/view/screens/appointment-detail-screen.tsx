'use client'

import LoadingScreen from "@/src/core/shared/presentation/screens/loading-screen"
import { useQueryAppointmentById } from "../../tanstack/appointment-tanstack"
import InfoScreen, { InfoScreenType } from "@/src/core/shared/presentation/screens/info-screen"
import DefaultCard from "@/src/core/shared/presentation/components/default-card"
import { Badge } from "@/components/ui/badge"
import { formatDate, formatTime } from "@/src/core/util/helper"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Edit, MoreHorizontal, Trash } from "lucide-react"

const AppointmentDetailScreen = ({ appointmentId }: { appointmentId: string }) => {
    const { data: appointment, isLoading, isError, error } = useQueryAppointmentById(appointmentId)

    if (isError) {
        return <InfoScreen type={InfoScreenType.ERROR} title="Error" description={error.message} />
    }

    if (isLoading) {
        return <LoadingScreen />
    }

    return (
        <div className="flex flex-col gap-4 items-start w-full">
            <div className="flex flex-col gap-2 w-full px-6 mt-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">Appointment Detail</h1>
                        <p className="text-sm text-muted-foreground">
                            View the details of the appointment.
                        </p>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreHorizontal className="w-4 h-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>
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

                <div className="grid grid-cols-1  lg:grid-cols-3 gap-4 w-full mt-4">
                    <div className="flex flex-col gap-4 w-full md:col-span-2">
                        <div className="w-full">
                            <DefaultCard>
                                <div className="divide-y w-full">
                                    <div className="flex items-center justify-between p-4">
                                        <h2 className="md:text-lg text-base font-semibold">Appointment Information</h2>
                                    </div>

                                    <div className="flex items-center justify-between p-4">
                                        <div className="text-sm">Appointment ID</div>
                                        <div className="text-sm text-right">{appointment?.id || 'N/A'}</div>
                                    </div>

                                    <div className="flex items-center justify-between p-4">
                                        <div className="text-sm">Status</div>
                                        <div className="text-sm text-right">
                                            <Badge variant={appointment?.status === 'PENDING' ? 'secondary' : 'default'}>
                                                {appointment?.status || 'N/A'}
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between p-4">
                                        <div className="text-sm">Date</div>
                                        <div className="text-sm text-right">{formatDate(appointment?.date) || 'N/A'}</div>
                                    </div>

                                    <div className="flex items-center justify-between p-4">
                                        <div className="text-sm">Time</div>
                                        <div className="text-sm text-right">{formatTime(appointment?.time) || 'N/A'}</div>
                                    </div>
                                </div>
                            </DefaultCard>
                        </div>

                        <div className="w-full">
                            <DefaultCard>
                                <div className="divide-y w-full">
                                    <div className="flex items-center justify-between p-4">
                                        <h2 className="md:text-lg text-base font-semibold">Vehicle Information</h2>
                                    </div>

                                    <div className="flex items-center justify-between p-4">
                                        <div className="text-sm">Vehicle Model</div>
                                        <div className="text-sm text-right">{appointment?.vehicle?.model || 'N/A'}</div>
                                    </div>

                                    <div className="flex items-center justify-between p-4">
                                        <div className="text-sm">License Plate</div>
                                        <div className="text-sm text-right">{appointment?.vehicle?.license_plate || 'N/A'}</div>
                                    </div>

                                    <div className="flex items-center justify-between p-4">
                                        <div className="text-sm">Year</div>
                                        <div className="text-sm text-right">{appointment?.vehicle?.year || 'N/A'}</div>
                                    </div>

                                    <div className="flex items-center justify-between p-4">
                                        <div className="text-sm">Color</div>
                                        <div className="text-sm text-right">{appointment?.vehicle?.color || 'N/A'}</div>
                                    </div>

                                    <div className="flex items-center justify-between p-4">
                                        <div className="text-sm">Fuel Type</div>
                                        <div className="text-sm text-right">{appointment?.vehicle?.fuel_type || 'N/A'}</div>
                                    </div>
                                </div>
                            </DefaultCard>
                        </div>

                        <div className="w-full">
                            <DefaultCard>
                                <div className="divide-y w-full">
                                    <div className="flex items-center justify-between p-4">
                                        <h2 className="md:text-lg text-base font-semibold">Service Items</h2>
                                    </div>

                                    {appointment?.items?.map((item) => (
                                        <div key={item.id} className="p-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="text-sm font-medium">{item.service?.name}</div>
                                                <div className="text-sm">RM {item.service?.price?.toFixed(2)}</div>
                                            </div>
                                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                                                <div>{item.service?.description}</div>
                                                <div>Duration: {item.service?.duration} mins</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </DefaultCard>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 w-full md:col-span-1">
                        <div className="w-full">
                            <DefaultCard>
                                <div className="divide-y w-full">
                                    <div className="flex items-center justify-between p-4">
                                        <h2 className="md:text-lg text-base font-semibold">Customer Information</h2>
                                    </div>

                                    <div className="flex items-center justify-between p-4">
                                        <div className="text-sm">Customer ID</div>
                                        <div className="text-sm text-right">{appointment?.customer?.id || 'N/A'}</div>
                                    </div>

                                    <div className="flex items-center justify-between p-4">
                                        <div className="text-sm">Email</div>
                                        <div className="text-sm text-right">{appointment?.customer?.user?.email || 'N/A'}</div>
                                    </div>

                                    <div className="flex items-center justify-between p-4">
                                        <div className="text-sm">Phone</div>
                                        <div className="text-sm text-right">{appointment?.customer?.user?.phone || 'N/A'}</div>
                                    </div>
                                </div>
                            </DefaultCard>
                        </div>

                        <div className="w-full">
                            <DefaultCard>
                                <div className="divide-y w-full">
                                    <div className="flex items-center justify-between p-4">
                                        <h2 className="md:text-lg text-base font-semibold">Service Center Information</h2>
                                    </div>

                                    <div className="flex items-center justify-between p-4">
                                        <div className="text-sm">Service Center Name</div>
                                        <div className="text-sm text-right">{appointment?.service_center?.name || 'N/A'}</div>
                                    </div>

                                    <div className="flex items-center justify-between p-4">
                                        <div className="text-sm">Email</div>
                                        <div className="text-sm text-right">{appointment?.service_center?.email || 'N/A'}</div>
                                    </div>

                                    <div className="flex items-center justify-between p-4">
                                        <div className="text-sm">Phone</div>
                                        <div className="text-sm text-right">{appointment?.service_center?.phone || 'N/A'}</div>
                                    </div>
                                </div>
                            </DefaultCard>
                        </div>

                        <div className="w-full">
                            <DefaultCard>
                                <div className="divide-y w-full">
                                    <div className="flex items-center justify-between p-4">
                                        <h2 className="md:text-lg text-base font-semibold">Mechanic Information</h2>
                                    </div>

                                    <div className="flex items-center justify-between p-4">
                                        <div className="text-sm">Name</div>
                                        <div className="text-sm text-right">{appointment?.mechanic?.user?.name || 'N/A'}</div>
                                    </div>

                                    <div className="flex items-center justify-between p-4">
                                        <div className="text-sm">Email</div>
                                        <div className="text-sm text-right">{appointment?.service_center?.email || 'N/A'}</div>
                                    </div>

                                    <div className="flex items-center justify-between p-4">
                                        <div className="text-sm">Experience</div>
                                        <div className="text-sm text-right">{appointment?.mechanic?.experience_level || 'N/A'}</div>
                                    </div>
                                </div>
                            </DefaultCard>
                        </div>

                        <div className="w-full">
                            <DefaultCard>
                                <div className="divide-y w-full">
                                    <div className="flex items-center justify-between p-4">
                                        <h2 className="md:text-lg text-base font-semibold">Service Bay Information</h2>
                                    </div>

                                    <div className="flex items-center justify-between p-4">
                                        <div className="text-sm">ID</div>
                                        <div className="text-sm text-right">{appointment?.service_bay?.id || 'N/A'}</div>
                                    </div>


                                    <div className="flex items-center justify-between p-4">
                                        <div className="text-sm">Bay Name</div>
                                        <div className="text-sm text-right">{appointment?.service_bay?.name || 'N/A'}</div>
                                    </div>




                                </div>
                            </DefaultCard>
                        </div>


                    </div>


                </div>
            </div>
        </div>
    )
}

export default AppointmentDetailScreen