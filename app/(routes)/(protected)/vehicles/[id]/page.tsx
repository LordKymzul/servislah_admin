import VehicleDetailScreen from "@/src/modules/vehicles/presentation/view/screens/vehicle-detail-screen";

const VehicleDetailPage = ({ params }: { params: { id: string } }) => {
    return <VehicleDetailScreen vehicleId={params.id} />;
};

export default VehicleDetailPage;