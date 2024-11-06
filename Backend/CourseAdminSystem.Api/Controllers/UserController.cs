using CourseAdminSystem.Model.Entities;
using CourseAdminSystem.Model.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
namespace CourseAdminSystem.API.Controllers
{
     [Route("api/[controller]")]
     [ApiController]
     public class UserController : ControllerBase
     {
         protected UserRepository Repository {get;}
         public UserController(UserRepository repository) {
             Repository = repository;
            }
         [HttpGet("{UserId}")]
         public ActionResult<User> GetUser([FromRoute] int UserId)
         {
             User user = Repository.GetUserById(UserId);
             if (user == null) {
                 return NotFound();
             }
             return Ok(user);
         }
         [HttpGet]
         public ActionResult<IEnumerable<User>> GetUsers()
         {
             return Ok(Repository.GetUsers());
         }
    [HttpPost]
    public ActionResult Post([FromBody] User User) {
    if (User == null)
    {
        return BadRequest("User info not correct");
    }
    bool status = Repository.InsertUser(User);
    if (status)
    {
        return Ok();
    }
    return BadRequest();
}
[HttpPut]
public ActionResult UpdateUser([FromBody] User User)
{
    if (User == null)
    {
        return BadRequest("User info not correct");
    }
    User existinUser = Repository.GetUserById(User.UserId);
    if (existinUser == null)
    {
        return NotFound($"User with id {User.UserId} not found");
    }
    bool status = Repository.UpdateUser(User);
    if (status)
    {
        return Ok();
    }
    return BadRequest("Something went wrong");
}
[HttpDelete("{UserId}")]
public ActionResult DeleteUser([FromRoute] int UserId) {
    User existingUser = Repository.GetUserById(UserId);
    if (existingUser == null)
    {
        return NotFound($"Student with id {UserId} not found");
             }
             bool status = Repository.DeleteUser(UserId);
             if (status)
             {
                 return NoContent();
             }
             return BadRequest($"Unable to delete student with id {UserId}");
         }
     }
} 