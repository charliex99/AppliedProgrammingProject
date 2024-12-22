namespace CourseAdminSystem.Model.Repositories;
using System;
using System.Collections.Generic;
using CourseAdminSystem.Model.Entities;
using Microsoft.Extensions.Configuration;
using Npgsql;
using NpgsqlTypes;

public class CreatedListRepository : BaseRepository
{
    public CreatedListRepository(IConfiguration configuration) : base(configuration) { }

    // Retrieve a CreatedList entry by ID
    public CreatedList GetCreatedListById(int createdListId)
    {
        using var dbConn = new NpgsqlConnection(ConnectionString);
        var cmd = dbConn.CreateCommand();
        cmd.CommandText = "SELECT * FROM created_list WHERE created_list_id = @id";
        cmd.Parameters.Add("@id", NpgsqlDbType.Integer).Value = createdListId;

        var data = GetData(dbConn, cmd);
        if (data != null && data.Read())
        {
            return new CreatedList(Convert.ToInt32(data["created_list_id"]))
            {
                UserId = (int)data["user_id"],
                RecipeId = (int)data["recipe_id"],

            };
        }
        return null;
    }

    // Retrieve all CreatedList entries
    public List<Recipe> GetCreatedLists(int userId)
    {
        NpgsqlConnection dbConn = null;
            var recipes = new List<Recipe>();
            try{
                dbConn = new NpgsqlConnection(ConnectionString);
                var cmd = dbConn.CreateCommand();
                cmd.CommandText = @"
                SELECT created_list.user_id, recipes.recipe_id, recipes.recipe_name, recipes.recipe_instruct, recipes.recipe_ingredients, recipes.recipe_story, recipes.recipe_word, recipes.recipe_picture
                FROM created_list 
                Inner join recipes On recipes.recipe_id = created_list.recipe_id
                Where created_list.user_id = @userId";
                cmd.Parameters.AddWithValue("@userId", NpgsqlDbType.Integer, userId);
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



    // Insert a new CreatedList entry
    public bool InsertCreatedList( int recipe_id, int user_id)
    {
        
        using var dbConn = new NpgsqlConnection(ConnectionString);
        var cmd = dbConn.CreateCommand();
        cmd.CommandText = @"
            INSERT INTO created_list (user_id, recipe_id)
            VALUES (@userId, @recipeId)";

        cmd.Parameters.AddWithValue("@userId", NpgsqlDbType.Integer, user_id);
        cmd.Parameters.AddWithValue("@recipeId", NpgsqlDbType.Integer, recipe_id);
        

        return InsertData(dbConn, cmd);
    }

    // Update an existing CreatedList entry
    public bool UpdateCreatedList(CreatedList createdList)
    {
        using var dbConn = new NpgsqlConnection(ConnectionString);
        var cmd = dbConn.CreateCommand();
        cmd.CommandText = @"
            UPDATE created_list 
            SET user_id = @userId, recipe_id = @recipeId 
            WHERE created_list_id = @createdListId";

        cmd.Parameters.AddWithValue("@createdListId", NpgsqlDbType.Integer, createdList.CreatedListId);
        cmd.Parameters.AddWithValue("@userId", NpgsqlDbType.Integer, createdList.UserId);
        cmd.Parameters.AddWithValue("@recipeId", NpgsqlDbType.Integer, createdList.RecipeId);
       

        return UpdateData(dbConn, cmd);
    } 

    // Delete a CreatedList entry by CreatedList ID
    public bool DeleteFromCreatedList(int createdListId)
    {
        using var dbConn = new NpgsqlConnection(ConnectionString);
        var cmd = dbConn.CreateCommand();
        cmd.CommandText = "DELETE FROM created_list WHERE created_list_id = @createdListId";
        cmd.Parameters.AddWithValue("@createdListId", NpgsqlDbType.Integer, createdListId);

        return DeleteData(dbConn, cmd);
    } 
}

