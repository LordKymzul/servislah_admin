import { useQuery } from "@tanstack/react-query";
import { getServiceBays } from "../../data/services/service-bay-api.service";
import { QueryServiceBayDto } from "../../data/entities/dto/query-service-bay.dto";
import { useAuthTanstack } from "@/src/modules/auth/presentation/tanstack/auth-tanstack";

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
