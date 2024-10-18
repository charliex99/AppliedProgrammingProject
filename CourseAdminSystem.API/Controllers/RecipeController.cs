using CourseAdminSystem.Model.Entities;
using CourseAdminSystem.Model.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace CourseAdminSystem.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RecipeController : ControllerBase
    {
        protected RecipeRepository Repository{get;}

        public RecipeController(RecipeRepository repository){
            Repository = repository;
        }

        [HttpGet("{recipe_id}")]
        public ActionResult<Recipes> GetRecipes( [FromRoute] int recipe_id)
        {
            Recipes recipe = Repository.GetRecipebyId(recipe_id);
            if (recipe == null){
                return NotFound();
            }

            return Ok(recipe);
        }

        [HttpGet]
        public ActionResult<IEnumerable<Recipes>> GetRecipes()
        {
            return Ok(Repository.GetRecipes());
        }

        [HttpPost]
        public ActionResult Post( [FromBody] Recipes recipe){
            if (recipe == null)
            {
                return BadRequest("Recipe info not correct");
            }

            bool status = Repository.InsertRecipe(recipe);
            if (status)
            {
                return Ok();
            }

            return BadRequest();
        }

        [HttpPut]
        public ActionResult UpdateRecipe( [FromBody] Recipes recipe)
        {
            if (recipe == null)
            {
                return BadRequest("Recipe info not correct");
            }

            Recipes existinRecipes = Repository.GetRecipebyId(recipe.RecipeId);
            if (existinRecipes == null)
            {
                return NotFound($"Recipe with id {recipe.RecipeId} not found");
            }

            bool status = Repository.UpdateRecipe(recipe);
            if (status)
            {
                return Ok();
            }

            return BadRequest("Something went wrong");
        }

        [HttpDelete("{recipe_id}")]
        public ActionResult DeleteRecipe([FromRoute] int recipe_id){
            Recipes existingRecipes = Repository.GetRecipebyId(recipe_id);
            if(existingRecipes == null)
            {
                return NotFound($"Student with id {recipe_id} not found");
            }

            bool status = Repository.DeleteRecipe(recipe_id);
            if (status)
            {
                return NoContent();
            }

            return BadRequest($"Unable to delete student with id {recipe_id}");
        }

    }
}


