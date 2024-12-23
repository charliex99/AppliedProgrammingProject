namespace CourseAdminSystem.Model.Entities;

public class FavoriteList
{
     public FavoriteList( int favoriteListId){FavoriteListId = favoriteListId;}

     public int FavoriteListId {get;set;}

     public int UserId {get;set;}

     public int RecipeId {get;set;}
     public User user {get; set;}

}
