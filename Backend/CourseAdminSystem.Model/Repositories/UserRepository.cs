namespace CourseAdminSystem.Model.Repositories;

using System;
using CourseAdminSystem.Model.Entities;
using Microsoft.Extensions.Configuration;
using Npgsql;
using NpgsqlTypes;

 public class UserRepository : BaseRepository
 {
    public UserRepository(IConfiguration configuration) : base(configuration)
    {
    }

// Get Users based on ID 
    public User GetUserById(int userId)
   {
   NpgsqlConnection dbConn = null;
   try
   {
      //create a new connection for database
      dbConn = new NpgsqlConnection(ConnectionString);
      //creating an SQL command
      var cmd = dbConn.CreateCommand();
      cmd.CommandText = "select * from Users where UserId = @userId";
      cmd.Parameters.Add("@userId", NpgsqlDbType.Integer).Value = userId;
      //call the base method to get data
      var data = GetData(dbConn, cmd);
      if (data != null)
      {
         if (data.Read()) //every time loop runs it reads next like from fetched rows
         {
            return new User(Convert.ToInt32(data["userId"]))
            {
               Name = data["name"].ToString(),
               Email = data["email"].ToString(),
               Username = data["username"].ToString(),
               AboutSection = data["about_section"].ToString(),
            };
} }
      return null;
   }
finally {
      dbConn?.Close();
   }
}

//Method to get a list of users 
public List<User> GetUsers()
{
   NpgsqlConnection dbConn = null;
   var users = new List<User>();
   try
   {
      //create a new connection for database
      dbConn = new NpgsqlConnection(ConnectionString);
      //creating an SQL command
      var cmd = dbConn.CreateCommand();
      cmd.CommandText = "select * from Users";
      //call the base method to get data
      var data = GetData(dbConn, cmd);
      if (data != null)
      {
         while (data.Read()) //every time loop runs it reads next like from fetched rows
         {
            User u = new User(Convert.ToInt32(data["userId"]))
            {
               Name = data["name"].ToString(),
               Email = data["email"].ToString(),
               Username = data["username"].ToString(),
               Password = data["password"].ToString(),
               AboutSection = data["about_section"].ToString(),
            };
            users.Add(u);
         }
}
      return users;
   }
finally {
      dbConn?.Close();
   }
}

//Method to add a new user
   public bool InsertUser(User u)
   {
      NpgsqlConnection dbConn = null;
      try
      {
         dbConn = new NpgsqlConnection(ConnectionString);
         var cmd = dbConn.CreateCommand();
         cmd.CommandText = @"
         insert into Users
         (Name, Email, Username, Password, About_Section)
         values
         (@Name,@Email, @Username, @Password, @About_Section)
         ";
         //adding parameters in a better way
         cmd.Parameters.AddWithValue("@Name", NpgsqlDbType.Text, u.Name);
         cmd.Parameters.AddWithValue("@Email", NpgsqlDbType.Text, u.Email);
         cmd.Parameters.AddWithValue("@Username", NpgsqlDbType.Text, u.Username);
         cmd.Parameters.AddWithValue("@Password", NpgsqlDbType.Text, u.Password);
         cmd.Parameters.AddWithValue("@About_Section", NpgsqlDbType.Text, u.AboutSection);
         //will return true if all goes well
         bool result = InsertData(dbConn, cmd);
         return result;
      }
finally {
         dbConn?.Close();
      }
}

//Method to update user account 
   public bool UpdateUser(User u)
   {
      
      var dbConn = new NpgsqlConnection(ConnectionString);
      var cmd = dbConn.CreateCommand();
       
      if (string.IsNullOrEmpty(u.Password)){
         cmd.CommandText =@"
         update Users set
         Name=@Name,
         Email=@Email,
         Username=@Username,
         About_Section=@About_Section,
         where
         UserId = @UserId";
      }
      else {
         cmd.CommandText = @"
        update Users set
        Name=@Name,
        Email=@Email,
        Username=@Username,
        Password=@Password,
        About_Section=@About_Section
        where
        UserId = @UserId";
        cmd.Parameters.AddWithValue("@Password", NpgsqlDbType.Text, u.Password);
      }
      
      
      cmd.Parameters.AddWithValue("@Name", NpgsqlDbType.Text, u.Name);
      cmd.Parameters.AddWithValue("@Email", NpgsqlDbType.Text, u.Email);
      cmd.Parameters.AddWithValue("@UserId", NpgsqlDbType.Integer, u.UserId);
      cmd.Parameters.AddWithValue("@Username", NpgsqlDbType.Text, u.Username);
      cmd.Parameters.AddWithValue("@About_Section", NpgsqlDbType.Text, u.AboutSection);

      bool result = UpdateData(dbConn, cmd);
      return result;
   }
   

   //Method to delete user
   public bool DeleteUser(int UserId)
   {
      var dbConn = new NpgsqlConnection(ConnectionString);
      var cmd = dbConn.CreateCommand();
      cmd.CommandText = @"
      delete from Users
      where UserId = @UserId
      ";
      //adding parameters in a better way
      cmd.Parameters.AddWithValue("@UserId", NpgsqlDbType.Integer, UserId);
      //will return true if all goes well
      bool result = DeleteData(dbConn, cmd);
      return result;
   }
}
