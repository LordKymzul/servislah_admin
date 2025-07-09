import { QueryMechanicDto } from "../entities/dto/query-mechanic.dto";
import { MechanicModel } from "../entities/model/mechanic-model";

let mechanics: MechanicModel[] = [

    {
        id: "1",
        user_id: "1",
        user: {
            id: "1",
            name: "John Doe",
            email: "john.doe@example.com",
        },
        service_center_id: "1",
        service_center: {
            id: "1",
            name: "Service Center 1",
        },
        experience_level: "beginner",
        is_active: true,
        years_of_exp: 1,
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        id: "2",
        user_id: "2",
        user: {
            id: "2",
            name: "Jane Doe",
            email: "jane.doe@example.com",
        },
        service_center_id: "1",
        service_center: {
            id: "1",
            name: "Service Center 1",
        },
        experience_level: "beginner",
        is_active: true,
        years_of_exp: 1,
        created_at: new Date(),
        updated_at: new Date(),
    }
]
export const getMechanics = async (query: QueryMechanicDto) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mechanics;
}