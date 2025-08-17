import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteReview, getReviewById, getReviews, getReviewsByMechanicId, updateReview } from "@/src/modules/reviews/data/services/review-api.service"
import { useAuthTanstack } from "@/src/modules/auth/presentation/tanstack/auth-tanstack"
import { QueryReviewDto } from "../../data/entities/dto/query-review.dto"
import { UpdateReviewDto } from "../../data/entities/dto/update-review.dto"
import { toast } from "sonner"

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

export const useGetReviewsByMechanicId = (mechanicId: string, query: QueryReviewDto) => {
    const { user } = useAuthTanstack();
    const token = user?.backend_tokens.access_token;
    return useQuery({
        queryKey: ['reviews', mechanicId, query],
        queryFn: async () => {
            if (!token) {
                throw new Error("You are not authenticated");
            }
            const reviews = await getReviewsByMechanicId(token, mechanicId, query);
            return reviews;
        },
        enabled: !!token && !!mechanicId,
    });
}



export const useUpdateReview = (id: string) => {
    const { user } = useAuthTanstack();
    const queryClient = useQueryClient();
    const token = user?.backend_tokens.access_token;
    return useMutation({
        mutationFn: async (data: UpdateReviewDto) => {
            if (!token) {
                throw new Error("You are not authenticated");
            }
            return await updateReview(token, id, data);
        },
        onSuccess: () => {
            toast.success("Review updated successfully");
            queryClient.invalidateQueries({ queryKey: ['review', id] });
            queryClient.invalidateQueries({ queryKey: ['reviews'] });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
}

export const useDeleteReview = () => {
    const { user } = useAuthTanstack();
    const queryClient = useQueryClient();
    const token = user?.backend_tokens.access_token;
    return useMutation({
        mutationFn: async (id: string) => {
            if (!token) {
                throw new Error("You are not authenticated");
            }
            return await deleteReview(token, id);
        },
        onSuccess: (_, id) => {
            toast.success("Review deleted successfully");
            queryClient.invalidateQueries({ queryKey: ['reviews'] });
            queryClient.invalidateQueries({ queryKey: ['review', id] });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
}