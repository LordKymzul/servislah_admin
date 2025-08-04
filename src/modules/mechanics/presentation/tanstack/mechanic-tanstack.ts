import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createMechanic, deleteMechanic, getMechanicById, getMechanics, updateMechanic } from "../../data/services/mechanic-api.service";
import { QueryMechanicDto } from "../../data/entities/dto/query-mechanic.dto";
import { useAuthTanstack } from "@/src/modules/auth/presentation/tanstack/auth-tanstack";
import { toast } from "sonner";
import { CreateMechanicDto } from "../../data/entities/dto/create-mechanic.dto";
import { UpdateMechanicDto } from "../../data/entities/dto/update-mechanic.dto";
import { MechanicModel } from "../../data/entities/model/mechanic-model";

export const useQueryMechanics = (query: QueryMechanicDto) => {
    const { user } = useAuthTanstack();
    return useQuery({
        queryKey: ["mechanics", query],
        queryFn: async () => {
            if (!user) {
                throw new Error("User not found");
            }
            const mechanics = await getMechanics(query, user.backend_tokens.access_token);
            return mechanics;
        },
    });
}

export const useQueryMechanicById = (mechanicId: string) => {
    const { user } = useAuthTanstack();
    return useQuery({
        queryKey: ["mechanic", mechanicId],
        queryFn: async () => {
            if (!user) {
                throw new Error("User not found");
            }
            const mechanic = await getMechanicById(mechanicId, user.backend_tokens.access_token);
            return mechanic;
        },
        enabled: !!user,
    });
}

export const useCreateMechanic = () => {
    const queryClient = useQueryClient();
    const { user } = useAuthTanstack();
    return useMutation({
        mutationFn: async (data: CreateMechanicDto) => {
            if (!user) {
                throw new Error("User not found");
            }
            return createMechanic(data, user.backend_tokens.access_token);
        },
        onSuccess: () => {
            toast.success("Mechanic created successfully");
            queryClient.invalidateQueries({ queryKey: ["mechanics"] });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
}

export const useDeleteMechanic = () => {
    const queryClient = useQueryClient();
    const { user } = useAuthTanstack();
    return useMutation({
        mutationFn: async (mechanicId: string) => {
            if (!user) {
                throw new Error("User not found");
            }
            return deleteMechanic(mechanicId, user.backend_tokens.access_token);
        },
        onSuccess: () => {
            toast.success("Mechanic deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["mechanics"] });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
}

export const useUpdateMechanic = () => {
    const queryClient = useQueryClient();
    const { user } = useAuthTanstack();
    return useMutation({
        mutationFn: async (data: { mechanicId: string, data: UpdateMechanicDto }) => {
            if (!user) {
                throw new Error("User not found");
            }
            return updateMechanic(data.mechanicId, data.data, user.backend_tokens.access_token);
        },
        onSuccess: (data: MechanicModel) => {
            toast.success("Mechanic updated successfully");
            queryClient.invalidateQueries({ queryKey: ["mechanics"] });
            queryClient.invalidateQueries({ queryKey: ["mechanic", data.id] });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
}