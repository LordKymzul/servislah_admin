import { axiosInstance } from "@/src/core/util/config";
import { AxiosError } from "axios";
import { MetadataModel } from "@/src/core/shared/entities/model/metadata-model";
import { QueryReviewDto } from "../entities/dto/query-review.dto";
import { ReviewModel } from "../entities/model/review-model";
import { ReviewsResponseModel } from "../entities/model/review-model";
import { UpdateReviewDto } from "../entities/dto/update-review.dto";

export const getReviews = async (token: string, query: QueryReviewDto): Promise<ReviewsResponseModel> => {
    try {
        const response = await axiosInstance({ token: token }).get(`/reviews`, {
            params: query
        })
        let reviews: ReviewModel[] = response.data.data.reviews
        let metadata: MetadataModel = response.data.data.metadata
        return {
            reviews: reviews,
            metadata: metadata
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data.message)
        }
        throw new Error("Failed to get reviews")
    }
}

export const getReviewById = async (token: string, id: string): Promise<ReviewModel> => {
    try {
        const response = await axiosInstance({ token: token }).get(`/reviews/${id}`)
        return response.data.data.review
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data.message)
        }
        throw new Error("Failed to get customer")
    }
}

export const getReviewsByMechanicId = async (token: string, mechanicId: string, query: QueryReviewDto): Promise<ReviewsResponseModel> => {
    try {
        const response = await axiosInstance({ token: token }).get(`/reviews/mechanic/${mechanicId}`, {
            params: query
        })
        let reviews: ReviewModel[] = response.data.data.reviews
        let metadata: MetadataModel = response.data.data.metadata
        return {
            reviews: reviews,
            metadata: metadata
        }
    }
    catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data.message)
        }
        throw new Error("Failed to get reviews by mechanic id")
    }
}

export const updateReview = async (token: string, id: string, data: UpdateReviewDto): Promise<ReviewModel> => {
    try {
        const response = await axiosInstance({ token: token }).patch(`/reviews/${id}`, data)
        return response.data.data.review
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data.message)
        }
        throw new Error("Failed to update review")
    }
}

export const deleteReview = async (token: string, id: string): Promise<ReviewModel> => {
    try {
        const response = await axiosInstance({ token: token }).delete(`/reviews/${id}`)
        return response.data.data.review
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data.message)
        }
        throw new Error("Failed to delete review")
    }
}