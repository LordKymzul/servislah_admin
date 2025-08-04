import OperatingHoursDetailScreen from "@/src/modules/operating-hours/presentation/view/screens/operating-hours-detail-screen";
import ServiceBayDetailScreen from "@/src/modules/service-bays/presentation/view/screens/service-bay-detail-screen";

const OperatingHoursDetailPage = async (props: { params: Promise<{ id: string }> }) => {
    const operatingHoursId = (await props.params).id;
    return (
        <OperatingHoursDetailScreen operating_hours_id={operatingHoursId} />
    )
}

export default OperatingHoursDetailPage