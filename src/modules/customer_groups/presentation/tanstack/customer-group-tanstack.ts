

import { useAuthTanstack } from "@/src/modules/auth/presentation/tanstack/auth-tanstack";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QueryCustomerGroupDto } from "../../data/entities/dto/query-customer-group.dto";
import { createCustomerGroup, deleteCustomerGroup, getCustomerGroupById, getCustomerGroups, updateCustomerGroup } from "../../data/services/customer-group-api.service";
import { CreateCustomerGroupDto } from "../../data/entities/dto/create-customer-group.dto";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CustomerGroupModel } from "../../data/entities/model/customer-group-model";
import { UpdateCustomerGroupDto } from "../../data/entities/dto/update-customer-group.dto";

export const useGetCustomerGroups = (query: QueryCustomerGroupDto) => {
    const { user } = useAuthTanstack();
    const token = user?.backend_tokens.access_token;
    return useQuery({
        queryKey: ['customer-groups', query],
        queryFn: async () => {
            if (!token) {
                throw new Error("You are not authenticated");
            }
            const customerGroups = await getCustomerGroups(token, query);
            return customerGroups;
        },
    });
}

export const useGetCustomerGroupById = (id: string) => {
    const { user } = useAuthTanstack();
    const token = user?.backend_tokens.access_token;
    return useQuery({
        queryKey: ['customer-group', id],
        queryFn: async () => {
            if (!token) {
                throw new Error("You are not authenticated");
            }
            const customerGroup = await getCustomerGroupById(token, id);
            return customerGroup;
        },
    });
}

export const useCreateCustomerGroup = () => {
    const { user } = useAuthTanstack();
    const queryClient = useQueryClient();
    const router = useRouter();
    const token = user?.backend_tokens.access_token;
    return useMutation({
        mutationFn: async (data: CreateCustomerGroupDto) => {
            if (!token) {
                throw new Error("You are not authenticated");
            }
            return createCustomerGroup(token, data);
        },
        onSuccess: (data: CustomerGroupModel) => {
            toast.success("Customer group created successfully");
            queryClient.invalidateQueries({ queryKey: ['customer-groups'] });
            router.push(`/customer-groups/${data.id}`);
        },
        onError: () => {
            toast.error("Failed to create customer group");
        },
    });
}

export const useUpdateCustomerGroup = (id: string) => {
    const { user } = useAuthTanstack();
    const queryClient = useQueryClient();
    const token = user?.backend_tokens.access_token;
    return useMutation({
        mutationFn: async (data: UpdateCustomerGroupDto) => {
            if (!token) {
                throw new Error("You are not authenticated");
            }
            return updateCustomerGroup(token, id, data);
        },
        onSuccess: (data: CustomerGroupModel) => {
            toast.success("Customer group updated successfully");
            queryClient.invalidateQueries({ queryKey: ['customer-groups'] });
            queryClient.invalidateQueries({ queryKey: ['customer-group', id] });
        },
        onError: (error: any) => {
            toast.error("Failed to update customer group due to: " + error.message);
        },
    });
}

export const useDeleteCustomerGroup = () => {
    const { user } = useAuthTanstack();
    const queryClient = useQueryClient();
    const token = user?.backend_tokens.access_token;
    return useMutation({
        mutationFn: async (id: string) => {
            if (!token) {
                throw new Error("You are not authenticated");
            }
            return deleteCustomerGroup(token, id);
        },
        onSuccess: (data: CustomerGroupModel) => {
            toast.success("Customer group deleted successfully");
            queryClient.invalidateQueries({ queryKey: ['customer-groups'] });
            queryClient.invalidateQueries({ queryKey: ['customer-group', data.id] });
        },
        onError: (error: any) => {
            toast.error("Failed to delete customer group due to: " + error.message);
        },
    });
}