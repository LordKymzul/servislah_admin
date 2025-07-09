import { useQuery } from "@tanstack/react-query";
import { getMechanics } from "../../data/services/mechanic-api.service";
import { QueryMechanicDto } from "../../data/entities/dto/query-mechanic.dto";

export const useQueryMechanics = (query: QueryMechanicDto) => {
    return useQuery({
        queryKey: ["mechanics", query],
        queryFn: () => getMechanics(query),
    });
}