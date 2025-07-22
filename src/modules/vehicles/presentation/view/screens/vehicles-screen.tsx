'use client'

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import VehiclesTable from "../components/vehicles-table"

const VehiclesScreen = () => {
  return (
    <div className="mx-auto py-4 px-4 w-full">
      <div className="flex md:flex-row flex-col justify-between md:items-center mb-6 gap-4">
        <div className="space-y-2">
          <h1 className="md:text-3xl text-2xl font-bold">Vehicles</h1>
          <p className="text-sm text-muted-foreground font-light">
            Manage all vehicles in the system
          </p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Vehicle
          </Button>
        </div>
      </div>
      <VehiclesTable />
    </div>
  )
}

export default VehiclesScreen
