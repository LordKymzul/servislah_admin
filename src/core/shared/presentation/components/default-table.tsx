'use client'

import DefaultCard from "@/src/core/shared/presentation/components/default-card"
import { Plus, Search, SortAsc, MoreHorizontal, Check } from "lucide-react"
import * as React from "react"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
    MenubarSeparator,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
} from "@/components/ui/menubar"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export interface Column {
    header: string
    accessorKey: string
    cell?: (row: any) => React.ReactNode
}

export interface Filter {
    label: string
    value: string
    options?: { label: string; value: string }[]
}

interface DefaultTableProps {
    // Basic props
    title: string
    description: string
    data: any[]
    columns: Column[]

    // Filtering props
    enableFiltering?: boolean
    filters?: Filter[]
    onFilterChange?: (filters: Record<string, string>) => void

    // Search props
    enableSearch?: boolean
    searchPlaceholder?: string
    onSearch?: (searchTerm: string) => void

    // Sorting props
    enableSorting?: boolean
    onSort?: (column: string, direction: 'asc' | 'desc') => void

    // Pagination props
    enablePagination?: boolean
    totalItems?: number
    itemsPerPage?: number
    currentPage?: number
    onPageChange?: (page: number) => void

    // Action props
    rowActions?: {
        label: React.ReactNode
        onClick: (row: any) => void
    }[]
}

