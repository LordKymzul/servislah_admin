"use client"
import LoadingScreen from "@/src/core/shared/presentation/screens/loading-screen";
import { useQueryMe, useQueryUserById } from "../../tanstack/user-tanstack"
import InfoScreen, { InfoScreenType } from "@/src/core/shared/presentation/screens/info-screen";
import DefaultCard from "@/src/core/shared/presentation/components/default-card";
import { useState } from "react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Edit, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import EditProfileSheet from "../components/edit-profile-sheet";

const ProfileScreen = () => {
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
    const {
        data: user,
        isLoading,
        isError,
        error
    } = useQueryMe();

    if (isLoading) return <LoadingScreen />
    if (isError) return <InfoScreen type={InfoScreenType.ERROR} title="Error" description={error.message} />

    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="p-6">
                <DefaultCard>
                    <div className="p-6 border-b flex flex-col md:flex-row md:items-center  items-start gap-2 justify-between">
                        <div className="flex flex-col items-start">
                            <h2 className="text-xl font-semibold">Profile</h2>
                            <p className="text-sm text-muted-foreground">
                                Manage your profile information
                            </p>
                        </div>



                        <EditProfileSheet
                            user={user}
                            open={isEditProfileOpen}
                            onOpenChange={setIsEditProfileOpen}
                            trigger={
                                <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="w-4 h-4" />
                                </Button>
                            }
                        />
                    </div>

                    <div className="divide-y">
                        <div className="flex items-center justify-between p-6">
                            <div className="text-sm">Name</div>
                            <div className="text-sm text-right">{user?.name || 'N/A'}</div>
                        </div>

                        <div className="flex items-center justify-between p-6">
                            <div className="text-sm">Email</div>
                            <div className="text-sm text-right">{user?.email || 'N/A'}</div>
                        </div>

                        <div className="flex items-center justify-between p-6">
                            <div className="text-sm">Role</div>
                            <div className="text-sm text-right">{user?.role || 'N/A'}</div>
                        </div>

                        <div className="flex items-center justify-between p-6">
                            <div className="text-sm">Status</div>
                            <div className="text-sm text-right">{user?.status || 'N/A'}</div>
                        </div>
                    </div>
                </DefaultCard>
            </div>
        </div>
    )
}

export default ProfileScreen