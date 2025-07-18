import ServiceCenterDetailScreen from "@/src/modules/service-centers/presentation/view/screens/service-center-detail-screen";

const ServiceCenterDetailPage = async (props: { params: Promise<{ id: string }> }) => {
    const serviceCenterID = (await props.params).id;
    return (
        <ServiceCenterDetailScreen service_center_id={serviceCenterID} />
    )
}

export default ServiceCenterDetailPage;


