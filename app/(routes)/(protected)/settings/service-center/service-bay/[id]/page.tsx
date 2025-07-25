import ServiceBayDetailScreen from "@/src/modules/service-bays/presentation/view/screens/service-bay-detail-screen";

const ServiceBayDetailPage = async (props: { params: Promise<{ id: string }> }) => {
    const serviceId = (await props.params).id;
    return (
        <ServiceBayDetailScreen service_bay_id={serviceId} />
    )
}

export default ServiceBayDetailPage