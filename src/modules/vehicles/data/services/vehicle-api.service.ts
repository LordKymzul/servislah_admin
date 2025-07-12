import { axiosInstance } from "@/src/core/util/config";
import { QueryVehicleDto } from "../entities/dto/query-vehicle.dto";
import { VehicleModel, VehicleResponseModel } from "../entities/model/vehicle-model";
import { MetadataModel } from "@/src/core/shared/entities/model/metadata-model";
import { AxiosError } from "axios";



export const getVehicles = async (
  query: QueryVehicleDto,
  token: string
): Promise<VehicleResponseModel> => {
  try {
    const response = await axiosInstance({ token: token }).get(`/vehicles`, {
      params: query
    });
    let vehicles: VehicleModel[] = response.data.data.vehicles;
    let metadata: MetadataModel = response.data.data.metadata;
    return {
      vehicles,
      metadata
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw new Error("Failed to get vehicles");
  }
};


export const getVehicleById = async (id: string, token: string): Promise<VehicleModel> => {
  try {
    const response = await axiosInstance({ token: token }).get(`/vehicles/${id}`);
    return response.data.data.vehicle;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw new Error("Failed to get vehicle");
  }
};