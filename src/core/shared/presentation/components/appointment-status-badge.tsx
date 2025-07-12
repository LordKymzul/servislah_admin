import { Badge } from "@/components/ui/badge";

export enum AppointmentStatus {
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED"
}

const getStatusColor = (status: AppointmentStatus) => {
    switch (status) {
        case AppointmentStatus.PENDING:
            return "bg-yellow-100 text-yellow-800";
        case AppointmentStatus.CONFIRMED:
            return "bg-green-100 text-green-800";
        case AppointmentStatus.IN_PROGRESS:
            return "bg-blue-100 text-blue-800";
        case AppointmentStatus.COMPLETED:
            return "bg-green-100 text-green-800";
        case AppointmentStatus.CANCELLED:
            return "bg-red-100 text-red-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
}

const AppointmentStatusBadge = ({ status }: { status: AppointmentStatus }) => {
    return <Badge variant="outline" className={getStatusColor(status)}>{status.toUpperCase()}</Badge>
}

export default AppointmentStatusBadge;


