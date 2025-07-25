import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ServiceCenterModel } from "../../data/entities/model/service-center-model";
import { getServiceCenterById, getServiceCenters, updateServiceCenter } from "../../data/services/service-center-api.service";
import { useAuthTanstack } from "@/src/modules/auth/presentation/tanstack/auth-tanstack";
import { QueryServiceCenterDto } from "../../data/entities/dto/query-service-center.dto";
import { toast } from "sonner";
import { UpdateServiceCenterDto } from "../../data/entities/dto/update-service-center.dto";

export const useQueryServiceCenters = (query: QueryServiceCenterDto) => {
    const { user } = useAuthTanstack();
    const token = user?.backend_tokens.access_token;


    return useQuery<ServiceCenterModel[]>({
        queryKey: ["service-centers"],
        queryFn: () => {
            if (!token) {
                throw new Error("You are not authenticated");
            }

            return getServiceCenters(token, {
                ...query,
                admin_id: user?.metadata.admin_id,
            });
        },
        enabled: !!token,
    });
}

export const useQueryServiceCenterById = ({ service_center_id }: { service_center_id: string }) => {
    const { user } = useAuthTanstack();
    const token = user?.backend_tokens.access_token;

    return useQuery<ServiceCenterModel>({
        queryKey: ["service-center", service_center_id],
        queryFn: () => {
            if (!token || !service_center_id) {
                throw new Error("You are not authenticated");
            }
            return getServiceCenterById(token, service_center_id);
        },
    });
}


export const useUpdateServiceCenter = (service_center_id: string) => {
    const { user } = useAuthTanstack();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: UpdateServiceCenterDto) => {
            if (!user || !user.backend_tokens.access_token) {
                throw new Error("User not found");
            }
            return updateServiceCenter(user.backend_tokens.access_token, service_center_id, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["service-centers"] });
            queryClient.invalidateQueries({ queryKey: ["service-center", service_center_id] });
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });
}

