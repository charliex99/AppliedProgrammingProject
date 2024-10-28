namespace CourseAdminSystem.Model.Repositories;

using System;
using System.Collections.Generic;
using CourseAdminSystem.Model.Entities;
using Microsoft.Extensions.Configuration;
using Npgsql;
using NpgsqlTypes;

public class ProductListRepository : BaseRepository
{
    public ProductListRepository(IConfiguration configuration) : base(configuration)
    {
    }

    // Retrieve a product by ID
    public ProductList GetProductListById(int productListId)
    {
        NpgsqlConnection dbConn = null;
        try
        {
            // Create a new connection for the database
            dbConn = new NpgsqlConnection(ConnectionString);
            var cmd = dbConn.CreateCommand();
            cmd.CommandText = "select * from product_list where product_list_id = @id";
            cmd.Parameters.Add("@id", NpgsqlDbType.Integer).Value = productListId;

            var data = GetData(dbConn, cmd);
            if (data != null && data.Read())
            {
                return new ProductList(Convert.ToInt32(data["product_list_id"]))
                {
                    ProductId = (int)data["product_id"],
                    RecipeId = (int)data["recipe_id"],
                    ProductAmount = (int)data["product_amount"]
                };
            }
            return null;
        }
        finally
        {
            dbConn?.Close();
        }
    }

    // Retrieve all products
    public List<ProductList> GetProductLists()
    {
        NpgsqlConnection dbConn = null;
        var productlist = new List<ProductList>();
        try
        {
            dbConn = new NpgsqlConnection(ConnectionString);
            var cmd = dbConn.CreateCommand();
            cmd.CommandText = "select * from product_list";

            var data = GetData(dbConn, cmd);
            while (data != null && data.Read())
            {
                var productList = new ProductList(Convert.ToInt32(data["product_list_id"]))
                {
                    ProductId = (int)data["product_id"],
                    RecipeId = (int)data["recipe_id"],
                    ProductAmount = (int)data["product_amount"]
                };
                productlist.Add(productList);
            }
            return productlist;
        }
        finally
        {
            dbConn?.Close();
        }
    }

    // Insert a new product
    public bool InsertProductList(ProductList productList)
    {
        NpgsqlConnection dbConn = null;
        try
        {
            dbConn = new NpgsqlConnection(ConnectionString);
            var cmd = dbConn.CreateCommand();
            cmd.CommandText = @"
            insert into product_list
            (recipe_id, product_id, product_amount)
            values
            (@recipeId, @productId, @productAmount)
            ";
            cmd.Parameters.AddWithValue("@recipeId", NpgsqlDbType.Integer, productList.RecipeId);
            cmd.Parameters.AddWithValue("@productId", NpgsqlDbType.Integer, productList.ProductId);
            cmd.Parameters.AddWithValue("@productAmount", NpgsqlDbType.Integer, productList.ProductAmount);
            return InsertData(dbConn, cmd);
        }
        finally
        {
            dbConn?.Close();
        }
    }

    // Update an existing product
    public bool UpdateProduct(ProductList productList)
    {
        var dbConn = new NpgsqlConnection(ConnectionString);
        var cmd = dbConn.CreateCommand();
        cmd.CommandText = @"
        update product_list 
        set
        product_id = @productId,
        recipe_id = @recipeId,
        product_amount = @productAmount
        where 
        product_list_id = @productListId";
        cmd.Parameters.AddWithValue("@productListId", NpgsqlDbType.Integer, productList.ProductListId);
        cmd.Parameters.AddWithValue("@recipeId", NpgsqlDbType.Integer, productList.RecipeId);
        cmd.Parameters.AddWithValue("@productId", NpgsqlDbType.Integer, productList.ProductId);
        cmd.Parameters.AddWithValue("@productAmount", NpgsqlDbType.Integer, productList.ProductAmount);
        return UpdateData(dbConn, cmd);
    }

    // Delete a product by ID
    public bool DeleteProduct(int productListId)
    {
        var dbConn = new NpgsqlConnection(ConnectionString);
        var cmd = dbConn.CreateCommand();
        cmd.CommandText = @"
        delete from product_list
        where product_list_id = @productListId";
        cmd.Parameters.AddWithValue("@productListId", NpgsqlDbType.Integer, productListId);
        return DeleteData(dbConn, cmd);
    }
}

