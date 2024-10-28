namespace CourseAdminSystem.Model.Entities;

public class ProductList
{
    public ProductList( int productListId){ProductListId = productListId;}

    public int ProductListId {get; set;}
    public int RecipeId {get; set;}
    public int ProductId {get; set;}
    public int ProductAmount {get; set;}

}
