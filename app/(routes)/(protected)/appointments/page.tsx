import AppointmentsScreen from "@/src/modules/appointments/presentation/view/screens/appointments-screen";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Appointments - ServisLah Admin',
    description: 'Manage appointments',
};

export default function AppointmentsPage() {
    return <AppointmentsScreen />
}    