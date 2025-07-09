export class AppointmentModel {
    id?: string;
    service_center_id?: string;
    user_id?: string;
    vehicle_id?: string;
    mechanic_id?: string;
    service_bay_id?: string;
    service_center?: any;
    user?: any;
    vehicle?: any;
    mechanic?: any;
    service_bay?: any[]
    date?: string;
    time?: string;
    status?: string;
    created_at?: Date;
    updated_at?: Date;
}

