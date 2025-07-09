"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Building2 } from "lucide-react"
import { ServiceCenterDataTable } from "../components/service-center-data-table"
import { useQueryServiceCenters } from "../../tanstack/service-center-tanstack"

const ServiceCenterScreen = () => {
    const { data: serviceCenters, isLoading } = useQueryServiceCenters()

    return (
        <div className="mx-auto py-4 px-4 w-full">
            <div className="flex md:flex-row flex-col justify-between md:items-center mb-6 gap-4">
                <div className="space-y-2">
                    <h1 className="md:text-3xl text-2xl font-bold">Service Centers</h1>
                    <p className="text-sm text-muted-foreground font-light">
                        Manage your service centers and their operations
                    </p>
                </div>
                <div>
                    <Button>
                        <Building2 className="mr-2 h-4 w-4" />
                        Add New Service Center
                    </Button>
                </div>
            </div>
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
            ) : (
                <ServiceCenterDataTable data={serviceCenters || []} />
            )}
        </div>
    )
}

export default ServiceCenterScreen;