namespace CourseAdminSystem.Model.Entities;

public class Recipes
{
    public Recipes(int recipeid){
        RecipeId = recipeid; 
    }

    public int RecipeId {get; set; }
    public string RecipeInstruct {get; set;}

}
