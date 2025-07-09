import { useQuery } from "@tanstack/react-query";
import { getServices } from "../../data/services/service-api.service";
import { QueryServiceDto } from "../../data/entities/dto/query-service.dto";

export const useQueryServices = (query: QueryServiceDto) => {
    return useQuery({
        queryKey: ["services", query],
        queryFn: () => getServices(query),
    });
}