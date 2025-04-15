import { RolesUsersEntity } from "src/roles-users/entity/roles-users.entity"

export interface tokenPayload {
    id: string;
    role: RolesUsersEntity;
}