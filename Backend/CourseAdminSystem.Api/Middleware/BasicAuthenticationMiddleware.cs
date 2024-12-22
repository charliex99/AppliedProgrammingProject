using System.Text;
using Microsoft.AspNetCore.Authorization;
using Npgsql;
namespace CourseAdminSystem.API.Middleware;

using System.Runtime.CompilerServices;
using Npgsql;
public class BasicAuthenticationMiddleware {
   private readonly RequestDelegate _next;
   private readonly string _connectionString = "Host=localhost:5432;Username=postgres;Password=;Database=AppliedProgrammingProject";
   public BasicAuthenticationMiddleware(RequestDelegate next) {
      _next = next;
}
   public async Task InvokeAsync(HttpContext context) {
   
      Console.WriteLine($"Request received. Headers: {context.Request.Headers}");

      // Bypass authentication for [AllowAnonymous]
      if (context.GetEndpoint()?.Metadata.GetMetadata<IAllowAnonymous>() != null) {
         Console.WriteLine("Bypassing authentication for [AllowAnonymous]");
         await _next(context);
         return;
}
      // Retrieve the Request Header 
      string? authHeader = context.Request.Headers["Authorization"];
      if (authHeader == null) {
         context.Response.StatusCode = 401;
         await context.Response.WriteAsync("Authorization Header value not provided");
         return;
}

//Handle retrieved Header 
var auth = authHeader.Split(' ')[1];
      var usernameAndPassword = Encoding.UTF8.GetString(Convert.FromBase64String(auth));
      var username = usernameAndPassword.Split(':')[0];
      var password = usernameAndPassword.Split(':')[1];
   Console.WriteLine($"Extracted Username: {username}");
   Console.WriteLine($"Extracted Password: {password}");


if (await ValidateUser(username, password))
{
   await _next(context);
}
else {
          context.Response.StatusCode = 401;
          await context.Response.WriteAsync("Incorrect credentials provided");
          return;
   } 
}


//Method to compare username & password with database entry 
 private async Task<bool> ValidateUser(string username, string password)
{
      Console.WriteLine($"Validating user: {username} with password: {password}");

      await using var dbConn = new NpgsqlConnection(_connectionString);
      await dbConn.OpenAsync();

      var cmd = dbConn.CreateCommand();
      cmd.CommandText = "SELECT password FROM users WHERE username = @Username";
      cmd.Parameters.AddWithValue("@Username", username);

      await using var reader = await cmd.ExecuteReaderAsync();
      if (await reader.ReadAsync())
      {
         var storedPassword = reader ["password"].ToString();

         Console.WriteLine($"Password from DB: {storedPassword}");
         Console.WriteLine($"Provided password: {password}");

         return storedPassword == password; 
      }
      else{
         Console.WriteLine("No matching user found in the database.");
      }

      return false;
   
}
}

 public static class BasicAuthenticationMiddlewareExtensions {
    public static IApplicationBuilder UseBasicAuthenticationMiddleware(this
 IApplicationBuilder builder) {
       return builder.UseMiddleware<BasicAuthenticationMiddleware>();
    }
}


