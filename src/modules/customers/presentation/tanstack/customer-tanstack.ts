import { useQuery } from "@tanstack/react-query"

import { getCustomerById, getCustomers, getCustomersByMechanicId } from "@/src/modules/customers/data/services/customer-api.service"
import { QueryCustomerDto } from "@/src/modules/customers/data/entities/dto/query-customer.dto"
import { useAuthTanstack } from "@/src/modules/auth/presentation/tanstack/auth-tanstack"

export const useGetCustomers = (query: QueryCustomerDto) => {
    const { user } = useAuthTanstack();
    const token = user?.backend_tokens.access_token;
    return useQuery({
        queryKey: ['customers', query],
        queryFn: async () => {
            if (!token) {
                throw new Error("You are not authenticated");
            }
            const customers = await getCustomers(token, query);
            return customers;
        },
    });
}



export const useGetCustomerById = (id: string) => {
    const { user } = useAuthTanstack();
    const token = user?.backend_tokens.access_token;
    return useQuery({
        queryKey: ['customer', id],
        queryFn: async () => {
            if (!token) {
                throw new Error("You are not authenticated");
            }
            const customer = await getCustomerById(token, id);
            return customer;
        },
    });
}


export const useGetCustomersByMechanicId = (mechanicId: string, query: QueryCustomerDto) => {
    const { user } = useAuthTanstack();
    const token = user?.backend_tokens.access_token;
    return useQuery({
        queryKey: ['customers', mechanicId, query],
        queryFn: async () => {
            if (!token) {
                throw new Error("You are not authenticated");
            }
            const customers = await getCustomersByMechanicId(token, mechanicId, query);
            return customers;
        },
        enabled: !!token && !!mechanicId,
    });
}