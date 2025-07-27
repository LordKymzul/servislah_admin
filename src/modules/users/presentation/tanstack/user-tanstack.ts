import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../data/services/user-api.service";
import { useAuthTanstack } from "@/src/modules/auth/presentation/tanstack/auth-tanstack";

export const useQueryUserById = (id: string) => {
    const { user } = useAuthTanstack();
    return useQuery({
        queryKey: ["user", id],
        queryFn: () => {
            if (!user || !user.backend_tokens.access_token) {
                throw new Error("User not found");
            }
            return getUserById(user.backend_tokens.access_token, id);
        },
    });
}
export const useQueryMe = () => {
    const { user } = useAuthTanstack();
    return useQuery({
        queryKey: ["me"],
        queryFn: () => {
            if (!user || !user.backend_tokens.access_token) {
                throw new Error("User not found");
            }
            return getUserById(user.backend_tokens.access_token, user.id);
        },
    });
}