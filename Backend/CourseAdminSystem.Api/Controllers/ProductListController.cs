using CourseAdminSystem.Model.Entities;
using CourseAdminSystem.Model.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CourseAdminSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductListController : ControllerBase
    {
        protected ProductListRepository Repository { get; }

        public ProductListController(ProductListRepository repository)
        {
            Repository = repository;
        }

        // Get a specific product by ID
        [HttpGet("{productListId}")]
        public ActionResult<ProductList> GetProduct([FromRoute] int productListId)
        {
            ProductList productlist = Repository.GetProductListById(productListId);
            if (productlist == null)
            {
                return NotFound();
            }
            return Ok(productlist);
        }

        // Get all products
        [HttpGet]
        public ActionResult<IEnumerable<ProductList>> GetProductLists()
        {
            return Ok(Repository.GetProductLists());
        }

        // Add a new product
        [HttpPost]
        public ActionResult Post([FromBody] ProductList productList)
        {
            if (productList == null)
            {
                return BadRequest("Product information is not correct");
            }

            bool status = Repository.InsertProductList(productList);
            if (status)
            {
                return Ok();
            }
            return BadRequest();
        }

        // Update an existing product
        [HttpPut]
        public ActionResult UpdateProductList([FromBody] ProductList productList)
        {
            if (productList == null)
            {
                return BadRequest("Product information is not correct");
            }

            ProductList existingProductList = Repository.GetProductListById(productList.ProductId);
            if (existingProductList == null)
            {
                return NotFound($"Product with id {productList.ProductListId} not found");
            }

            bool status = Repository.UpdateProduct(productList);
            if (status)
            {
                return Ok();
            }
            return BadRequest("Something went wrong");
        }

        // Delete a product by ID
        [HttpDelete("{productListId}")]
        public ActionResult DeleteProductList([FromRoute] int productListId)
        {
            ProductList existingProductList = Repository.GetProductListById(productListId);
            if (existingProductList == null)
            {
                return NotFound($"Product with id {productListId} not found");
            }

            bool status = Repository.DeleteProduct(productListId);
            if (status)
            {
                return NoContent();
            }
            return BadRequest($"Unable to delete product with id {productListId}");
        }
    }
}