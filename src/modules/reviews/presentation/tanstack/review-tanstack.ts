import { useQuery } from "@tanstack/react-query"
import { getReviewById, getReviews } from "@/src/modules/reviews/data/services/review-api.service"
import { useAuthTanstack } from "@/src/modules/auth/presentation/tanstack/auth-tanstack"
import { QueryReviewDto } from "../../data/entities/dto/query-review.dto"

export const useGetReviews = (query: QueryReviewDto) => {
    const { user } = useAuthTanstack();
    const token = user?.backend_tokens.access_token;
    return useQuery({
        queryKey: ['reviews', query],
        queryFn: async () => {
            if (!token) {
                throw new Error("You are not authenticated");
            }
            const reviews = await getReviews(token, query);
            return reviews;
        },
    });
}



export const useGetReviewById = (id: string) => {
    const { user } = useAuthTanstack();
    const token = user?.backend_tokens.access_token;
    return useQuery({
        queryKey: ['review', id],
        queryFn: async () => {
            if (!token) {
                throw new Error("You are not authenticated");
            }
            const review = await getReviewById(token, id);
            return review;
        },
    });
}