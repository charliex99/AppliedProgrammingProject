using CourseAdminSystem.Model.Entities;
using CourseAdminSystem.Model.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;


namespace CourseAdminSystem.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RecipeController : ControllerBase
    {
        protected RecipeRepository Repository { get;}
        protected CreatedListRepository Repository1 {get;}


        public RecipeController(RecipeRepository repository, CreatedListRepository createdListRepository){
            Repository = repository;
            Repository1 = createdListRepository;
        }

        [HttpGet("{recipe_id}")]
        
        public ActionResult<Recipe> GetRecipe( [FromRoute] int recipe_id)
        {
            Recipe recipe = Repository.GetRecipebyId(recipe_id);
            if (recipe == null){
                return NotFound();
            }

            return Ok(recipe);
        }

        [HttpGet]
        
        public ActionResult<IEnumerable<Recipe>> GetRecipes()
        {
            return Ok(Repository.GetRecipes());
        }

        [HttpPost]
        //public ActionResult Post( [FromBody] RecipeCreate recipecreate){
        public ActionResult Post ( [FromBody] RecipeCreate recipeCreate){
            /*if (recipe_name == null || recipe_instruct == null )
            {
                return BadRequest("Recipe info not correct");
            }*/

            if (string.IsNullOrEmpty(recipeCreate.RecipeName) || string.IsNullOrEmpty(recipeCreate.RecipeInstruct) || string.IsNullOrEmpty(recipeCreate.RecipeIngredients))
            {
                return BadRequest("Recipe name, instructions or ingredients are missing");
            }

              /*if (recipe.UserId == 0) // Make sure userId is valid
            {
                return BadRequest("userId is missing or invalid");
            }*/


            int recipeId = Repository.InsertRecipe(recipeCreate.RecipeName, recipeCreate.RecipeInstruct, recipeCreate.RecipeIngredients);
            
            //bool status1 = Repository1.InsertCreatedList(10, 10);
            bool status = Repository1.InsertCreatedList(recipeId, recipeCreate.UserId);
            if (status)
            {
                return Ok();
            }

            return BadRequest();
        }

        [HttpPut]
        public ActionResult UpdateRecipe( [FromBody] Recipe recipe)
        {
            if (recipe == null)
            {
                return BadRequest("Recipe info not correct");
            }

            Recipe existingRecipes = Repository.GetRecipebyId(recipe.RecipeId);
            if (existingRecipes == null)
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
            Recipe existingRecipes = Repository.GetRecipebyId(recipe_id);
            if(existingRecipes == null)
            {
                return NotFound($"Recipe with id {recipe_id} not found");
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

