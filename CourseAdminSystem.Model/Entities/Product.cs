namespace CourseAdminSystem.Model.Entities;

public class Product {
    public Product(int productId){ProductId = productId;}
    public int ProductId { get; set; }
    public string ProductName { get; set; }
}

