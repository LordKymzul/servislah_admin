"use client";
import { useGetCompanies } from "../../tanstack/company-tanstack";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
    Search,
    MapPin,
    Mail,
    Calendar,
    Building2,
    Clock,
    Phone,
    Star,
    ChevronRight,
    Grid3X3,
    Users,
    Pencil,
    Menu
} from "lucide-react";
import { useState } from "react";
import { CompanyModel } from "@/src/modules/companies/data/entities/model/company-model";
import { ServiceCenterModel } from "@/src/modules/service-centers/data/entities/model/service-center-model";
import DefaultCard from "@/src/core/shared/presentation/components/default-card";
import EditCompanySheet from "../components/edit-company-sheet";
import CompanyServiceCentersTable from "../components/company-service-centers-table";
import LoadingScreen from "@/src/core/shared/presentation/screens/loading-screen";
import { InfoScreenType } from "@/src/core/shared/presentation/screens/info-screen";
import InfoScreen from "@/src/core/shared/presentation/screens/info-screen";

const CompanyScreen = () => {
    const {
        data: companies,
        isLoading,
        isError,
        error
    } = useGetCompanies({});

    if (isLoading) {
        return <LoadingScreen />
    }

    if (isError) {
        return <InfoScreen type={InfoScreenType.ERROR} title="Error" description={error?.message || "Failed to load company"} />
    }

    return (
        <div className="flex flex-col w-full px-8 py-4">

            < div className="w-full" >
                <DefaultCard>
                    {/* Header */}
                    <div className="p-6 border-b flex flex-row items-center justify-between">
                        <div className="flex flex-col items-start gap-1">
                            <h2 className="text-xl font-semibold">Company</h2>
                            <p className="text-sm text-muted-foreground">Manage your store's details</p>
                        </div>

                        <EditCompanySheet company={companies} />

                    </div>

                    {/* Store Details */}
                    <div className="divide-y">
                        {/* Name */}
                        <div className="flex items-center justify-between p-6">
                            <div className="text-sm">Name</div>
                            <div className="text-sm text-right">{companies?.name || 'N/A'}</div>
                        </div>

                        {/* Default currency */}
                        <div className="flex items-center justify-between p-6">
                            <div className="text-sm">Slug</div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">{companies?.slug || 'N/A'}</span>
                            </div>
                        </div>

                        {/* Default region */}
                        <div className="flex items-center justify-between p-6">
                            <div className="text-sm">Description</div>
                            <div className="text-sm">
                                <Badge variant="secondary">{companies?.description || 'N/A'}</Badge>
                            </div>
                        </div>

                        {/* Default sales channel */}
                        <div className="flex items-center justify-between p-6">
                            <div className="text-sm">Email</div>
                            <div className="text-sm">
                                <Badge variant="secondary">{companies?.email || 'N/A'}</Badge>
                            </div>
                        </div>

                        {/* Default location */}
                        <div className="flex items-center justify-between p-6">
                            <div className="text-sm">Company ID</div>
                            <div className="text-sm">
                                <Badge variant="secondary">{companies?.id || 'N/A'}</Badge>
                            </div>
                        </div>
                    </div>

                </DefaultCard>
            </div >

            <div className="w-full mt-4" >
                <DefaultCard>
                    <div className="flex flex-col gap-4 items-start w-full p-4">
                        <div className="flex flex-col">
                            <h1 className="text-lg font-semibold">Service Centers</h1>
                            <p className="text-sm text-muted-foreground">
                                Manage your service centers here
                            </p>
                        </div>
                        <CompanyServiceCentersTable serviceCenters={companies?.service_centers || []} />
                    </div>
                </DefaultCard>
            </div>

        </div >
    );
};

export default CompanyScreen;