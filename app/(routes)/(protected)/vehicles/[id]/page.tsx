import VehicleDetailScreen from "@/src/modules/vehicles/presentation/view/screens/vehicle-detail-screen";
import { PageProps } from "@/src/core/util/types";


const VehicleDetailPage = ({ params }: PageProps) => {
    return <VehicleDetailScreen vehicleId={params.id} />;
};

export default VehicleDetailPage;