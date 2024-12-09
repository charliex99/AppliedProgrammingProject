namespace CourseAdminSystem.Model.Entities;

public class User {
    public User(int userId){UserId = userId;}
     public User(){}
    public int UserId { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Username {get; set;}
    public string Password {get; set;}
    
}

