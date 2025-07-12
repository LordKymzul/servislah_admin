import { PageProps } from "@/src/core/util/types";
import MechanicDetailScreen from "@/src/modules/mechanics/presentation/view/screens/mechanic-detail-screen";



const MechanicDetailPage = ({ params }: PageProps) => {
    return <MechanicDetailScreen mechanicId={params.id} />
}

export default MechanicDetailPage;  