import { QueryAppointmentDto } from "../entities/dto/query-appointment.dto";
import { AppointmentModel } from "../entities/model/appointment-model";



let appointments: AppointmentModel[] = [
    {
        id: "1",
        date: "2025-07-05",
        time: "10:00",
        status: "PENDING",
        created_at: new Date(),
        updated_at: new Date(),
        service_center_id: "1",
        user_id: "1",
        vehicle_id: "1",
        mechanic_id: "1",
        service_bay_id: "1",
        service_center: undefined,
        user: undefined,
        items: undefined,
        vehicle: undefined,
        mechanic: undefined,
        service_bay: undefined,
    }
]

export const getAppointments = async (query: QueryAppointmentDto): Promise<AppointmentModel[]> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return appointments;
}