import { useQuery } from "@tanstack/react-query";
import { getCompanies } from "../../data/services/company-api.service";
import { QueryCompanyDto } from "../../data/entities/dto/query-company.dto";
import { useAuthTanstack } from "@/src/modules/auth/presentation/tanstack/auth-tanstack";

export const useGetCompanies = (query: QueryCompanyDto) => {
    const { user } = useAuthTanstack();
    const token = user?.backend_tokens.access_token;
    return useQuery({
        queryKey: ['companies', query],
        queryFn: async () => {
            if (!token) {
                throw new Error("You are not authenticated");
            }
            const companies = await getCompanies(token, query);
            return companies[0];
        },
    });
}