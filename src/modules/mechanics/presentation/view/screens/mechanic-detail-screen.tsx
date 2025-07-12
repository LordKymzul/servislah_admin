"use client"
import { useQueryMechanicById } from "../../tanstack/mechanic-tanstack";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Building2, CalendarDays, Mail, MapPin, Phone, Wrench, Star, Copy, ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import InfoScreen from "@/src/core/shared/presentation/screens/info-screen";
import { InfoScreenType } from "@/src/core/shared/presentation/screens/info-screen";
import { Button } from "@/components/ui/button";

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
                <Card >
                    <div className="flex items-center justify-between p-4">
                        <div className="flex flex-col items-start">
                            <div className="flex items-center gap-2">
                                <h2 className="text-lg font-semibold">#{mechanicId.slice(0, 8)}</h2>
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>

                            <p className="text-sm text-muted-foreground">{formatDate(mechanic.created_at)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-orange-100 text-orange-800 hover:bg-orange-100">
                                Authorized
                            </Badge>
                            <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                                {mechanic.experience_level}
                            </Badge>
                        </div>
                    </div>
                </Card>

                {/* Summary Section */}
                <Card>
                    <CardHeader>
                        <CardTitle>Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-start gap-4">
                            <Avatar className="h-16 w-16">
                                <AvatarFallback className="text-lg">{mechanic.user?.email?.[0].toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <h3 className="font-semibold">{mechanic.user?.email?.split('@')[0]}</h3>
                                <p className="text-sm text-muted-foreground">{mechanic.service_center?.name}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-medium">{mechanic.years_of_exp} years</p>
                                <p className="text-sm text-muted-foreground">Experience</p>
                            </div>
                        </div>

                        <Separator />

                        <div className="space-y-2">
                            <h4 className="font-medium flex items-center gap-2">
                                <Wrench className="h-4 w-4" />
                                Specializations
                            </h4>
                            <div className="space-y-3">
                                {mechanic.specializations?.map((spec) => (
                                    <div key={spec.id} className="flex items-start justify-between p-2 bg-muted rounded-lg">
                                        <div>
                                            <p className="font-medium">{spec.name}</p>
                                            <p className="text-sm text-muted-foreground">{spec.description}</p>
                                        </div>
                                        <Badge variant="secondary">{spec.name}</Badge>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Activity Timeline */}
                <Card>
                    <CardHeader>
                        <CardTitle>Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-2 bg-muted rounded-lg">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-green-500" />
                                    <span>Account Created</span>
                                </div>
                                <span className="text-sm text-muted-foreground">{formatDate(mechanic.created_at)}</span>
                            </div>
                            <div className="flex items-center justify-between p-2 bg-muted rounded-lg">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                                    <span>Last Updated</span>
                                </div>
                                <span className="text-sm text-muted-foreground">{formatDate(mechanic.updated_at)}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Side Panel */}
            <div className="w-full md:w-[400px] space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Email</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium">{mechanic.user?.email}</span>
                                    <Button variant="ghost" size="icon" className="h-6 w-6">
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Status</span>
                                <Badge variant={mechanic.is_active ? "secondary" : "destructive"}>
                                    {mechanic.is_active ? "Active" : "Inactive"}
                                </Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Service Center</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {mechanic.service_center?.image && (
                            <img
                                src={mechanic.service_center.image}
                                alt={mechanic.service_center.name}
                                className="w-full h-32 object-cover rounded-lg"
                            />
                        )}
                        <div className="space-y-2">
                            <h3 className="font-semibold">{mechanic.service_center?.name}</h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Phone className="h-4 w-4" />
                                {mechanic.service_center?.phone}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Mail className="h-4 w-4" />
                                {mechanic.service_center?.email}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default MechanicDetailScreen;