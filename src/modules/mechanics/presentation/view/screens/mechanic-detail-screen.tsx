"use client"
import { useQueryMechanicById } from "../../tanstack/mechanic-tanstack";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Building2, CalendarDays, Mail, MapPin, Phone, Wrench, Star, Copy, ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import InfoScreen from "@/src/core/shared/presentation/screens/info-screen";
import { InfoScreenType } from "@/src/core/shared/presentation/screens/info-screen";
import { Button } from "@/components/ui/button";
import DefaultCard from "@/src/core/shared/presentation/components/default-card";

const MechanicDetailScreen = ({ mechanicId }: { mechanicId: string }) => {
    const { data: mechanic, isLoading, error } = useQueryMechanicById(mechanicId);

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

    return (
        <div className="flex flex-col md:flex-row gap-6 p-4">
            {/* Main Content */}
            <div className="flex-1 space-y-6">
                {/* Header */}
                <DefaultCard>


                    <div className="p-6 flex items-center justify-between">
                        <div className="flex flex-col items-start">
                            <div className="flex items-center gap-2">
                                <h2 className="text-lg font-medium">#{mechanicId.slice(0, 8)}</h2>
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>
                            <p className="text-sm">{formatDate(mechanic.created_at)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge variant="outline">Authorized</Badge>
                            <Badge variant="outline">{mechanic.experience_level}</Badge>
                        </div>
                    </div>
                </DefaultCard>

                {/* Summary Section */}
                <DefaultCard>
                    <div className="p-6 border-b">
                        <h3 className="text-lg font-medium">Summary</h3>
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
                            <div className="text-sm">Profile</div>
                            <Avatar className="h-10 w-10">
                                <AvatarFallback className="text-lg">{mechanic.user?.email?.[0].toUpperCase()}</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>



                </DefaultCard>

                <DefaultCard>
                    <div className="p-6 border-b">
                        <h3 className="text-lg font-medium">Specializations</h3>
                    </div>

                    <div className="divide-y">
                        {mechanic.specializations?.map((spec) => (
                            <div key={spec.id} className="flex items-center justify-between p-6">
                                <div className="text-sm">{spec.name}</div>
                                <div className="text-sm">
                                    <Badge variant="secondary">{spec.description}</Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                </DefaultCard>

                {/* Activity Timeline */}
                <DefaultCard>
                    <div className="p-6 border-b">
                        <h3 className="text-lg font-medium">Activity</h3>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-2 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-green-500" />
                                    <span>Account Created</span>
                                </div>
                                <span className="text-sm">{formatDate(mechanic.created_at)}</span>
                            </div>
                            <div className="flex items-center justify-between p-2 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                                    <span>Last Updated</span>
                                </div>
                                <span className="text-sm">{formatDate(mechanic.updated_at)}</span>
                            </div>
                        </div>
                    </div>
                </DefaultCard>
            </div >

            {/* Side Panel */}
            < div className="w-full md:w-[400px] space-y-6" >
                <DefaultCard>
                    <div className="p-6 border-b">
                        <h3 className="text-lg font-medium">Contact Information</h3>
                    </div>

                    <div className="divide-y">
                        <div className="flex items-center justify-between p-6">
                            <div className="text-sm">Email</div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">{mechanic.user?.email}</span>
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-6">
                            <div className="text-sm">Status</div>
                            <div className="text-sm">
                                <Badge variant="secondary">{mechanic.is_active ? "Active" : "Inactive"}</Badge>
                            </div>
                        </div>

                    </div>

                </DefaultCard>

                <DefaultCard>
                    <div className="p-6 border-b">
                        <h3 className="text-lg font-medium">Service Center</h3>
                    </div>
                    <div className="p-6 space-y-4">
                        {mechanic.service_center?.image && (
                            <img
                                src={mechanic.service_center.image}
                                alt={mechanic.service_center.name}
                                className="w-full h-32 object-cover rounded-lg"
                            />
                        )}
                        <div className="space-y-2">
                            <h3 className="font-medium">{mechanic.service_center?.name}</h3>
                            <div className="flex items-center gap-2 text-sm">
                                <Phone className="h-4 w-4" />
                                {mechanic.service_center?.phone}
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <Mail className="h-4 w-4" />
                                {mechanic.service_center?.email}
                            </div>
                        </div>
                    </div>
                </DefaultCard>
            </div >
        </div >
    );
}

export default MechanicDetailScreen;