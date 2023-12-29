//using ITMS.Server.DTO;
//using ITMS.Server.Services;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;

//namespace ITMS.Server.Controller
//{
//    [ApiController]
//    [Route("api/categories")]
//    public class CategoryController : ControllerBase
//    {
//        private readonly ICategoryService _categoryService;

//        public CategoryController(ICategoryService categoryService)
//        {
//            _categoryService = categoryService;
//        }

//        [HttpGet("{categoryName}")]
//        public ActionResult<CategoryDTO> GetCategoryByName(string categoryName)
//        {
//            var category = _categoryService.GetCategoryByName(categoryName);

//            if (category == null)
//            {
//                return NotFound();
//            }

//            return Ok(category);
//        }

//        [HttpGet("range")]
//        public ActionResult<List<CategoryDTO>> GetCategoriesInRange([FromQuery] string startName, [FromQuery] string endName)
//        {
//            var categories = _categoryService.GetCategoriesInRange(startName, endName);

//            if (categories == null || categories.Count == 0)
//            {
//                return NotFound();
//            }

//            return Ok(categories);
//        }
//    }
//}
