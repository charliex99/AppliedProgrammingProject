namespace CourseAdminSystem.Model.Repositories;
using CourseAdminSystem.Model.Entities;
using System;
using System.Reflection.Metadata.Ecma335;
using Microsoft.Extensions.Configuration; 
using Npgsql; 
using NpgsqlTypes;

public class RecipeRepository: BaseRepository
{
    public RecipeRepository(IConfiguration configuration) : base(configuration)
    {
    }

//Method to get recipes based on ID
    public Recipe GetRecipebyId(int id)
    {
        NpgsqlConnection dbConn = null;
        try
        {
            dbConn = new NpgsqlConnection(ConnectionString);

            var cmd = dbConn.CreateCommand();
            cmd.CommandText = "SELECT recipes.*, users.username, users.userid FROM recipes JOIN created_list ON recipes.recipe_id = created_list.recipe_id JOIN users ON created_list.user_id = users.userid where recipes.recipe_id = @id";

            cmd.Parameters.Add("@id", NpgsqlDbType.Integer).Value = id;

            var data = GetData(dbConn, cmd);

            if (data != null)
            {
                if (data.Read())
                {
                    return new Recipe(Convert.ToInt32(data["recipe_id"]))
                    {
                        RecipeName = data["recipe_name"].ToString(),
                        RecipeInstruct = data["recipe_instruct"].ToString(),
                        RecipeIngredients = data["recipe_ingredients"].ToString(),
                        RecipeStory = data["recipe_story"].ToString(),
                        RecipeWord = data["recipe_word"].ToString(),
                        RecipePicture = data["recipe_picture"].ToString(),
                        user = new User{
                            Username = data["username"].ToString(), 
                            UserId = (int)data["userid"]
                        }

                    };
                }
            }

            return null;
        }

        finally
        {
            dbConn?.Close();
        }
    }

// Method to retrieve a list of all recipes
    public List<Recipe> GetRecipes()
    {
        NpgsqlConnection dbConn = null;
        var recipes = new List<Recipe>();
        try
        {
            dbConn = new NpgsqlConnection(ConnectionString);

            var cmd = dbConn.CreateCommand();
            cmd.CommandText = "SELECT recipes.*, users.username, users.userid FROM recipes JOIN created_list ON recipes.recipe_id = created_list.recipe_id JOIN users ON created_list.user_id = users.userid";
            var data = GetData(dbConn, cmd);

            if (data != null)
            {
                while (data.Read())
                {
                    Recipe r = new Recipe(Convert.ToInt32(data["recipe_id"]))
                    {
                        RecipeName = data["recipe_name"].ToString(),
                        RecipeInstruct = data["recipe_instruct"].ToString(),
                        RecipeIngredients = data["recipe_ingredients"].ToString(),
                        RecipeStory = data["recipe_story"].ToString(),
                        RecipeWord = data["recipe_word"].ToString(), 
                        RecipePicture = data["recipe_picture"].ToString(),
                        user = new User{
                            Username = data["username"].ToString(), 
                            UserId = (int)data["userid"]
                        }

                    };

                    recipes.Add(r);
                }
            }

            return recipes;
        }

        finally 
        {
            dbConn?.Close();
        }

    }

// Method to create recipe 
    public int InsertRecipe(string recipe_name, string recipe_instruct, string recipe_ingredients, string recipe_story, string recipe_word, string recipe_picture)
    {
        NpgsqlConnection dbConn = null; 
        try 
        {
            dbConn = new NpgsqlConnection(ConnectionString);
            var cmd = dbConn.CreateCommand();
            cmd.CommandText = @"
         insert into recipes
         (recipe_name, recipe_instruct, recipe_ingredients, recipe_story, recipe_word, recipe_picture)
         values
         (@recipe_name, @recipe_instruct, @recipe_ingredients, @recipe_story, @recipe_word, @recipe_picture)
         returning recipe_id
         ";
            cmd.Parameters.AddWithValue("@recipe_name", NpgsqlDbType.Text, recipe_name);
            cmd.Parameters.AddWithValue("@recipe_instruct", NpgsqlDbType.Text, recipe_instruct);
            cmd.Parameters.AddWithValue("@recipe_ingredients", NpgsqlDbType.Text, recipe_ingredients);
            cmd.Parameters.AddWithValue("@recipe_story", NpgsqlDbType.Text, recipe_story);
            cmd.Parameters.AddWithValue("@recipe_word", NpgsqlDbType.Text, recipe_word);
            cmd.Parameters.AddWithValue("@recipe_picture", NpgsqlDbType.Text, (object?) recipe_picture ?? DBNull.Value);

            var reader = GetData(dbConn, cmd);

            int recipeId = 0;
            if (reader.Read()) // Ensure there is data to read
             {
                recipeId = reader.GetInt32(0); // Get the 'id' from the first column
                
            }

            return recipeId;
            
            
            //bool result = InsertData(dbConn, cmd);
            //return result;
        }

        finally
        {
            dbConn?.Close();
        }
    }

//Update recipe
    public bool UpdateRecipe(Recipe r)
    {
        var dbConn = new NpgsqlConnection(ConnectionString);
        var cmd = dbConn.CreateCommand();
        cmd.CommandText = @"
        update recipes 
        set 
        recipe_name = @recipe_name,
        recipe_instruct = @recipe_instruct,
        recipe_ingredients = @recipe_ingredients,
        recipe_story = @recipe_story, 
        recipe_word = @recipe_word, 
        recipe_picture = @recipe_picture
        where recipe_id = @recipe_id";
        cmd.Parameters.AddWithValue("@recipe_instruct", NpgsqlDbType.Text, r.RecipeInstruct);
        cmd.Parameters.AddWithValue("@recipe_id", NpgsqlDbType.Integer, r.RecipeId);   
        cmd.Parameters.AddWithValue("@recipe_name", NpgsqlDbType.Text, r.RecipeName);
        cmd.Parameters.AddWithValue("@recipe_ingredients", NpgsqlDbType.Text, r.RecipeIngredients);
        cmd.Parameters.AddWithValue("@recipe_story", NpgsqlDbType.Text, r.RecipeStory);
        cmd.Parameters.AddWithValue("@recipe_word", NpgsqlDbType.Text, r.RecipeWord);
        cmd.Parameters.AddWithValue("@recipe_picture", NpgsqlDbType.Text, (object?)r.RecipePicture ?? DBNull.Value);

        bool result = UpdateData(dbConn, cmd);
        return result;        
    }

//Delete recipe entry (incl. favorite & created list entries based on recipe_id)
    public bool DeleteRecipe(int RecipeId)
    {
        var dbConn = new NpgsqlConnection(ConnectionString);
        var cmd = dbConn.CreateCommand();
        cmd.CommandText = @"delete from recipes where recipe_id =@recipe_id";

        cmd.Parameters.AddWithValue("@recipe_id", NpgsqlDbType.Integer, RecipeId);
        bool result = DeleteData(dbConn, cmd); 

        return result;
    }

    
    
}
