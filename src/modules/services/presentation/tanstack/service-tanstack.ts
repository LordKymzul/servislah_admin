import { useMutation, useQuery } from "@tanstack/react-query";
import { getServiceById, getServices, updateService } from "../../data/services/service-api.service";
import { QueryServiceDto } from "../../data/entities/dto/query-service.dto";
import { useAuthTanstack } from "@/src/modules/auth/presentation/tanstack/auth-tanstack";
import { UpdateServiceDto } from "../../data/entities/dto/update-service.dto";
import { toast } from "sonner";

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

export const useQueryServiceById = (id: string) => {
    const { user } = useAuthTanstack();
    return useQuery({
        queryKey: ["service", id],
        queryFn: async () => {
            if (!user || !user.backend_tokens.access_token) {
                throw new Error("User not found");
            }
            return getServiceById(user.backend_tokens.access_token, id);
        }
    });
}

export const useUpdateService = (id: string) => {
    const { user } = useAuthTanstack();
    return useMutation({
        mutationFn: async (data: UpdateServiceDto) => {
            if (!user || !user.backend_tokens.access_token) {
                throw new Error("User not found");
            }
            return updateService(user.backend_tokens.access_token, id, data);
        },
        onSuccess: () => {
            toast.success("Service updated successfully");
        },
        onError: () => {
            toast.error("Failed to update service");
        }
    });
}