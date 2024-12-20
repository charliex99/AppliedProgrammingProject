namespace CourseAdminSystem.Model.Repositories;

using System;
using System.Reflection.Metadata.Ecma335;
using CourseAdminSystem.Model.Entities;
using Microsoft.Extensions.Configuration; 
using Npgsql; 
using NpgsqlTypes;

public class RecipeRepository: BaseRepository
{
    public RecipeRepository(IConfiguration configuration) : base(configuration)
    {
    }

    public Recipe GetRecipebyId(int id)
    {
        NpgsqlConnection dbConn = null;
        try
        {
            dbConn = new NpgsqlConnection(ConnectionString);

            var cmd = dbConn.CreateCommand();
            cmd.CommandText = "select * from recipes where recipe_id = @id";

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
                        RecipePicture = data["recipe_picture"].ToString()
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

    public List<Recipe> GetRecipes()
    {
        NpgsqlConnection dbConn = null;
        var recipes = new List<Recipe>();
        try
        {
            dbConn = new NpgsqlConnection(ConnectionString);

            var cmd = dbConn.CreateCommand();
            cmd.CommandText = "select * from recipes";

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
                        RecipePicture = data["recipe_picture"].ToString()

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
            cmd.Parameters.AddWithValue("@recipe_picture", NpgsqlDbType.Text, recipe_picture);

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
        recipe_picture = @recipe_picture,
        where recipe_id = @recipe_id";
        cmd.Parameters.AddWithValue("@recipe_instruct", NpgsqlDbType.Text, r.RecipeInstruct);
        cmd.Parameters.AddWithValue("@recipe_id", NpgsqlDbType.Integer, r.RecipeId);   
        cmd.Parameters.AddWithValue("@recipe_name", NpgsqlDbType.Text, r.RecipeName);
        cmd.Parameters.AddWithValue("@recipe_ingredients", NpgsqlDbType.Text, r.RecipeIngredients);
        cmd.Parameters.AddWithValue("@recipe_story", NpgsqlDbType.Text, r.RecipeStory);
        cmd.Parameters.AddWithValue("@recipe_word", NpgsqlDbType.Text, r.RecipeWord);
        cmd.Parameters.AddWithValue("@recipe_picture", NpgsqlDbType.Text, r.RecipePicture);

        bool result = UpdateData(dbConn, cmd);
        return result;        
    }

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
