import VehicleDetailScreen from "@/src/modules/vehicles/presentation/view/screens/vehicle-detail-screen";
import { PageProps } from "@/src/core/util/types";


const VehicleDetailPage = async (props: { params: Promise<{ id: string }> }) => {
    const vehicleID = (await props.params).id;
    return <VehicleDetailScreen vehicleId={vehicleID} />;
};

export default VehicleDetailPage;


