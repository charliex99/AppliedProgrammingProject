namespace CourseAdminSystem.Model.Entities;

public class CreatedList
{
    public CreatedList( int createdListId){CreatedListId = createdListId;}

    public int CreatedListId {get; set;}

    public int UserId {get; set;}

    public int RecipeId {get; set;}

}
