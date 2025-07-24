import ServicesDetailScreen from "@/src/modules/services/presentation/view/screens/services-detail-screen"

const ServicesDetailPage = async (props: { params: Promise<{ id: string }> }) => {
    const serviceId = (await props.params).id;
    return (
        <ServicesDetailScreen service_id={serviceId} />
    )
}

export default ServicesDetailPage