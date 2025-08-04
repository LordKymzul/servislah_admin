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
import { useCreateCustomerGroup, useGetCustomerGroupById, useUpdateCustomerGroup } from "../../tanstack/customer-group-tanstack"
import { CreateCustomerGroupDto } from "../../../data/entities/dto/create-customer-group.dto"
import { Loader2, X } from "lucide-react"
import { useGetCustomers } from "@/src/modules/customers/presentation/tanstack/customer-tanstack"
import CustomerTable from "@/src/modules/customers/presentation/view/components/customer-table"
import { toast } from "sonner"
import { useParams } from "next/navigation"
import { UpdateCustomerGroupDto } from "../../../data/entities/dto/update-customer-group.dto"
import CustomersCustomerGroupTable from "./customers-customer-group-table"

export interface AddCustomersCustomerGroupDialogProps {
    isOpen: boolean
    onClose: () => void
}

const AddCustomersCustomerGroupDialog = ({ isOpen, onClose }: AddCustomersCustomerGroupDialogProps) => {


    const { id } = useParams()
    if (!id) {
        return null
    }

    const { data: customersData, isLoading, isError, error } = useGetCustomers({
        page: 1,
        limit: 100,
    })

    const { data: customerGroup, isLoading: isCustomerGroupLoading, isError: isCustomerGroupError, error: customerGroupError } = useGetCustomerGroupById(id as string)
    const { mutate: updateCustomerGroup, isPending } = useUpdateCustomerGroup(id as string)
    const [selectedCustomers, setSelectedCustomers] = useState<string[]>([])

    useEffect(() => {
        if (customerGroup?.customers) {
            const customerIds = customerGroup.customers.map((customer: any) => customer.id)
            setSelectedCustomers(customerIds)
        }
    }, [customerGroup?.customers])

    const handleSave = () => {
        let data: UpdateCustomerGroupDto = {
            customer_ids: selectedCustomers
        }
        updateCustomerGroup(data, {
            onSuccess: () => {
                toast.success('Customer group updated successfully')
                onClose()
            },
            onError: (error) => {
                toast.error('Failed to update customer group')
            }
        })
    }

    console.log('Current selected customers:', selectedCustomers)

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
                                {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save"}
                            </Button>
                        </div>
                    </DialogTitle>
                </DialogHeader>
                <div className="h-[calc(100vh-200px)] overflow-y-auto">
                    <CustomersCustomerGroupTable
                        enableHeader={false}
                        onSearch={() => { }}
                        onFilterChange={() => { }}
                        onPageChange={() => { }}
                        customers={customersData?.customers || []}
                        totalItems={customersData?.metadata?.total || 0}
                        currentPage={1}
                        itemsPerPage={10}
                        isLoading={isLoading}
                        enableSelection={true}
                        selectedRows={selectedCustomers}
                        onSelectionChange={setSelectedCustomers}
                    />
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default AddCustomersCustomerGroupDialog