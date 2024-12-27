using CourseAdminSystem.Model.Entities;
using CourseAdminSystem.Model.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Amazon.S3;
using Amazon.S3.Transfer;
using System.IO;


namespace CourseAdminSystem.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RecipeController : ControllerBase
    {
        protected RecipeRepository Repository { get;}
        protected CreatedListRepository Repository1 {get;}
        private readonly IAmazonS3 _s3Client; 
        private readonly string _bucketname;


        public RecipeController(RecipeRepository repository, CreatedListRepository createdListRepository, IAmazonS3 s3Client, IConfiguration configuration){
            Repository = repository;
            Repository1 = createdListRepository;
            _s3Client = s3Client;
            _bucketname = configuration["AWS:BucketName"];
        }


        //Connecting with the Amazon Bucket 
        [HttpPost("uploadImage/{recipe_id}")]
        public async Task<IActionResult> UploadRecipeImage(int recipe_id, IFormFile file)
        //public async ActionResult UploadRecipeImage(int recipe_id, IFormFile file)
        {
            if (file == null )
            {
                return BadRequest("No file provided.");
            }

            var recipe = Repository.GetRecipebyId(recipe_id);
            if (recipe == null)
            {
                return NotFound($"Recipe with id {recipe_id} not found");
            }

            var keyName = Guid.NewGuid() + Path.GetExtension(file.FileName);
            using var stream = file.OpenReadStream();
            var uploadRequest = new TransferUtilityUploadRequest
            {
                InputStream = stream, 
                Key = keyName, 
                BucketName = _bucketname, 
                ContentType = file.ContentType
            };

            var transferUtility = new TransferUtility(_s3Client);
            await transferUtility.UploadAsync(uploadRequest);

            recipe.RecipePicture = $"https://{_bucketname}.s3.amazonaws.com/{keyName}";

            if (Repository.UpdateRecipe(recipe))
            {
                return Ok (new {Message = "Immage upload successful.", Url = recipe.RecipePicture});
            }

            return BadRequest("Failed to update recipe wiht uploaded image");
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
        public ActionResult Post ( [FromBody] RecipeCreate recipeCreate){
            if (string.IsNullOrEmpty(recipeCreate.RecipeName) || string.IsNullOrEmpty(recipeCreate.RecipeInstruct) || string.IsNullOrEmpty(recipeCreate.RecipeIngredients)|| string.IsNullOrEmpty(recipeCreate.RecipeStory)|| string.IsNullOrEmpty(recipeCreate.RecipeWord))
            {
                return BadRequest("Recipe name, instructions, ingredients, story or word are missing");
            }

            string recipePicture = string.IsNullOrEmpty(recipeCreate.RecipePicture) ? null : recipeCreate.RecipePicture;


            int recipeId = Repository.InsertRecipe(recipeCreate.RecipeName, recipeCreate.RecipeInstruct, recipeCreate.RecipeIngredients, recipeCreate.RecipeStory, recipeCreate.RecipeWord, recipePicture);
            
            bool status = Repository1.InsertCreatedList(recipeId, recipeCreate.UserId);
            if (status)
            {
                return Ok(new {recipeId = recipeId});
            }

            return BadRequest();
        }


        [HttpPut]
        public ActionResult UpdateRecipe( [FromBody] Recipe recipe)
        {
            Console.WriteLine($"Incoming Recipe: {(recipe)}"); 

            if (recipe == null)
            {
                return BadRequest("Recipe info not correct");
            }

            Recipe existingRecipes = Repository.GetRecipebyId(recipe.RecipeId);
            if (existingRecipes == null)
            {
                return NotFound($"Recipe with id {recipe.RecipeId} not found");
            }

            if (string.IsNullOrEmpty(recipe.RecipePicture))
            {
                recipe.RecipePicture = existingRecipes.RecipePicture;
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

