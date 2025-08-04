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
import { useState } from "react"
import { useCreateCustomerGroup } from "../../tanstack/customer-group-tanstack"
import { CreateCustomerGroupDto } from "../../../data/entities/dto/create-customer-group.dto"
import { Loader2 } from "lucide-react"

export interface AddCustomerGroupDialogProps {
    isOpen: boolean
    onClose: () => void
}

const AddCustomerGroupDialog = ({ isOpen, onClose }: AddCustomerGroupDialogProps) => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")

    const { mutate: createCustomerGroup, isPending } = useCreateCustomerGroup()


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        let data: CreateCustomerGroupDto = {
            name: name,
            description: description ?? "-",
            is_active: true,
            customer_ids: []
        }
        createCustomerGroup(data)
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Customer Group</DialogTitle>
                    <DialogDescription>
                        Create a new customer group to segment your customers.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Customer group name"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Input
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Customer group name"
                            />
                        </div>
                    </div>
                </form>
                <DialogFooter>
                    <div className="flex items-center justify-end gap-2">
                        <Button variant="outline" type="button" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            disabled={isPending}
                            type="submit" onClick={handleSubmit}>
                            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create"}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AddCustomerGroupDialog