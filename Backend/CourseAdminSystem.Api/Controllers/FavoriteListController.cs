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

        [HttpPost("add")]
        public ActionResult AddFavorite([FromQuery] int userId, [FromQuery] int recipeId)
        {
            bool status = Repository.AddFavorite(userId, recipeId);
            if (status)
            {
                return Ok("Recipe added to favorites.");
            }
            return BadRequest("Unable to add recipe to favorites.");
        }

        [HttpDelete("remove")]
        public ActionResult RemoveFavorite([FromQuery] int userId, [FromQuery] int recipeId)
        {
            bool status = Repository.RemoveFavorite(userId, recipeId);
            if (status)
            {
                return Ok("Recipe removed from favorites.");
            }
            return BadRequest("Unable to remove recipe from favorites.");
        }

        [HttpGet("user/{userId}")]
        public ActionResult<List<int>> GetFavoriteRecipesByUser([FromRoute] int userId)
        {
            var favoriteRecipes = Repository.GetFavoriteRecipesByUser(userId);
            if (favoriteRecipes == null || favoriteRecipes.Count == 0)
            {
                return NotFound("No favorite recipes found for the user.");
            }
            return Ok(favoriteRecipes);
        }

        [HttpGet("isFavorite")]
        public ActionResult<List<int>> IsRecipeFavorite([FromRoute] int userId)
        {
            var isFavorite = Repository.IsRecipeFavorite(userId);
            if (isFavorite == null || isFavorite.Count == 0)
            {
                return NotFound("No Favorite recipes found for the user.");
            }
            return Ok(isFavorite);
        }
    }
}
