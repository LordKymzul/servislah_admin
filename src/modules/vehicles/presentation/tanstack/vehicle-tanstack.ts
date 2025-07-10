import { useQuery } from "@tanstack/react-query";
import { getVehicles } from "../../data/services/vehicle-api.service";
import { QueryVehicleDto } from "../../data/entities/dto/query-vehicle.dto";

export const useQueryVehicles = (query: QueryVehicleDto) => {
  return useQuery({
    queryKey: ["vehicles", query],
    queryFn: () => getVehicles(query),
  });
};
