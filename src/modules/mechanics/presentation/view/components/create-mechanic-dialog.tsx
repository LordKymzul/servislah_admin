'use client'

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Loader2, X } from "lucide-react";
import { useCreateMechanic } from "../../tanstack/mechanic-tanstack";
import { useQueryServiceCenters } from "@/src/modules/service-centers/presentation/tanstack/service-center-tanstack";
import { useQueryUsers } from "@/src/modules/users/presentation/tanstack/user-tanstack";
import { useQuerySpecializations } from "@/src/modules/specialization/presentation/tanstack/specialization-tanstack";
import { useState } from "react";
import { cn } from "@/lib/utils";

export interface CreateMechanicDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

const CreateMechanicDialog = ({ open, onOpenChange }: CreateMechanicDialogProps) => {
    const [page, setPage] = useState(1)
    const { mutate: createMechanic, isPending } = useCreateMechanic()
    const { data: serviceCenters, isLoading: isLoadingServiceCenters } = useQueryServiceCenters({

    })

    const selectedServiceCenter = serviceCenters?.[0]
    const [selectedServiceCenterID, setSelectedServiceCenterID] = useState<string | null>(selectedServiceCenter?.id || null)
    const [selectedUserID, setSelectedUserID] = useState<string>("")
    const [experienceLevel, setExperienceLevel] = useState<string>("")
    const [yearsOfExp, setYearsOfExp] = useState<string>("")
    const [selectedSpecializations, setSelectedSpecializations] = useState<string[]>([])

    const { data: users, isLoading: isLoadingUsers } = useQueryUsers({
        page,
        limit: 10
    })

    const { data: specializations, isLoading: isLoadingSpecializations } = useQuerySpecializations({
        page,
        limit: 100,
        service_center_id: selectedServiceCenterID || undefined
    })

    const handleSubmit = () => {
        if (!selectedServiceCenterID || !selectedUserID || !experienceLevel || !yearsOfExp || selectedSpecializations.length === 0) {
            return
        }

        createMechanic({
            service_center_id: selectedServiceCenterID,
            user_id: selectedUserID,
            experience_level: experienceLevel,
            years_of_exp: parseInt(yearsOfExp),
            specialization_ids: selectedSpecializations
        }, {
            onSettled: () => {
                onOpenChange(false)
                setSelectedServiceCenterID(null)
                setSelectedUserID("")
                setExperienceLevel("")
                setYearsOfExp("")
                setSelectedSpecializations([])
            }
        })
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-[calc(100vw-32px)] md:max-w-[80%] lg:max-w-[70%] xl:max-w-[60%] px-0 pt-0 overflow-hidden p-4 rounded-lg">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold tracking-tight">Create Mechanic</DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                        Add a new mechanic to your service center.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="service-center">Service Center</Label>
                        <Select
                            value={selectedServiceCenterID || ""}
                            onValueChange={setSelectedServiceCenterID}
                            disabled={isLoadingServiceCenters}
                        >
                            <SelectTrigger id="service-center" className="w-full">
                                <SelectValue placeholder="Select service center" />
                            </SelectTrigger>
                            <SelectContent>
                                {serviceCenters?.map((center) => (
                                    <SelectItem key={center.id} value={center.id || ""}>
                                        {center.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="user">User</Label>
                        <Select
                            value={selectedUserID}
                            onValueChange={setSelectedUserID}
                            disabled={isLoadingUsers}
                        >
                            <SelectTrigger id="user" className="w-full">
                                <SelectValue placeholder="Select user" />
                            </SelectTrigger>
                            <SelectContent>
                                {users?.users.filter((user) => user.role === "USER")?.map((user) => (
                                    <SelectItem key={user.id} value={user.id || ""}>
                                        {user.email}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="experience">Experience Level</Label>
                        <Select
                            value={experienceLevel}
                            onValueChange={setExperienceLevel}
                        >
                            <SelectTrigger id="experience" className="w-full">
                                <SelectValue placeholder="Select experience level" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="BEGINNER">Beginner</SelectItem>
                                <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
                                <SelectItem value="EXPERT">Expert</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="years">Years of Experience</Label>
                        <Input
                            id="years"
                            type="number"
                            min="0"
                            placeholder="Enter years of experience"
                            value={yearsOfExp}
                            onChange={(e) => setYearsOfExp(e.target.value)}
                            className="w-full"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="specializations">Specializations</Label>
                        <div className="border rounded-md">
                            <ScrollArea className="h-[200px] p-4">
                                <div className="space-y-4">
                                    {isLoadingSpecializations ? (
                                        <div className="flex items-center justify-center h-full">
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        </div>
                                    ) : (
                                        <>
                                            {specializations?.specializations?.map((spec) => (
                                                <div key={spec.id} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={spec.id}
                                                        checked={selectedSpecializations.includes(spec.id || "")}
                                                        onCheckedChange={(checked) => {
                                                            if (checked) {
                                                                setSelectedSpecializations((prev) => [...prev, spec.id || ""])
                                                            } else {
                                                                setSelectedSpecializations((prev) =>
                                                                    prev.filter((id) => id !== spec.id)
                                                                )
                                                            }
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor={spec.id}
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    >
                                                        {spec.name}
                                                    </label>
                                                </div>
                                            ))}
                                        </>
                                    )}
                                </div>
                            </ScrollArea>
                            {selectedSpecializations.length > 0 && (
                                <div className="p-2 border-t flex flex-wrap gap-1">
                                    {selectedSpecializations.map((specId) => {
                                        const spec = specializations?.specializations?.find(s => s.id === specId)
                                        if (!spec) return null
                                        return (
                                            <Badge
                                                key={specId}
                                                variant="secondary"
                                                className="flex items-center gap-1"
                                            >
                                                {spec.name}
                                                <button
                                                    onClick={() => setSelectedSpecializations(prev =>
                                                        prev.filter(id => id !== specId)
                                                    )}
                                                    className="hover:bg-muted rounded-full p-0.5"
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </Badge>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        onClick={handleSubmit}
                        className="w-full sm:w-auto"
                        disabled={isPending || !selectedServiceCenterID || !selectedUserID || !experienceLevel || !yearsOfExp || selectedSpecializations.length === 0}
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                <span>Creating...</span>
                            </>
                        ) : (
                            'Create Mechanic'
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CreateMechanicDialog