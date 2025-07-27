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

            <MechanicsTable />
        </div>
    )
}

export default MechanicsScreen