import { useQuery } from "@tanstack/react-query";
import { ServiceCenterModel } from "../../data/entities/model/service-center-model";
import { getServiceCenters } from "../../data/services/service-center-api.service";

export const useQueryServiceCenters = () => {
    return useQuery<ServiceCenterModel[]>({
        queryKey: ["service-centers"],
        queryFn: () => getServiceCenters(),
    });
}