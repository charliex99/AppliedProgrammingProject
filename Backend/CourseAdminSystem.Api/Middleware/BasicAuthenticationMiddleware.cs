using System.Text;
using Microsoft.AspNetCore.Authorization;
using Npgsql;
namespace CourseAdminSystem.API.Middleware;

using System.Runtime.CompilerServices;
using Npgsql;
public class BasicAuthenticationMiddleware {
   // Ideally, we would want to verify them against a database
//private const string USERNAME = "hello"; private const string PASSWORD = "hello";
   private readonly RequestDelegate _next;
   private readonly string _connectionString = "Host=localhost:5432;Username=postgres;Password=;Database=AppliedProgrammingProject";
   public BasicAuthenticationMiddleware(RequestDelegate next) {
      _next = next;
}
   public async Task InvokeAsync(HttpContext context) {
      //take out
      Console.WriteLine($"Request received. Headers: {context.Request.Headers}");

      // Bypass authentication for [AllowAnonymous]
      if (context.GetEndpoint()?.Metadata.GetMetadata<IAllowAnonymous>() != null) {
         Console.WriteLine("Bypassing authentication for [AllowAnonymous]");
         await _next(context);
         return;
}
      // 1. Try to retrieve the Request Header containing our secret value
      string? authHeader = context.Request.Headers["Authorization"];
      // 2. If not found, then return with Unauthorzied response
      if (authHeader == null) {
         context.Response.StatusCode = 401;
         await context.Response.WriteAsync("Authorization Header value not provided");
         return;
}

// 3. Extract the username and password from the value by splitting it on space, // as the value looks something like 'Basic am9obi5kb2U6VmVyeVNlY3JldCE='
var auth = authHeader.Split(' ')[1];
      // 4. Convert it form Base64 encoded text, back to normal text
      var usernameAndPassword = Encoding.UTF8.GetString(Convert.FromBase64String(auth));
      // 5. Extract username and password, which are separated by a semicolon
      var username = usernameAndPassword.Split(':')[0];
      var password = usernameAndPassword.Split(':')[1];
       // 6. Check if both username and password are correct
//if (username == USERNAME && password == PASSWORD) { await _next(context);
   Console.WriteLine($"Extracted Username: {username}");
    Console.WriteLine($"Extracted Password: {password}");


if (await ValidateUser(username, password))
{
   await _next(context);
}
else {
          // If not, then send Unauthorized response
          context.Response.StatusCode = 401;
          await context.Response.WriteAsync("Incorrect credentials provided");
          return;
   } 
}


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


