import { useQuery } from "@tanstack/react-query";
import { getSpecializationById, getSpecializations } from "../../data/services/specialization-api.service";
import { QuerySpecializationDto } from "../../data/entities/dto/query-specialization.dto";
import { useAuthTanstack } from "@/src/modules/auth/presentation/tanstack/auth-tanstack";

export const useQuerySpecializations = (query: QuerySpecializationDto) => {
    const { user } = useAuthTanstack();
    return useQuery({
        queryKey: ["specializations", query],
        queryFn: () => {
            if (!user || !user.backend_tokens.access_token) {
                throw new Error("User not found");
            }
            return getSpecializations(user.backend_tokens.access_token, query);
        },
    });
}

export const useQuerySpecializationById = (id: string) => {
    const { user } = useAuthTanstack();
    return useQuery({
        queryKey: ["specialization", id],
        queryFn: () => {
            if (!user || !user.backend_tokens.access_token) {
                throw new Error("User not found");
            }
            return getSpecializationById(user.backend_tokens.access_token, id);
        },
    });
}