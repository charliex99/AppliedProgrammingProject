import { User } from "./user";

export interface Recipe {
recipeWord: string;
    recipeId: number;
    recipeName: string; 
    recipeStory: string; 
    recipeIngredients: string; 
    recipeInstruct: string; 
    recipePicture: string
    user: User;
    
}