const DefaultTable = ({
    title,
    description,
    data,
    columns,
    enableFiltering = true,
    filters = [],
    onFilterChange,
    enableSearch = true,
    searchPlaceholder = "Search...",
    onSearch,
    enableSorting = true,
    onSort,
    enablePagination = true,
    totalItems = 0,
    itemsPerPage = 10,
    currentPage = 1,
    onPageChange,
    rowActions = []
}: DefaultTableProps) => {
    const [searchTerm, setSearchTerm] = React.useState("")
    const [activeFilters, setActiveFilters] = React.useState<Record<string, string>>({})

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearchTerm(value)
        onSearch?.(value)
    }

    const handleFilterChange = (filter: string, value: string) => {
        const newFilters = { ...activeFilters }

        if (newFilters[filter] === value) {
            // If the same value is selected, remove the filter
            delete newFilters[filter]
        } else {
            // Otherwise, set or update the filter
            newFilters[filter] = value
        }

        setActiveFilters(newFilters)
        onFilterChange?.(newFilters)
    }

    const clearFilters = () => {
        setActiveFilters({})
        onFilterChange?.({})
    }

    const totalPages = Math.ceil(totalItems / itemsPerPage)

    return (
        <DefaultCard>
            <div className="flex flex-col h-full">
                <div className="flex flex-col p-6">
                    <h2 className="text-lg font-bold">{title}</h2>
                    <p className="text-sm text-muted-foreground">
                        {description}
                    </p>
                </div>

                {(enableFiltering || enableSearch) && (
                    <div className="flex flex-row items-center w-full justify-between px-6 border-y py-3 gap-2">
                        {enableFiltering && (
                            <div className="flex flex-row items-center gap-2">
                                <div className="flex flex-row items-center gap-2">
                                    <Menubar>
                                        <MenubarMenu>
                                            <MenubarTrigger>
                                                <Plus className="w-4 h-4 mr-2" />
                                                Add Filter
                                            </MenubarTrigger>
                                            <MenubarContent>
                                                {filters.map((filter) => (
                                                    <MenubarSub key={filter.value}>
                                                        <MenubarSubTrigger>
                                                            <span className="flex items-center gap-2">
                                                                {filter.label}
                                                                {activeFilters[filter.value] && (
                                                                    <Check className="w-4 h-4 text-green-500" />
                                                                )}
                                                            </span>
                                                        </MenubarSubTrigger>
                                                        <MenubarSubContent>
                                                            {filter.options ? (
                                                                filter.options.map((option) => (
                                                                    <MenubarItem
                                                                        key={option.value}
                                                                        onClick={() => handleFilterChange(filter.value, option.value)}
                                                                    >
                                                                        <span className="flex items-center gap-2">
                                                                            {option.label}
                                                                            {activeFilters[filter.value] === option.value && (
                                                                                <Check className="w-4 h-4 text-green-500" />
                                                                            )}
                                                                        </span>
                                                                    </MenubarItem>
                                                                ))
                                                            ) : (
                                                                <MenubarItem
                                                                    onClick={() => handleFilterChange(filter.value, 'true')}
                                                                >
                                                                    {filter.label}
                                                                </MenubarItem>
                                                            )}
                                                        </MenubarSubContent>
                                                    </MenubarSub>
                                                ))}
                                                {Object.keys(activeFilters).length > 0 && (
                                                    <>
                                                        <MenubarSeparator />
                                                        <MenubarItem onClick={clearFilters}>
                                                            Clear All Filters
                                                        </MenubarItem>
                                                    </>
                                                )}
                                            </MenubarContent>
                                        </MenubarMenu>
                                    </Menubar>

                                    {Object.entries(activeFilters).map(([key, value]) => {
                                        const filter = filters.find(f => f.value === key)
                                        const option = filter?.options?.find(o => o.value === value)
                                        return (
                                            <Badge
                                                key={key}
                                                variant="outline"
                                                className="gap-2"
                                            >
                                                {filter?.label}: {option?.label || value}
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-4 w-4 p-0 hover:bg-transparent"
                                                    onClick={() => handleFilterChange(key, value)}
                                                >
                                                    ×
                                                </Button>
                                            </Badge>
                                        )
                                    })}
                                </div>
                            </div>
                        )}

                        {enableSearch && (
                            <div className="flex flex-row items-center gap-2">
                                <Input
                                    placeholder={searchPlaceholder}
                                    value={searchTerm}
                                    onChange={handleSearch}
                                />
                                {enableSorting && (
                                    <Button variant="outline" size="icon">
                                        <SortAsc className="w-4 h-4" />
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>
                )}

                <div className="flex-1 overflow-auto">
                    <Table>
                        <TableHeader className="bg-foreground/2">
                            <TableRow>
                                {columns.map((column, index) => (
                                    <TableHead
                                        key={column.accessorKey}
                                        className={index === 0 ? "px-6" : "py-3"}
                                    >
                                        {column.header}
                                    </TableHead>
                                ))}
                                {rowActions.length > 0 && (
                                    <TableHead className="w-12"></TableHead>
                                )}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((row, rowIndex) => (
                                <TableRow key={rowIndex}>
                                    {columns.map((column, colIndex) => (
                                        <TableCell
                                            key={`${rowIndex}-${column.accessorKey}`}
                                            className={colIndex === 0 ? "px-6 py-3" : "py-3"}
                                        >
                                            {column.cell
                                                ? column.cell(row)
                                                : row[column.accessorKey]}
                                        </TableCell>
                                    ))}
                                    {rowActions.length > 0 && (
                                        <TableCell className="py-3">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        className="h-8 w-8 p-0"
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    {rowActions.map((action, actionIndex) => (
                                                        <DropdownMenuItem
                                                            key={actionIndex}
                                                            onClick={() => action.onClick(row)}
                                                        >
                                                            {action.label}
                                                        </DropdownMenuItem>
                                                    ))}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>

                        {enablePagination && (
                            <TableFooter>
                                <TableRow className="border-t bg-foreground/2">
                                    <TableCell colSpan={columns.length + (rowActions.length > 0 ? 1 : 0)} className="px-6 py-4">
                                        <div className="flex items-center justify-between">
                                            <div className="text-sm text-gray-600">
                                                {`${(currentPage - 1) * itemsPerPage + 1} — ${Math.min(currentPage * itemsPerPage, totalItems)} of ${totalItems} results`}
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="text-sm text-gray-600">
                                                    {`${currentPage} of ${totalPages} pages`}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="outline"
                                                        className="text-sm px-3 py-1.5"
                                                        onClick={() => onPageChange?.(currentPage - 1)}
                                                        disabled={currentPage <= 1}
                                                    >
                                                        Prev
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        className="text-sm px-3 py-1.5"
                                                        onClick={() => onPageChange?.(currentPage + 1)}
                                                        disabled={currentPage >= totalPages}
                                                    >
                                                        Next
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            </TableFooter>
                        )}
                    </Table>
                </div>
            </div>
        </DefaultCard>
    )
}

export default DefaultTable