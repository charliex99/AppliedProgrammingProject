using CourseAdminSystem.API.Model;
using System;
using CourseAdminSystem.Model.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration.UserSecrets;
using Npgsql;
using NpgsqlTypes;
using System.Data.Common;

namespace CourseAdminSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class LoginController : ControllerBase
    {
        private readonly string _connectionString; // Your database connection string

        public LoginController()
        {
            // Assuming the connection string is in your appsettings.json or environment variable
            _connectionString = "Host=localhost:5432;Username=postgres;Password=;Database=AppliedProgrammingProject";
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult> Login([FromBody] Login credentials)
        {
            //delete later
            Console.WriteLine($"Received login request for Username: {credentials.Username}");
            try{

                var username = credentials?.Username;
                var password = credentials?.Password;

                if (credentials == null || string.IsNullOrEmpty(credentials.Username) || string.IsNullOrEmpty(credentials.Password))
                {
                    return BadRequest("username and password are required.");
                }
                

                // Check the username and password against the database
                var user = await ValidateUser(credentials.Username, credentials.Password);
                Console.WriteLine(user);

                if (user != null)
                {
                    // 1. Concatenate username and password with a semicolon
                    var text = $"{credentials.Username}:{credentials.Password}";              

                    // 2. Base64encode the above
                    var bytes = System.Text.Encoding.UTF8.GetBytes(text);
                    var encodedCredentials = Convert.ToBase64String(bytes);

                    // 3. Prefix with Basic
                    var headerValue = $"Basic {encodedCredentials}";

                    return Ok(new { 
                        headervalue = headerValue, 
                        Profile = new 
                        {
                            user.Username, 
                            user.Email,
                            user.UserId
                        }
                    
                    });
                }

                return Unauthorized("Invalid username or password.");
            }

            catch (Exception ex)
            {
                Console.WriteLine($"Error in LoginController method: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }


        }

        
        // Method to validate the user against the database
        private async Task<User> ValidateUser(string username, string password)
        {
            NpgsqlConnection dbConn = null;

            try{
                dbConn = new NpgsqlConnection (_connectionString);
                await dbConn.OpenAsync();

                var cmd = dbConn.CreateCommand();
                cmd.CommandText = "SELECT username, password, email, userid FROM Users WHERE username = @Username";
                cmd.Parameters.AddWithValue("@Username", username);
                //var data = GetData(dbConn, cmd);

                using (var reader = await cmd.ExecuteReaderAsync())
                {
                    if (await reader.ReadAsync()) {

                        //string username_ = reader["username"].ToString();
                        string dbpassword = reader["password"].ToString();
                        //string email_ = reader["email"].ToString();
                        //int userid_ = Convert.ToInt32(reader["userid"]);

                        if (dbpassword == password)
                        {
                            return new User
                                {
                                //UserId = userid_,    
                                //Username = username_,
                                //Password = password_,
                                //Email = email_
                                UserId = Convert.ToInt32(reader["userid"]),
                                Username = reader["username"].ToString(),
                                Password = dbpassword,
                                Email = reader["email"].ToString()
                                
                                };
                    
                        }
                    }
                }
               
            }
            catch(Exception ex)
            {
                Console.WriteLine($"Error in ValidateUser method: {ex.Message}");
                
            }

            finally
            {
                if (dbConn != null)
                {
                    await dbConn.CloseAsync();  // Change to async method
                }
            }

            return null;
        }

        
        protected NpgsqlDataReader GetData(NpgsqlConnection conn, NpgsqlCommand cmd)
        {
        conn.Open();
        return cmd.ExecuteReader();
        }
        

    }
}

