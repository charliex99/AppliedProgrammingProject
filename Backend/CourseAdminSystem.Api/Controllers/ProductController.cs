using CourseAdminSystem.Model.Entities;
using CourseAdminSystem.Model.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CourseAdminSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        protected ProductRepository Repository { get; }

        public ProductController(ProductRepository repository)
        {
            Repository = repository;
        }

        // Get a specific product by ID
        [HttpGet("{productId}")]
        public ActionResult<Product> GetProduct([FromRoute] int productId)
        {
            Product product = Repository.GetProductById(productId);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        // Get all products
        [HttpGet]
        public ActionResult<IEnumerable<Product>> GetProducts()
        {
            return Ok(Repository.GetProducts());
        }

        // Add a new product
        [HttpPost]
        public ActionResult Post([FromBody] Product product)
        {
            if (product == null)
            {
                return BadRequest("Product information is not correct");
            }

            bool status = Repository.InsertProduct(product);
            if (status)
            {
                return Ok();
            }
            return BadRequest();
        }

        // Update an existing product
        [HttpPut]
        public ActionResult UpdateProduct([FromBody] Product product)
        {
            if (product == null)
            {
                return BadRequest("Product information is not correct");
            }

            Product existingProduct = Repository.GetProductById(product.ProductId);
            if (existingProduct == null)
            {
                return NotFound($"Product with id {product.ProductId} not found");
            }

            bool status = Repository.UpdateProduct(product);
            if (status)
            {
                return Ok();
            }
            return BadRequest("Something went wrong");
        }

        // Delete a product by ID
        [HttpDelete("{productId}")]
        public ActionResult DeleteProduct([FromRoute] int productId)
        {
            Product existingProduct = Repository.GetProductById(productId);
            if (existingProduct == null)
            {
                return NotFound($"Product with id {productId} not found");
            }

            bool status = Repository.DeleteProduct(productId);
            if (status)
            {
                return NoContent();
            }
            return BadRequest($"Unable to delete product with id {productId}");
        }
    }
}