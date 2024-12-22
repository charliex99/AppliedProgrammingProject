using System;
using System.Collections.Generic;
using System.Threading.Channels;
using Microsoft.Extensions.Configuration;
using Microsoft.VisualBasic;
using CourseAdminSystem.Model;
using Npgsql;
using NpgsqlTypes;
using CourseAdminSystem.Model.Entities;

namespace CourseAdminSystem.Model.Repositories;

    public class FavoriteListRepository : BaseRepository
    {
        public FavoriteListRepository(IConfiguration configuration) : base(configuration) { }

//Method to add a new Favorite Recipe from a User into DB 
        public bool AddFavorite(int userId, int recipeId)
        {
            NpgsqlConnection dbConn = null;
            try
            {
                dbConn = new NpgsqlConnection(ConnectionString);
                var cmd = dbConn.CreateCommand();
                cmd.CommandText = @"
                    INSERT INTO favorite_list (user_id, recipe_id)
                    VALUES (@userId, @recipeId)";
                cmd.Parameters.AddWithValue("@userId", NpgsqlDbType.Integer, userId);
                cmd.Parameters.AddWithValue("@recipeId", NpgsqlDbType.Integer, recipeId);
                return InsertData(dbConn, cmd);
            }
            finally
            {
                dbConn?.Close();
            }
        }

//Method to remove a Favorite Recipe from a User from DB
        public bool RemoveFavorite(int userId, int recipeId)
        {
            NpgsqlConnection dbConn = null;
            try
            {
                dbConn = new NpgsqlConnection(ConnectionString);
                var cmd = dbConn.CreateCommand();
                cmd.CommandText = @"
                    DELETE FROM favorite_list
                    WHERE user_id = @userId AND recipe_id = @recipeId";
                cmd.Parameters.AddWithValue("@userId", NpgsqlDbType.Integer, userId);
                cmd.Parameters.AddWithValue("@recipeId", NpgsqlDbType.Integer, recipeId);
                return DeleteData(dbConn, cmd);
            }
            finally
            {
                dbConn?.Close();
            }
        }


//Method to check if a user has "liked" a specific recipe 
        public bool IsRecipeFavorite(int userId, int recipeId)
        {
            NpgsqlConnection dbConn = null;
            try
            {
                dbConn = new NpgsqlConnection(ConnectionString);
                var cmd = dbConn.CreateCommand();
                cmd.CommandText = @"
                    SELECT COUNT (*) > 0
                    FROM favorite_list
                    WHERE user_id = @userId AND recipe_id = @recipeId";
                cmd.Parameters.AddWithValue("@userId", NpgsqlDbType.Integer, userId);
                cmd.Parameters.AddWithValue("@recipeId", NpgsqlDbType.Integer, recipeId);  

                 using (var reader = GetData(dbConn, cmd))
                    {
                        if (reader.Read())
                         {
                            return reader.GetBoolean(0); // Assuming the result is a single boolean column
                            }
                        return false;
                    }
            }
            finally
            {
                dbConn?.Close();
            }
        }


//Get overview of recipes favorited by user depending on userId
        public List<Recipe> GetFavoriteRecipesByUser(int userId)
        {
            NpgsqlConnection dbConn = null;
            var recipes = new List<Recipe>();
            try
            {
                dbConn = new NpgsqlConnection(ConnectionString);
                var cmd = dbConn.CreateCommand();
                cmd.CommandText = @"
                    SELECT favorite_list.user_id, recipes.recipe_id, recipes.recipe_name, recipes.recipe_instruct, recipes.recipe_ingredients, recipes.recipe_story, recipes.recipe_word, recipes.recipe_picture
                    FROM favorite_list 
                    Inner join recipes On recipes.recipe_id = favorite_list.recipe_id
                    Where favorite_list.user_id = @userId";
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


        
        
    }

