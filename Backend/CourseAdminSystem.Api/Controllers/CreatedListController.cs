using CourseAdminSystem.Model.Entities;
using CourseAdminSystem.Model.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CourseAdminSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CreatedListController : ControllerBase
    {
        protected CreatedListRepository Repository { get; }

        public CreatedListController(CreatedListRepository repository)
        {
            Repository = repository;
        }

        // Get a specific CreatedList entry by ID
        [HttpGet("{createdListId}")]
        public ActionResult<CreatedList> GetCreatedList([FromRoute] int createdListId)
        {
            CreatedList createdList = Repository.GetCreatedListById(createdListId);
            if (createdList == null)
            {
                return NotFound();
            }
            return Ok(createdList);
        }

        // Get all CreatedList entries
        [HttpGet]
        public ActionResult<IEnumerable<CreatedList>> GetCreatedLists()
        {
            return Ok(Repository.GetCreatedLists());
        }

        // Add a new CreatedList entry
        [HttpPost]
        public ActionResult Post([FromBody] CreatedList createdList)
        {
            if (createdList == null)
            {
                return BadRequest("Created List information is not correct");
            }

            bool status = Repository.InsertCreatedList(createdList);
            if (status)
            {
                return Ok();
            }
            return BadRequest("Failed to add the created list entry.");
        }

        // Update an existing CreatedList entry
        [HttpPut]
        public ActionResult UpdateCreatedList([FromBody] CreatedList createdList)
        {
            if (createdList == null)
            {
                return BadRequest("Created list information is not correct");
            }

            CreatedList existingCreatedList = Repository.GetCreatedListById(createdList.CreatedListId);
            if (existingCreatedList == null)
            {
                return NotFound($"CreatedList with id {createdList.CreatedListId} not found");
            }

            bool status = Repository.UpdateCreatedList(createdList);
            if (status)
            {
                return Ok();
            }
            return BadRequest("Failed to update the created list entry.");
        }

        // Delete a CreatedList entry by ID
        [HttpDelete("{createdListId}")]
        public ActionResult DeleteCreatedList([FromRoute] int createdListId)
        {
            CreatedList existingCreatedList = Repository.GetCreatedListById(createdListId);
            if (existingCreatedList == null)
            {
                return NotFound($"CreatedList with id {createdListId} not found");
            }

            bool status = Repository.DeleteFromCreatedList(createdListId);
            if (status)
            {
                return NoContent();
            }
            return BadRequest($"Unable to delete CreatedList with id {createdListId}");
        }
    }
}

