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
        private readonly string _connectionString; 

        public LoginController()
        {
            _connectionString = "Host=localhost:5432;Username=postgres;Password=;Database=AppliedProgrammingProject";
        }


        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult> Login([FromBody] Login credentials)
        {
            
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
                    var text = $"{credentials.Username}:{credentials.Password}";              

                    var bytes = System.Text.Encoding.UTF8.GetBytes(text);
                    var encodedCredentials = Convert.ToBase64String(bytes);

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
        
                using (var reader = await cmd.ExecuteReaderAsync())
                {
                    if (await reader.ReadAsync()) {
     
                        string dbpassword = reader["password"].ToString();

                        if (dbpassword == password)
                        {
                            return new User
                                {
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
                    await dbConn.CloseAsync();  
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

