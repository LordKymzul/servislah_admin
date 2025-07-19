import { useQuery } from "@tanstack/react-query";
import { getServices } from "../../data/services/service-api.service";
import { QueryServiceDto } from "../../data/entities/dto/query-service.dto";
import { useAuthTanstack } from "@/src/modules/auth/presentation/tanstack/auth-tanstack";

export const useQueryServices = (query: QueryServiceDto) => {

    const { user } = useAuthTanstack();
    return useQuery({
        queryKey: ["services", query],
        queryFn: async () => {
            if (!user || !user.backend_tokens.access_token) {
                throw new Error("User not found");
            }

            return getServices(user.backend_tokens.access_token, query);
        }
    });
}