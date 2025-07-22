import { useQuery } from "@tanstack/react-query";
import { getMechanicById, getMechanics } from "../../data/services/mechanic-api.service";
import { QueryMechanicDto } from "../../data/entities/dto/query-mechanic.dto";
import { useAuthTanstack } from "@/src/modules/auth/presentation/tanstack/auth-tanstack";
import { toast } from "sonner";

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