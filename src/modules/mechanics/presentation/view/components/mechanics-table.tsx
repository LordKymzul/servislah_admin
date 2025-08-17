'use client'

import DefaultTable from "@/src/core/shared/presentation/components/default-table"
import { MechanicModel, MechanicResponseModel } from "@/src/modules/mechanics/data/entities/model/mechanic-model"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Eye, FileDown, Plus, Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useDeleteMechanic } from "../../tanstack/mechanic-tanstack"
import CreateMechanicDialog from "./create-mechanic-dialog"
import DefaultAlertDialog from "@/src/core/shared/presentation/components/default-alert-dialog"

interface MechanicsTableProps {
    mechanics: MechanicResponseModel | undefined
    currentPage: number
    itemsPerPage: number
    isLoading: boolean
    onSearch: (term: string) => void
    onFilterChange: (filters: Record<string, string>) => void
    onPageChange: (page: number) => void
    clearFilters: () => void
}

const MechanicsTable = ({
    mechanics,
    currentPage,
    itemsPerPage,
    isLoading,
    onSearch,
    onFilterChange,
    onPageChange,
    clearFilters,
}: MechanicsTableProps) => {
    const router = useRouter()
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [selectedMechanic, setSelectedMechanic] = useState<MechanicModel | null>(null)
    const { mutate: deleteMechanic, isPending } = useDeleteMechanic()

    const columns = [
        {
            header: "Name",
            accessorKey: "name",
            cell: (row: MechanicModel) => (
                <div>
                    <div className="font-medium">{row.user?.name || "N/A"}</div>
                    <div className="text-sm text-muted-foreground">{row.user?.email || "N/A"}</div>
                </div>
            )
        },
        {
            header: "Experience Level",
            accessorKey: "experience_level",
            cell: (row: MechanicModel) => (
                <Badge variant={
                    row.experience_level === "EXPERT" ? "default" :
                        row.experience_level === "INTERMEDIATE" ? "secondary" : "outline"
                }>
                    {row.experience_level ? row.experience_level.charAt(0) + row.experience_level.slice(1).toLowerCase() : 'N/A'}
                </Badge>
            ),
        },
        {
            header: "Years of Experience",
            accessorKey: "years_of_exp",
            cell: (row: MechanicModel) => (
                <span>{row.years_of_exp} {row.years_of_exp === 1 ? 'year' : 'years'}</span>
            ),
        },
        {
            header: "Service Center",
            accessorKey: "service_center.name",
            cell: (row: MechanicModel) => (
                <div className="text-sm">{row.service_center?.name || 'N/A'}</div>
            ),
        },
        {
            header: "Status",
            accessorKey: "is_active",
            cell: (row: MechanicModel) => (
                <Badge variant={row.is_active ? "default" : "destructive"}>
                    {row.is_active ? "Active" : "Inactive"}
                </Badge>
            ),
        },
    ]

    const filters = [
        {
            label: "Experience Level",
            value: "experience_level",
            options: [
                { label: "Beginner", value: "BEGINNER" },
                { label: "Intermediate", value: "INTERMEDIATE" },
                { label: "Expert", value: "EXPERT" }
            ]
        },
        {
            label: "Status",
            value: "is_active",
            options: [
                { label: "Active", value: "true" },
                { label: "Inactive", value: "false" }
            ]
        },
        {
            label: "Years of Experience",
            value: "years_of_exp",
            options: [
                { label: "1+ years", value: "1" },
                { label: "2+ years", value: "2" },
                { label: "3+ years", value: "3" },
                { label: "5+ years", value: "5" },
                { label: "10+ years", value: "10" }
            ]
        }
    ]

    const handleDeleteMechanic = (mechanic: MechanicModel) => {
        setSelectedMechanic(mechanic)
        setIsDeleteDialogOpen(true)
    }

    const handleConfirmDelete = () => {
        if (selectedMechanic?.id) {
            deleteMechanic(selectedMechanic.id, {
                onSettled: () => {
                    setIsDeleteDialogOpen(false)
                    setSelectedMechanic(null)
                }
            })
        }
    }

    return (
        <>
            <DefaultTable
                title="Mechanics"
                description="Manage your mechanics and their assignments"
                data={mechanics?.mechanics || []}
                headerActions={[
                    {
                        label: <Button
                            onClick={() => console.log("Export")}
                            variant="outline"
                            size="sm">
                            <FileDown className="w-4 h-4 mr-1" />
                            Export
                        </Button>,
                        onClick: () => console.log("Export clicked")
                    },
                    {
                        label: <Button
                            onClick={() => setIsCreateDialogOpen(true)}
                            variant="outline"
                            size="sm">
                            <Plus className="w-4 h-4 mr-1" />
                            Add New
                        </Button>,
                        onClick: () => setIsCreateDialogOpen(true)
                    }
                ]}
                columns={columns}
                filters={filters}
                enableFiltering={true}
                enableSearch={true}
                enableSorting={true}
                searchPlaceholder="Search mechanics..."
                onSearch={onSearch}
                onFilterChange={onFilterChange}
                enablePagination={true}
                totalItems={mechanics?.metadata?.total || 0}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={onPageChange}
                isLoading={isLoading}
                clearFilters={clearFilters}
                rowActions={[
                    {
                        label: (
                            <div className="flex items-center gap-2">
                                <Eye className="h-4 w-4" />
                                <span>View Details</span>
                            </div>
                        ),
                        onClick: (row) => {
                            router.push(`/mechanics/${row.id}`)
                        }
                    },
                    {
                        label: (
                            <div className="flex items-center gap-2">
                                <Trash className="h-4 w-4" />
                                <span>Delete</span>
                            </div>
                        ),
                        onClick: (row) => {
                            handleDeleteMechanic(row)
                        }
                    }
                ]}
            />

            <CreateMechanicDialog
                open={isCreateDialogOpen}
                onOpenChange={setIsCreateDialogOpen}
            />

            <DefaultAlertDialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
                title="Delete Mechanic"
                description={`Are you sure you want to delete ${selectedMechanic?.user?.name || 'this mechanic'}? This action cannot be undone.`}
                confirmText="Delete"
                cancelText="Cancel"
                onConfirm={handleConfirmDelete}
                loading={isPending}
            />
        </>
    )
}

export default MechanicsTable