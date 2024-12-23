import { User } from "./user";

export interface Favorite {
    user_id: number;
    favorite_list_id: number;
    recipe_id: number; 
    user: User; 
}
