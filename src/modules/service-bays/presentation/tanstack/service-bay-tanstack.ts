import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getServiceBayById, getServiceBays, updateServiceBay } from "../../data/services/service-bay-api.service";
import { QueryServiceBayDto } from "../../data/entities/dto/query-service-bay.dto";
import { useAuthTanstack } from "@/src/modules/auth/presentation/tanstack/auth-tanstack";
import { UpdateServiceBayDto } from "../../data/entities/dto/update-service-bay.dto";
import { toast } from "sonner";

export const useQueryServiceBays = (query: QueryServiceBayDto) => {
  const { user } = useAuthTanstack();
  return useQuery({
    queryKey: ["service-bays", query],
    queryFn: async () => {
      if (!user || !user.backend_tokens.access_token) {
        throw new Error("User not found");
      }
      return getServiceBays(user.backend_tokens.access_token, query);
    }
  });
};


export const useQueryServiceBayById = (service_bay_id: string) => {
  const { user } = useAuthTanstack();
  return useQuery({
    queryKey: ["service-bay", service_bay_id],
    queryFn: async () => {
      if (!user || !user.backend_tokens.access_token) {
        throw new Error("User not found");
      }
      return getServiceBayById(user.backend_tokens.access_token, service_bay_id);
    }
  });
};

export const useUpdateServiceBay = (service_bay_id: string) => {
  const { user } = useAuthTanstack();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: UpdateServiceBayDto) => {
      if (!user || !user.backend_tokens.access_token) {
        throw new Error("User not found");
      }
      return updateServiceBay(user.backend_tokens.access_token, service_bay_id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["service-bays"] });
      queryClient.invalidateQueries({ queryKey: ["service-bay", service_bay_id] });
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });
};