namespace CourseAdminSystem.Model.Entities;

public class Recipe
{
    public Recipe(int recipeid){
        RecipeId = recipeid; 
    }

    public int RecipeId {get; set; }
    public string RecipeName {get; set;}
    public string RecipeInstruct {get; set;}
    public string RecipeIngredients {get; set;}
 

}
