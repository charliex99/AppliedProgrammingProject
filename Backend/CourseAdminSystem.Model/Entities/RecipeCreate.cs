namespace CourseAdminSystem.Model.Entities;

public class RecipeCreate
{

    public int UserId {get; set; }
    public string RecipeName {get; set;}
    public string RecipeInstruct {get; set;}
    public string RecipeIngredients {get; set;}
    public string RecipeStory { get; set; }
    public string RecipeWord {get; set;}
    public string? RecipePicture {get; set;}
}
