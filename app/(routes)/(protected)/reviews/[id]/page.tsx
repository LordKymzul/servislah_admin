
import ReviewDetailScreen from "@/src/modules/reviews/presentation/view/screens/review-detail-screen";


const ReviewDetailPage = async (props: { params: Promise<{ id: string }> }) => {
    const reviewID = (await props.params).id;
    return <ReviewDetailScreen reviewId={reviewID} />;
};

export default ReviewDetailPage;


