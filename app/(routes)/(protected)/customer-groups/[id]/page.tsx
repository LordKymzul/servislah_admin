
import CustomerGroupDetailScreen from "@/src/modules/customer_groups/presentation/view/screens/customer-group-detail-screen";



const CustomerGroupDetailPage = async (props: { params: Promise<{ id: string }> }) => {
    const customerGroupId = (await props.params).id;
    return <CustomerGroupDetailScreen customerGroupId={customerGroupId} />
}

export default CustomerGroupDetailPage;  