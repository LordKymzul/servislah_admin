'use client'

import { useState } from "react"
import DefaultCard from "@/src/core/shared/presentation/components/default-card"
import { Edit, MoreHorizontal, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useQueryMe } from "../../tanstack/user-tanstack"
import EditProfileSheet from "../components/edit-profile-sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const ProfileScreen = () => {
    const { data: user } = useQueryMe()
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false)

    return (
        <div className="flex flex-col gap-4 items-start w-full p-6">
            <div className="w-full">
                <DefaultCard>
                    <div className="divide-y">
                        <div className="flex items-center justify-between p-4">
                            <h2 className="md:text-lg text-base font-semibold">Profile</h2>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem onClick={() => setIsEditProfileOpen(true)}>
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
                            <div className="text-sm">Name</div>
                            <div className="text-sm text-right">{user?.name || 'N/A'}</div>
                        </div>

                        <div className="flex items-center justify-between p-4">
                            <div className="text-sm">Email</div>
                            <div className="text-sm text-right">{user?.email || 'N/A'}</div>
                        </div>

                        <div className="flex items-center justify-between p-4">
                            <div className="text-sm">Role</div>
                            <div className="text-sm text-right">{user?.role || 'N/A'}</div>
                        </div>

                        <div className="flex items-center justify-between p-4">
                            <div className="text-sm">Status</div>
                            <div className="text-sm text-right">{user?.status || 'N/A'}</div>
                        </div>
                    </div>
                </DefaultCard>
            </div>

            {/* Edit Sheet */}
            {isEditProfileOpen && (
                <EditProfileSheet
                    user={user}
                    open={isEditProfileOpen}
                    onOpenChange={setIsEditProfileOpen}
                />
            )}
        </div>
    )
}

export default ProfileScreen