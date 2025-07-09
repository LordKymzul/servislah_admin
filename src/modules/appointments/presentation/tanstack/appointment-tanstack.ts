import { useQuery } from "@tanstack/react-query";
import { getAppointments } from "../../data/services/appointment-api.service";
import { QueryAppointmentDto } from "../../data/entities/dto/query-appointment.dto";


export const useQueryAppointments = (query: QueryAppointmentDto) => {
    return useQuery({
        queryKey: ["appointments", query],
        queryFn: () => getAppointments(query),
    });
}