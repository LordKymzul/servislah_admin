import MechanicDetailScreen from "@/src/modules/mechanics/presentation/view/screens/mechanic-detail-screen";

const MechanicDetailPage = ({ params }: { params: { id: string } }) => {
    return <MechanicDetailScreen mechanicId={params.id} />
}

export default MechanicDetailPage;  