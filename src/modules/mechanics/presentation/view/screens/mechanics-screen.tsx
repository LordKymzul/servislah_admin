"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Wrench } from "lucide-react"
import MechanicsTable from "../components/mechanics-table"
import { InfoScreenType } from "@/src/core/shared/presentation/screens/info-screen"
import InfoScreen from "@/src/core/shared/presentation/screens/info-screen"
import LoadingScreen from "@/src/core/shared/presentation/screens/loading-screen"
import { useQueryMechanics } from "../../tanstack/mechanic-tanstack"

const MechanicsScreen = () => {
    const { isLoading, isError, error } = useQueryMechanics({
        page: 1,
        limit: 10
    })

    if (isLoading) {
        return <LoadingScreen />
    }

    if (isError) {
        return (
            <div className="mx-auto py-4 px-4 w-full">
                <InfoScreen type={InfoScreenType.ERROR} title="Error" description={error?.message} />
            </div>
        )
    }

    return (
        <div className="mx-auto py-4 px-4 w-full">
            <div className="flex md:flex-row flex-col justify-between md:items-center mb-6 gap-4">
                <div className="space-y-2">
                    <h1 className="md:text-3xl text-2xl font-bold">Mechanics</h1>
                    <p className="text-sm text-muted-foreground font-light">
                        Manage your mechanics and their assignments
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button>
                        <Wrench className="mr-2 h-4 w-4" />
                        Add New Mechanic
                    </Button>
                </div>
            </div>
            <MechanicsTable />
        </div>
    )
}

export default MechanicsScreen