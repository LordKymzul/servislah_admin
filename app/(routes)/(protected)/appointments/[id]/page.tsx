
import AppointmentDetailScreen from "@/src/modules/appointments/presentation/view/screens/appointment-detail-screen";


const AppointmentDetailPage = async (props: { params: Promise<{ id: string }> }) => {
    const appointmentID = (await props.params).id;
    return <AppointmentDetailScreen appointmentId={appointmentID} />;
};

export default AppointmentDetailPage;


