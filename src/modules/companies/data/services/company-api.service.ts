import { axiosInstance } from "@/src/core/util/config";
import { CompanyModel } from "../entities/model/company-model";
import { QueryCompanyDto } from "../entities/dto/query-company.dto";
import { AxiosError } from "axios";


export const getCompanies = async (token: string, query: QueryCompanyDto): Promise<CompanyModel[]> => {
    try {
        const response = await axiosInstance({ token: token }).get('/companies', {
            params: query
        });
        return response.data.data.companies;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data.message || "Failed to get companies");
        }
        throw new Error("Failed to get companies due to unknown error: " + error);
    }
}