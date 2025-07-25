import axios, { AxiosError } from "axios";
import { QueryServiceBayDto } from "../entities/dto/query-service-bay.dto";
import { ResponseGetAllServiceBaysModel, ServiceBayModel } from "../entities/model/service-bay-model";
import { axiosInstance } from "@/src/core/util/config";
import { PYTHON_GATEWAY_URL } from "@/src/core/util/constant";
import { UpdateServiceBayDto } from "../entities/dto/update-service-bay.dto";



export const getServiceBays = async (
  token: string,
  query: QueryServiceBayDto
): Promise<ResponseGetAllServiceBaysModel> => {

  try {
    const response = await axiosInstance({ token: token }).get(`/service-bays`, { params: query });
    let data: ResponseGetAllServiceBaysModel = {
      metadata: response.data.data.metadata,
      service_bays: response.data.data.service_bays
    }
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || "Failed to get service bays");
    }
    throw new Error("Failed to get service bays");
  }
}


export const getServiceBayById = async (
  token: string,
  service_bay_id: string
): Promise<ServiceBayModel> => {
  try {
    const response = await axiosInstance({ token: token }).get(`/service-bays/${service_bay_id}`);
    return response.data.data.service_bay;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || "Failed to get service bay");
    }
    throw new Error("Failed to get service bay");
  }
}

export const updateServiceBay = async (
  token: string,
  service_bay_id: string,
  data: UpdateServiceBayDto
): Promise<ServiceBayModel> => {
  try {
    const response = await axiosInstance({ token: token }).put(`/service-bays/${service_bay_id}`, data);
    return response.data.data.service_bay;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || "Failed to update service bay");
    }
    throw new Error("Failed to update service bay");
  }
}