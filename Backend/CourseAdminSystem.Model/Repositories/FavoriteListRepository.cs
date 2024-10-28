using System;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using Npgsql;
using NpgsqlTypes;

namespace CourseAdminSystem.Model.Repositories;

    public class FavoriteListRepository : BaseRepository
    {
        public FavoriteListRepository(IConfiguration configuration) : base(configuration) { }

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

        public List<int> GetFavoriteRecipesByUser(int userId)
        {
            NpgsqlConnection dbConn = null;
            var favoriteRecipes = new List<int>();
            try
            {
                dbConn = new NpgsqlConnection(ConnectionString);
                var cmd = dbConn.CreateCommand();
                cmd.CommandText = @"
                    SELECT recipe_id FROM favorite_list
                    WHERE user_id = @userId";
                cmd.Parameters.AddWithValue("@userId", NpgsqlDbType.Integer, userId);
                var data = GetData(dbConn, cmd);
                if (data != null)
                {
                    while (data.Read())
                    {
                        favoriteRecipes.Add(Convert.ToInt32(data["recipe_id"]));
                    }
                }
                return favoriteRecipes;
            }
            finally
            {
                dbConn?.Close();
            }
        }

        public List<int> IsRecipeFavorite(int userId)
        {
            NpgsqlConnection dbConn = null;
            var favoriteRecipes = new List<int>();
            try
            {
                dbConn = new NpgsqlConnection(ConnectionString);
                var cmd = dbConn.CreateCommand();
                cmd.CommandText = @"
                    SELECT favorite_list.user_id, recipes.recipe_name
                    FROM favorite_list 
                    Inner join recipes On recipes.recipe_id = favorite_list.recipe_id
                    Where user_id = @userId";   
                
                cmd.Parameters.AddWithValue("@userId", NpgsqlDbType.Integer, userId);
                //cmd.Parameters.AddWithValue("@recipeId", NpgsqlDbType.Integer, recipeId);
                var data = GetData(dbConn, cmd);
                if (data != null)
                {
                    while (data.Read())
                    {
                        favoriteRecipes.Add(Convert.ToInt32(data["recipe_id"]));
                    }
                }
                return favoriteRecipes;
            }
            finally
            {
                dbConn?.Close();
            }
        }
    }

