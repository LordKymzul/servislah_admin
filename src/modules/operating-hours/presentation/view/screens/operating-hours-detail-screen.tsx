"use client"

import LoadingScreen from "@/src/core/shared/presentation/screens/loading-screen"
import { useQueryOperatingHoursbyId } from "../../tanstack/operating-hours-tanstack"
import InfoScreen from "@/src/core/shared/presentation/screens/info-screen"
import { InfoScreenType } from "@/src/core/shared/presentation/screens/info-screen"
import EditOperatingHoursSheet from "../components/edit-operating-hours-sheet"
import DefaultCard from "@/src/core/shared/presentation/components/default-card"
import { useState } from "react"
import { Edit } from "lucide-react"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"


interface OperatingHoursDetailScreenProps {
    operating_hours_id: string
}

const OperatingHoursDetailScreen = ({ operating_hours_id }: OperatingHoursDetailScreenProps) => {
    const { data: operatingHours, isLoading, isError, error } = useQueryOperatingHoursbyId(operating_hours_id)

    const [openEditOperatingHoursSheet, setOpenEditOperatingHoursSheet] = useState(false)

    if (isLoading) {
        return <LoadingScreen />
    }

    if (isError) {
        return <InfoScreen
            title="Error"
            description={error?.message || "Failed to load operating hours"}
            type={InfoScreenType.ERROR}
        />
    }

    if (!operatingHours) {
        return <InfoScreen
            title="Not Found"
            description="Operating hours not found"
            type={InfoScreenType.ERROR}
        />
    }

    return (
        <div className="flex flex-col gap-4 w-full p-6">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                <div className="flex flex-col gap-4 md:col-span-4 col-span-6">
                    <DefaultCard>
                        <div className="p-6 border-b flex flex-col md:flex-row md:items-center items-start gap-2 justify-between">
                            <div className="flex flex-col items-start">
                                <h2 className="text-xl font-semibold">Operating Hours Details</h2>
                                <p className="text-sm text-muted-foreground">
                                    Details of the operating hours schedule.
                                </p>
                            </div>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem onClick={() => setOpenEditOperatingHoursSheet(true)}>
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
                                <div className="text-sm">ID</div>
                                <div className="text-sm text-right">{operatingHours.id || 'N/A'}</div>
                            </div>

                            <div className="flex items-center justify-between p-6">
                                <div className="text-sm">Service Center ID</div>
                                <div className="text-sm text-right">{operatingHours.service_center_id || 'N/A'}</div>
                            </div>

                            <div className="flex items-center justify-between p-6">
                                <div className="text-sm">Day</div>
                                <div className="text-sm text-right">{operatingHours.day || 'N/A'}</div>
                            </div>

                            <div className="flex items-center justify-between p-6">
                                <div className="text-sm">Operating Hours</div>
                                <div className="text-sm text-right">{`${operatingHours.open_time} - ${operatingHours.close_time}` || 'N/A'}</div>
                            </div>

                            <div className="flex items-center justify-between p-6">
                                <div className="text-sm">Status</div>
                                <div className="text-sm text-right">{operatingHours.is_active ? 'Active' : 'Inactive'}</div>
                            </div>
                        </div>
                    </DefaultCard>
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
                        </div>

                        <div className="divide-y">
                            <div className="flex items-center justify-between p-6">
                                <div className="text-sm">Name</div>
                                <div className="text-sm text-right">{operatingHours.service_center?.name || 'N/A'}</div>
                            </div>

                            <div className="flex items-center justify-between p-6">
                                <div className="text-sm">Phone</div>
                                <div className="text-sm text-right">{operatingHours.service_center?.phone || 'N/A'}</div>
                            </div>

                            <div className="flex items-center justify-between p-6">
                                <div className="text-sm">Email</div>
                                <div className="text-sm text-right">{operatingHours.service_center?.email || 'N/A'}</div>
                            </div>

                        </div>

                    </DefaultCard>
                </div>
            </div>
            <EditOperatingHoursSheet operatingHours={operatingHours} open={openEditOperatingHoursSheet} onOpenChange={setOpenEditOperatingHoursSheet} />

        </div>
    )
}

export default OperatingHoursDetailScreen