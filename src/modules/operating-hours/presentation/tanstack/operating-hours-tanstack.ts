import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { QueryOperatingHoursDto } from "../../data/entities/dto/query-operating-hours.dto"
import { createOperatingHours, deleteOperatingHours, getOperatingHourById, getOperatingHours, updateOperatingHours } from "../../data/services/operating-hours-api.service"
import { useAuthTanstack } from "@/src/modules/auth/presentation/tanstack/auth-tanstack"
import { UpdateOperatingHoursDto } from "../../data/entities/dto/update-operating-hours.dto"
import { toast } from "sonner"
import { CreateOperatingHoursDto } from "../../data/entities/dto/create-operating-hours.dto"


export const useGetOperatingHours = (query: QueryOperatingHoursDto) => {
    const { user } = useAuthTanstack()
    const token = user?.backend_tokens.access_token
    return useQuery({
        queryKey: ["operating-hours", query],
        queryFn: async () => {
            if (!token) {
                throw new Error("You are not authenticated");
            }

            const data = await getOperatingHours(token, {
                ...query,
            });
            data.operating_hours.sort((a, b) => (a.day || 0) - (b.day || 0))
            return data
        },
    })
}


export const useQueryOperatingHoursbyId = (id: string) => {
    const { user } = useAuthTanstack();
    const token = user?.backend_tokens.access_token;

    return useQuery({
        queryKey: ["operating-hour", id],
        queryFn: async () => {
            if (!token) {
                throw new Error("You are not authenticated");
            }
            return getOperatingHourById(token, id);
        },
        enabled: !!token && !!id,
    });
}

export const useCreateOperatingHours = () => {
    const { user } = useAuthTanstack();
    const queryClient = useQueryClient();
    const token = user?.backend_tokens.access_token;
    return useMutation({
        mutationFn: (data: CreateOperatingHoursDto) => {
            if (!token) {
                throw new Error("You are not authenticated");
            }
            return createOperatingHours(token, data);
        },
        onSuccess: () => {
            toast.success("Operating hours created successfully");
            queryClient.invalidateQueries({ queryKey: ["operating-hours"] });
        },
        onError: () => {
            toast.error("Failed to create operating hours");
        }
    });
}




export const useUpdateOperatingHours = (id: string) => {
    const queryClient = useQueryClient();
    const { user } = useAuthTanstack();
    const token = user?.backend_tokens.access_token;

    return useMutation({
        mutationFn: (data: UpdateOperatingHoursDto) => {
            if (!token) {
                throw new Error("You are not authenticated");
            }
            return updateOperatingHours(token, id, data);
        },
        onSuccess: () => {
            toast.success("Operating hours updated successfully");
            queryClient.invalidateQueries({ queryKey: ["operating-hours"] });
            queryClient.invalidateQueries({ queryKey: ["operating-hour", id] });
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });
}

export const useDeleteOperatingHours = () => {
    const queryClient = useQueryClient();
    const { user } = useAuthTanstack();
    const token = user?.backend_tokens.access_token;

    return useMutation({
        mutationFn: (id: string) => {
            if (!token) {
                throw new Error("You are not authenticated");
            }
            return deleteOperatingHours(token, id);
        },
        onSuccess: (data) => {
            toast.success("Operating hours deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["operating-hours"] });
            queryClient.invalidateQueries({ queryKey: ["operating-hour", data.id] });
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });
}