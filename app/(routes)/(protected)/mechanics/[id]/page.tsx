import { PageProps } from "@/src/core/util/types";
import MechanicDetailScreen from "@/src/modules/mechanics/presentation/view/screens/mechanic-detail-screen";



const MechanicDetailPage = async (props: { params: Promise<{ id: string }> }) => {
    const mechanicID = (await props.params).id;
    return <MechanicDetailScreen mechanicId={mechanicID} />
}

export default MechanicDetailPage;  