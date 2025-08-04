'use client'

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"

import { Loader2, X } from "lucide-react"
import { useGetCustomerById, useGetCustomers } from "@/src/modules/customers/presentation/tanstack/customer-tanstack"
import CustomerTable from "@/src/modules/customers/presentation/view/components/customer-table"
import { toast } from "sonner"
import { useParams } from "next/navigation"
import { useGetCustomerGroups } from "@/src/modules/customer_groups/presentation/tanstack/customer-group-tanstack"
import CustomerGroupCustomersTable from "./customer-group-customers-table"

export interface AddCustomerGroupCustomerDialogProps {
    isOpen: boolean
    onClose: () => void
}

const AddCustomerGroupCustomerDialog = ({ isOpen, onClose }: AddCustomerGroupCustomerDialogProps) => {


    const { id } = useParams()
    if (!id) {
        return null
    }

    const { data: customerGroups, isLoading: isCustomerGroupsLoading } = useGetCustomerGroups({
        page: 1,
        limit: 100,
    })


    const { data: customer, isLoading: isCustomerLoading } = useGetCustomerById(id as string)

    const [selectedCustomerGroups, setSelectedCustomerGroups] = useState<string[]>([])

    useEffect(() => {
        if (customer?.customer_groups) {
            const customerGroupIds = customer.customer_groups.map((customerGroup: any) => customerGroup.id)
            setSelectedCustomerGroups(customerGroupIds)
        }
    }, [customer?.customer_groups])



    const handleSave = () => {

    }


    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-[calc(100vw-32px)] md:max-w-[80%] lg:max-w-[70%] xl:max-w-[60%] px-0 pt-0 overflow-hidden p-4 rounded-lg">
                <DialogHeader >
                    <DialogTitle>
                        <div className="flex flex-row items-center justify-start gap-2">
                            <Button variant="outline" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button


                                variant="default" onClick={handleSave}>
                                {/* {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save"} */}
                            </Button>
                        </div>
                    </DialogTitle>
                </DialogHeader>
                <div className="h-[calc(100vh-200px)] overflow-y-auto">
                    <CustomerGroupCustomersTable
                        enableHeader={false}
                        onSearch={() => { }}
                        onFilterChange={() => { }}
                        onPageChange={() => { }}
                        customerGroups={customerGroups?.customer_groups || []}
                        totalItems={customerGroups?.metadata?.total || 0}
                        currentPage={1}
                        itemsPerPage={10}
                        isLoading={isCustomerGroupsLoading}
                        enableSelection={true}
                        selectedRows={selectedCustomerGroups}
                        onSelectionChange={setSelectedCustomerGroups}
                    />
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default AddCustomerGroupCustomerDialog