"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Wrench, Plus } from "lucide-react";
import { ServiceBayDataTable } from "../components/service-bay-data-table";
import { useQueryServiceBays } from "../../tanstack/service-bay-tanstack";
import { QueryServiceBayDto } from "../../../data/entities/dto/query-service-bay.dto";

const ServiceBayScreen = () => {
  const [query] = React.useState<QueryServiceBayDto>({});
  const { data: serviceBays, isLoading } = useQueryServiceBays(query);

  return (
    <div className="mx-auto py-4 px-4 w-full">
      <div className="flex md:flex-row flex-col justify-between md:items-center mb-6 gap-4">
        <div className="space-y-2">
          <h1 className="md:text-3xl text-2xl font-bold">Service Bays</h1>
          <p className="text-sm text-muted-foreground font-light">
            Manage service bays, equipment, and their current status
          </p>
        </div>
        <div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Service Bay
          </Button>
        </div>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <ServiceBayDataTable data={serviceBays || []} />
      )}
    </div>
  );
};

export default ServiceBayScreen;
