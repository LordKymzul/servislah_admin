import { useQuery } from "@tanstack/react-query";
import { getAppointmentById, getAppointments } from "../../data/services/appointment-api.service";
import { QueryAppointmentDto } from "../../data/entities/dto/query-appointment.dto";
import { useAuthTanstack } from "@/src/modules/auth/presentation/tanstack/auth-tanstack";


export const useQueryAppointments = (query: QueryAppointmentDto) => {
    const { user } = useAuthTanstack()
    return useQuery({
        queryKey: ["appointments", query],
        queryFn: () => {
            if (!user) {
                throw new Error("User not found, You are not logged in")
            }
            return getAppointments(user?.backend_tokens?.access_token || "", query)
        },

    });
}

export const useQueryAppointmentById = (id: string) => {
    const { user } = useAuthTanstack()
    return useQuery({
        queryKey: ["appointment", id],
        queryFn: () => {
            if (!user) {
                throw new Error("User not found, You are not logged in")
            }
            return getAppointmentById(user?.backend_tokens?.access_token || "", id)
        },
    })
}