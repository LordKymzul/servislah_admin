'use client'

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import VehiclesTable from "../components/vehicles-table"

const VehiclesScreen = () => {
  return (
    <div className="mx-auto py-4 px-4 w-full">

      <VehiclesTable />
    </div>
  )
}

export default VehiclesScreen
