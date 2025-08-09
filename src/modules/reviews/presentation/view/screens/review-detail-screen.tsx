'use client'
import LoadingScreen from "@/src/core/shared/presentation/screens/loading-screen"
import { useGetReviewById } from "../../tanstack/review-tanstack"
import InfoScreen, { InfoScreenType } from "@/src/core/shared/presentation/screens/info-screen"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import DefaultCard from "@/src/core/shared/presentation/components/default-card"
import { MoreHorizontal } from "lucide-react"
import { Edit, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { formatDate, formatTime } from "@/src/core/util/helper"
import EditReviewSheet from "../components/edit-review-sheet"


const ReviewDetailScreen = ({ reviewId }: { reviewId: string }) => {

    const { data: review, isLoading, error, isError } = useGetReviewById(reviewId)
    const [isEditSheetOpen, setIsEditSheetOpen] = useState(false)

    if (isLoading) {
        return (
            <LoadingScreen />
        )
    }

    if (isError) {
        return <InfoScreen title="Error" description={error?.message} type={InfoScreenType.ERROR} />
    }




    return (
        <>
            <div className="flex flex-col  w-full items-start">
                <div className="w-full mt-4">
                    <div className="px-6">
                        <DefaultCard>
                            <div className="divide-y">
                                <div className="flex items-center justify-between p-4">
                                    <h2 className="md:text-lg text-base font-semibold">{review?.customer?.user?.email || 'N/A'}</h2>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem onClick={() => setIsEditSheetOpen(true)}>
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

                                <div className="flex items-center justify-between p-4">
                                    <div className="text-sm">Review ID</div>
                                    <div className="text-sm text-right">{review?.id || 'N/A'}</div>
                                </div>

                                <div className="flex items-center justify-between p-4">
                                    <div className="text-sm">Rating</div>
                                    <div className="text-sm text-right">{review?.rating || 'N/A'}</div>
                                </div>

                                <div className="flex items-center justify-between p-4">
                                    <div className="text-sm">Status</div>
                                    <div className="text-sm text-right">{review?.is_active ? <Badge variant="default">Active</Badge> : <Badge variant="destructive">Inactive</Badge>}</div>
                                </div>

                                <div className="flex items-center justify-between p-4">
                                    <div className="text-sm">Comment</div>
                                    <div className="text-sm text-right">{review?.comment || 'N/A'}</div>
                                </div>


                            </div>
                        </DefaultCard>
                    </div>
                </div>

                <div className="w-full mt-4">
                    <div className="px-6">
                        <DefaultCard>
                            <div className="divide-y">

                                <div className="flex items-center justify-between p-4">
                                    <h2 className="md:text-lg text-base font-semibold">Service Center</h2>
                                </div>

                                <div className="flex items-center justify-between p-4">
                                    <div className="text-sm">Service Center ID</div>
                                    <div className="text-sm text-right">{review?.service_center?.id || 'N/A'}</div>
                                </div>

                                <div className="flex items-center justify-between p-4">
                                    <div className="text-sm">Name</div>
                                    <div className="text-sm text-right">{review?.service_center?.name || 'N/A'}</div>
                                </div>

                                <div className="flex items-center justify-between p-4">
                                    <div className="text-sm">Email</div>
                                    <div className="text-sm text-right">{review?.service_center?.email || 'N/A'}</div>
                                </div>

                                <div className="flex items-center justify-between p-4">
                                    <div className="text-sm">Phone</div>
                                    <div className="text-sm text-right">{review?.service_center?.phone || 'N/A'}</div>
                                </div>




                            </div>
                        </DefaultCard>
                    </div>
                </div>
                <div className="w-full mt-4">
                    <div className="px-6">
                        <DefaultCard>
                            <div className="divide-y">

                                <div className="flex items-center justify-between p-4">
                                    <h2 className="md:text-lg text-base font-semibold">Appointment</h2>
                                </div>

                                <div className="flex items-center justify-between p-4">
                                    <div className="text-sm">Appointment ID</div>
                                    <div className="text-sm text-right">{review?.service_appointment_id || 'N/A'}</div>
                                </div>

                                <div className="flex items-center justify-between p-4">
                                    <div className="text-sm">Status</div>
                                    <div className="text-sm text-right">{review?.service_appointment?.status || 'N/A'}</div>
                                </div>

                                <div className="flex items-center justify-between p-4">
                                    <div className="text-sm">Date</div>
                                    <div className="text-sm text-right">{formatDate(review?.service_appointment?.date) || 'N/A'}</div>
                                </div>
                                <div className="flex items-center justify-between p-4">
                                    <div className="text-sm">Time</div>
                                    <div className="text-sm text-right">{formatTime(review?.service_appointment?.time) || 'N/A'}</div>
                                </div>




                            </div>
                        </DefaultCard>
                    </div>
                </div>
            </div>
            <EditReviewSheet
                review={review}
                open={isEditSheetOpen}
                onOpenChange={setIsEditSheetOpen}
            />
        </>

    )
}

export default ReviewDetailScreen