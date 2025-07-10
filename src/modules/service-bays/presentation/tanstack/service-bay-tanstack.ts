import { useQuery } from "@tanstack/react-query";
import { getServiceBays } from "../../data/services/service-bay-api.service";
import { QueryServiceBayDto } from "../../data/entities/dto/query-service-bay.dto";

export const useQueryServiceBays = (query: QueryServiceBayDto) => {
  return useQuery({
    queryKey: ["service-bays", query],
    queryFn: () => getServiceBays(query),
  });
};
