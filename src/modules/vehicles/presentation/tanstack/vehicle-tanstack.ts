import { useQuery } from "@tanstack/react-query";
import { getVehicleById, getVehicles } from "../../data/services/vehicle-api.service";
import { QueryVehicleDto } from "../../data/entities/dto/query-vehicle.dto";
import { useAuthTanstack } from "@/src/modules/auth/presentation/tanstack/auth-tanstack";

export const useQueryVehicles = (query: QueryVehicleDto) => {
  const { user } = useAuthTanstack();
  return useQuery({
    queryKey: ["vehicles", query],
    queryFn: async () => {
      if (!user) {
        throw new Error("User not found");
      }
      return getVehicles(query, user.backend_tokens.access_token);
    },
    enabled: !!user,
  });
};


export const useQueryVehicleById = (id: string) => {
  const { user } = useAuthTanstack();
  return useQuery({
    queryKey: ["vehicle", id],
    queryFn: async () => {
      if (!user) {
        throw new Error("User not found");
      }
      return getVehicleById(id, user.backend_tokens.access_token);
    },
    enabled: !!user,
  });
};