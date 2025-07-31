'use client'

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import CustomerGroupTable from "../components/customer-group-table"

export const CustomerGroupScreen = () => {
    return (
        <div className="mx-auto py-4 px-4 w-full">
            <CustomerGroupTable />
        </div>
    )
}