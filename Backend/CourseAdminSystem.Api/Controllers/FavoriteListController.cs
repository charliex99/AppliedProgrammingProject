using CourseAdminSystem.Model.Entities;
using CourseAdminSystem.Model.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CourseAdminSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoriteListController : ControllerBase
    {
        protected FavoriteListRepository Repository { get; }

        public FavoriteListController(FavoriteListRepository repository)
        {
            Repository = repository;
        }
        
        [HttpGet("isFavorite/{userId}/{recipeId}")]
        public ActionResult<bool> IsRecipeFavorite(int userId,int recipeId)
        {
            bool status = Repository.IsRecipeFavorite(userId, recipeId);
            if (status)
            {
                return Ok(status);
            }
            else {
            return NoContent();
            }

        }   

        
        [HttpPost("toggle/{userId}/{recipeId}")]
        public ActionResult ToggleFavorite( int userId, int recipeId)
        {
            bool status = Repository.AddFavorite(userId, recipeId);
            if (status)
            {
                return Ok("Recipe added to favorites.");
            }
            return BadRequest("Unable to add recipe to favorites.");
        }
        

        [HttpDelete("removeFavorite/{userId}/{recipeId}")]
        public ActionResult RemoveFavorite([FromRoute] int userId, [FromRoute] int recipeId)
        {
            bool status = Repository.RemoveFavorite(userId, recipeId);
            if (status)
            {
                return Ok("Recipe removed from favorites.");
            }
            else{
            return BadRequest("Unable to remove recipe from favorites.");
            }
        }

        [HttpGet("user/{userId}")]
        public ActionResult<List<Recipe>> GetFavoriteRecipesByUser([FromRoute] int userId)
        {
            var favoriteRecipes = Repository.GetFavoriteRecipesByUser(userId);
            if (favoriteRecipes == null || favoriteRecipes.Count == 0)
            {
                return NotFound("No favorite recipes found for the user.");
            }
            return Ok(favoriteRecipes);
        }

        
    }
}
