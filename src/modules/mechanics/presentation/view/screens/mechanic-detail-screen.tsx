"use client"
import { useDeleteMechanic, useQueryMechanicById } from "../../tanstack/mechanic-tanstack";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Building2, CalendarDays, Mail, MapPin, Phone, Wrench, Star, Copy, ChevronRight, Edit, MoreHorizontal, Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import InfoScreen from "@/src/core/shared/presentation/screens/info-screen";
import { InfoScreenType } from "@/src/core/shared/presentation/screens/info-screen";
import { Button } from "@/components/ui/button";
import DefaultCard from "@/src/core/shared/presentation/components/default-card";
import EditMechanicSheet from "../components/edit-mechanic-sheet";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import DefaultAlertDialog from "@/src/core/shared/presentation/components/default-alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppointmentTable from "@/src/modules/appointments/presentation/view/components/appointment-table";
import CustomerTable from "@/src/modules/customers/presentation/view/components/customer-table";

const MechanicDetailScreen = ({ mechanicId }: { mechanicId: string }) => {
    const { data: mechanic, isLoading, error } = useQueryMechanicById(mechanicId);
    const { mutate: deleteMechanic, isPending: isDeleting } = useDeleteMechanic();
    const [isEditSheetOpen, setIsEditSheetOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [activeTab, setActiveTab] = useState("appointments")
    const router = useRouter();

    if (isLoading) {
        return (
            <div className="space-y-4 p-4">
                <div className="h-12 w-[250px] bg-muted animate-pulse rounded" />
                <div className="grid gap-4">
                    <div className="h-[200px] bg-muted animate-pulse rounded" />
                    <div className="h-[200px] bg-muted animate-pulse rounded" />
                </div>
            </div>
        );
    }

    if (error || !mechanic) {
        return (
            <div className="mx-auto py-4 px-4 w-full">
                <InfoScreen type={InfoScreenType.ERROR} title="Error" description={error?.message} />
            </div>
        );
    }

    const formatDate = (date: Date | string | undefined) => {
        if (!date) return 'N/A';
        const d = new Date(date);
        return d.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const handleDeleteMechanic = () => {
        deleteMechanic(mechanicId, {
            onSettled: () => {
                router.replace("/mechanics");
                setIsDeleteDialogOpen(false)
            },

        });
    }

    return (
        <>
            <div className="flex flex-col gap-4 p-6">

                <DefaultCard>
                    <div className="p-6 border-b">
                        <div className="flex items-center justify-between">
                            <h2 className="md:text-lg text-base font-semibold">Summary</h2>
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
                                    <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
                                        <Trash className="w-4 h-4 mr-2" />
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>

                    <div className="divide-y">
                        <div className="flex items-center justify-between p-6">
                            <div className="text-sm">Email</div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">{mechanic.user?.email}</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-6">
                            <div className="text-sm">Status</div>
                            <div className="text-sm">
                                <Badge variant="secondary">{mechanic.is_active ? "Active" : "Inactive"}</Badge>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-6">
                            <div className="text-sm">Experience Level</div>
                            <div className="text-sm">
                                <Badge variant="secondary">{mechanic.experience_level}</Badge>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-6">
                            <div className="text-sm">Years of Experience</div>
                            <div className="text-sm">{mechanic.years_of_exp}</div>
                        </div>
                    </div>



                </DefaultCard>

                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList>
                        <TabsTrigger value="appointments">Appointments</TabsTrigger>
                        <TabsTrigger value="customers">Customers</TabsTrigger>

                        <TabsTrigger value="reviews">Reviews</TabsTrigger>
                    </TabsList>

                    <TabsContent value="appointments">
                        <AppointmentTable
                            isLoading={isLoading}
                            appointments={mechanic?.appointments || []}
                            totalItems={mechanic?.appointments?.length || 0}
                            currentPage={1}
                            itemsPerPage={10}
                            onSearch={() => { }}
                            onFilterChange={() => { }}
                            onPageChange={() => { }}
                        />
                    </TabsContent>
                    <TabsContent value="customers">
                        <CustomerTable
                            
                            isLoading={isLoading}
                            customers={[]}
                            totalItems={0}
                            currentPage={1}
                            itemsPerPage={10}
                            onSearch={() => { }}
                            onFilterChange={() => { }}
                            onPageChange={() => { }}
                        />
                    </TabsContent>
                    <TabsContent value="reviews">
                        <div>
                            <h1>Reviews</h1>
                        </div>
                    </TabsContent>

                </Tabs>



            </div>
            <EditMechanicSheet
                mechanic={mechanic}
                open={isEditSheetOpen}
                onOpenChange={setIsEditSheetOpen}
            />
            <DefaultAlertDialog
                title="Delete Mechanic"
                description={`Are you sure you want to delete ${mechanic.user?.email}? This action cannot be undone.`}
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
                onConfirm={handleDeleteMechanic}
                loading={isDeleting}
            />
        </>
    );
}

export default MechanicDetailScreen;