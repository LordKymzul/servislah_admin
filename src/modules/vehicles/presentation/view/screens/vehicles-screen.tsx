"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Car, Plus } from "lucide-react";
import { VehiclesDataTable } from "../components/vehicles-data-table";
import { useQueryVehicles } from "../../tanstack/vehicle-tanstack";
import { QueryVehicleDto } from "../../../data/entities/dto/query-vehicle.dto";

const VehiclesScreen = () => {
  const [query] = React.useState<QueryVehicleDto>({});
  const { data: vehicles, isLoading } = useQueryVehicles(query);

  return (
    <div className="mx-auto py-4 px-4 w-full">
      <div className="flex md:flex-row flex-col justify-between md:items-center mb-6 gap-4">
        <div className="space-y-2">
          <h1 className="md:text-3xl text-2xl font-bold">Vehicles</h1>
          <p className="text-sm text-muted-foreground font-light">
            Manage customer vehicles and their service history
          </p>
        </div>
        <div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Vehicle
          </Button>
        </div>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <VehiclesDataTable data={vehicles || []} />
      )}
    </div>
  );
};

export default VehiclesScreen;
