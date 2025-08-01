import CustomerDetailScreen from "@/src/modules/customers/presentation/view/screens/customer-detail-screen";



const CustomerDetailPage = async (props: { params: Promise<{ id: string }> }) => {
    const customerId = (await props.params).id;
    return <CustomerDetailScreen customerId={customerId} />
}

export default CustomerDetailPage;  