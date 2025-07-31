

import { useAuthTanstack } from "@/src/modules/auth/presentation/tanstack/auth-tanstack";
import { useQuery } from "@tanstack/react-query";
import { QueryCustomerGroupDto } from "../../data/entities/dto/query-customer-group.dto";
import { getCustomerGroupById, getCustomerGroups } from "../../data/services/customer-group-api.service";

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