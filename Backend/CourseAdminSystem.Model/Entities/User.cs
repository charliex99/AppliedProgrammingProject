namespace CourseAdminSystem.Model.Entities;

public class User {
    public User(int userId){UserId = userId;}
    public int UserId { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
}
