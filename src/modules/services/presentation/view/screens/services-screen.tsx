"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Wrench } from "lucide-react"
import ServicesDataTable from "../components/services-data-table"
import { useQueryServices } from "../../tanstack/service-tanstack"

const ServicesScreen = () => {
    const { data: services, isLoading } = useQueryServices({})

    return (
        <div className="mx-auto py-4 px-4 w-full">
            <div className="flex md:flex-row flex-col justify-between md:items-center mb-6 gap-4">
                <div className="space-y-2">
                    <h1 className="md:text-3xl text-2xl font-bold">Services</h1>
                    <p className="text-sm text-muted-foreground font-light">
                        Manage your service offerings and pricing
                    </p>
                </div>
                <div>
                    <Button>
                        <Wrench className="mr-2 h-4 w-4" />
                        Add New Service
                    </Button>
                </div>
            </div>
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
            ) : (
                <ServicesDataTable data={services || []} />
            )}
        </div>
    )
}

export default ServicesScreen;