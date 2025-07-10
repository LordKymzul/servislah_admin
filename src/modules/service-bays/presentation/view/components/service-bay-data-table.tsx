"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  Wrench,
  Car,
  MapPin,
  Calendar,
  UserPlus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ServiceBayModel } from "../../../data/entities/model/service-bay-model";
import { AssignAppointmentDialog } from "./assign-appointment-dialog";

interface ServiceBayDataTableProps {
  data: ServiceBayModel[];
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "AVAILABLE":
      return "bg-green-100 text-green-800 hover:bg-green-200";
    case "OCCUPIED":
      return "bg-blue-100 text-blue-800 hover:bg-blue-200";
    case "MAINTENANCE":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
    case "OUT_OF_SERVICE":
      return "bg-red-100 text-red-800 hover:bg-red-200";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200";
  }
};

const columns: ColumnDef<ServiceBayModel>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Service Bay
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      const bayNumber = row.original.bay_number;
      const serviceCenter = row.original.service_center;
      return (
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Wrench className="h-5 w-5 text-primary" />
          </div>
          <div>
            <div className="font-medium">{name}</div>
            <div className="text-sm text-muted-foreground">
              Bay {bayNumber} • {serviceCenter?.name}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const serviceBay = row.original;

      return (
        <div className="flex items-center gap-2">
          <Badge className={getStatusColor(status)}>
            {status.replace("_", " ")}
          </Badge>
          {status === "AVAILABLE" && (
            <AssignAppointmentDialog
              serviceBay={serviceBay}
              trigger={
                <Button variant="outline" size="sm" className="ml-2">
                  <Calendar className="mr-1 h-3 w-3" />
                  Assign
                </Button>
              }
              onAssign={(appointmentData) => {
                console.log("Assigning appointment:", appointmentData);
                // Here you would typically call an API to assign the appointment
                // For now, we'll just log it
              }}
            />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "current_vehicle",
    header: "Current Vehicle",
    cell: ({ row }) => {
      const vehicle = row.getValue(
        "current_vehicle"
      ) as ServiceBayModel["current_vehicle"];
      if (!vehicle) {
        return <span className="text-muted-foreground">No vehicle</span>;
      }
      return (
        <div className="flex items-center gap-2">
          <Car className="h-4 w-4 text-muted-foreground" />
          <div>
            <div className="font-medium">
              {vehicle.make} {vehicle.model}
            </div>
            <div className="text-sm text-muted-foreground">
              {vehicle.license_plate} • {vehicle.owner_name}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "capacity",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Capacity
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const capacity = row.getValue("capacity") as number;
      return <div className="text-center">{capacity}</div>;
    },
  },
  {
    accessorKey: "hourly_rate",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Hourly Rate
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const rate = row.getValue("hourly_rate") as number;
      return <div className="font-medium">RM {rate?.toFixed(2)}</div>;
    },
  },
  {
    accessorKey: "specializations",
    header: "Specializations",
    cell: ({ row }) => {
      const specializations = row.getValue("specializations") as string[];
      if (!specializations || specializations.length === 0) {
        return <span className="text-muted-foreground">None</span>;
      }
      return (
        <div className="flex flex-wrap gap-1">
          {specializations.slice(0, 2).map((spec, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {spec}
            </Badge>
          ))}
          {specializations.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{specializations.length - 2} more
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "total_services_completed",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Services
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const total = row.getValue("total_services_completed") as number;
      return <div className="text-center font-medium">{total}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const serviceBay = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(serviceBay.id || "")}
            >
              Copy service bay ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Edit service bay</DropdownMenuItem>
            <DropdownMenuItem>View equipment</DropdownMenuItem>
            {serviceBay.status === "AVAILABLE" && (
              <>
                <DropdownMenuSeparator />
                <AssignAppointmentDialog
                  serviceBay={serviceBay}
                  trigger={
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Assign appointment
                    </DropdownMenuItem>
                  }
                  onAssign={(appointmentData) => {
                    console.log("Assigning appointment:", appointmentData);
                    // Here you would typically call an API to assign the appointment
                  }}
                />
              </>
            )}
            {serviceBay.status === "OCCUPIED" && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Complete service</DropdownMenuItem>
                <DropdownMenuItem>View appointment</DropdownMenuItem>
              </>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              Delete service bay
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function ServiceBayDataTable({ data }: ServiceBayDataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter service bays..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No service bays found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
