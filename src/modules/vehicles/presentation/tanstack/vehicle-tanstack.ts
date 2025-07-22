import { useQuery } from "@tanstack/react-query";
import { getVehicleById, getVehicles } from "../../data/services/vehicle-api.service";
import { QueryVehicleDto } from "../../data/entities/dto/query-vehicle.dto";
import { useAuthTanstack } from "@/src/modules/auth/presentation/tanstack/auth-tanstack";
import { toast } from "sonner";

export const useQueryVehicles = (query: QueryVehicleDto) => {
  const { user } = useAuthTanstack();
  return useQuery({
    queryKey: ["vehicles", query],
    queryFn: async () => {
      if (!user) {
        throw new Error("User not found");
      }
      console.log("query", query);
      const response = await getVehicles(query, user.backend_tokens.access_token);
      toast.success("Vehicles fetched successfully");
      return response;
    },
    enabled: !!user,
    staleTime: 1000 * 60 * 5, // 5 minutes
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
      const response = await getVehicleById(id, user.backend_tokens.access_token);
      return response;
    },
    enabled: !!user && !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};