namespace CourseAdminSystem.Model.Repositories;

using System;
using System.Collections.Generic;
using CourseAdminSystem.Model.Entities;
using Microsoft.Extensions.Configuration;
using Npgsql;
using NpgsqlTypes;

public class ProductRepository : BaseRepository
{
    public ProductRepository(IConfiguration configuration) : base(configuration)
    {
    }

    // Retrieve a product by ID
    public Product GetProductById(int productId)
    {
        NpgsqlConnection dbConn = null;
        try
        {
            // Create a new connection for the database
            dbConn = new NpgsqlConnection(ConnectionString);
            var cmd = dbConn.CreateCommand();
            cmd.CommandText = "select * from product where product_id = @id";
            cmd.Parameters.Add("@id", NpgsqlDbType.Integer).Value = productId;

            var data = GetData(dbConn, cmd);
            if (data != null && data.Read())
            {
                return new Product(Convert.ToInt32(data["product_id"]))
                {
                    ProductName = data["product_name"].ToString()
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
    public List<Product> GetProducts()
    {
        NpgsqlConnection dbConn = null;
        var products = new List<Product>();
        try
        {
            dbConn = new NpgsqlConnection(ConnectionString);
            var cmd = dbConn.CreateCommand();
            cmd.CommandText = "select * from product";

            var data = GetData(dbConn, cmd);
            while (data != null && data.Read())
            {
                var product = new Product(Convert.ToInt32(data["product_id"]))
                {
                    ProductName = data["product_name"].ToString()
                };
                products.Add(product);
            }
            return products;
        }
        finally
        {
            dbConn?.Close();
        }
    }

    // Insert a new product
    public bool InsertProduct(Product product)
    {
        NpgsqlConnection dbConn = null;
        try
        {
            dbConn = new NpgsqlConnection(ConnectionString);
            var cmd = dbConn.CreateCommand();
            cmd.CommandText = @"
            insert into product
            (product_name)
            values
            (@productName)
            ";
            cmd.Parameters.AddWithValue("@productName", NpgsqlDbType.Text, product.ProductName);
            return InsertData(dbConn, cmd);
        }
        finally
        {
            dbConn?.Close();
        }
    }

    // Update an existing product
    public bool UpdateProduct(Product product)
    {
        var dbConn = new NpgsqlConnection(ConnectionString);
        var cmd = dbConn.CreateCommand();
        cmd.CommandText = @"
        update product set
        product_name = @productName
        where product_id = @productId";
        cmd.Parameters.AddWithValue("@productName", NpgsqlDbType.Text, product.ProductName);
        cmd.Parameters.AddWithValue("@productId", NpgsqlDbType.Integer, product.ProductId);
        return UpdateData(dbConn, cmd);
    }

    // Delete a product by ID
    public bool DeleteProduct(int productId)
    {
        var dbConn = new NpgsqlConnection(ConnectionString);
        var cmd = dbConn.CreateCommand();
        cmd.CommandText = @"
        delete from product
        where product_id = @productId";
        cmd.Parameters.AddWithValue("@productId", NpgsqlDbType.Integer, productId);
        return DeleteData(dbConn, cmd);
    }
}
