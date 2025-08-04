
'use client'

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useEffect, useState } from "react"
import { Loader2, X } from "lucide-react"
import { toast } from "sonner"
import { useCreateOperatingHours } from "../../tanstack/operating-hours-tanstack"
import { CreateOperatingHoursDto } from "../../../data/entities/dto/create-operating-hours.dto"

export interface AddOperatingHoursDialogProps {
    service_center_id: string
    isOpen: boolean
    onClose: () => void
}

const AddOperatingHoursDialog = ({ service_center_id, isOpen, onClose }: AddOperatingHoursDialogProps) => {
    const [day, setDay] = useState<string>("")
    const [openTime, setOpenTime] = useState<string>("")
    const [closeTime, setCloseTime] = useState<string>("")
    const [isActive, setIsActive] = useState<boolean>(true)

    const { mutate: createOperatingHours, isPending } = useCreateOperatingHours()


   

    const handleSubmit = () => {
        let data: CreateOperatingHoursDto = {
            service_center_id,
            day: parseInt(day),
            open_time: openTime,
            close_time: closeTime,
            is_active: isActive
        }

        createOperatingHours(data, {
            onSettled: () => {
                onClose()
            }
        })
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Operating Hours</DialogTitle>
                    <DialogDescription>
                        Set the operating hours for this service center.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="day">Day</Label>
                        <Select value={day} onValueChange={setDay}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Day" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">Monday</SelectItem>
                                <SelectItem value="2">Tuesday</SelectItem>
                                <SelectItem value="3">Wednesday</SelectItem>
                                <SelectItem value="4">Thursday</SelectItem>
                                <SelectItem value="5">Friday</SelectItem>
                                <SelectItem value="6">Saturday</SelectItem>
                                <SelectItem value="7">Sunday</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="openTime">Opening Time</Label>
                        <Input
                            id="openTime"
                            type="time"
                            value={openTime}
                            onChange={(e) => setOpenTime(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="closeTime">Closing Time</Label>
                        <Input
                            id="closeTime"
                            type="time"
                            value={closeTime}
                            onChange={(e) => setCloseTime(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <Label htmlFor="isActive">Active</Label>
                        <Switch
                            id="isActive"
                            checked={isActive}
                            onCheckedChange={setIsActive}
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button
                        disabled={isPending}
                        onClick={handleSubmit}
                    >
                        {isPending ? "Creating..." : "Create"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AddOperatingHoursDialog