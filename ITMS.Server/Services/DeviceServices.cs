//using ITMS.Server.DTO;
//using ITMS.Server.Models;

//namespace ITMS.Server.Services
//{
   

//public interface ICategoryService
//{
//    CategoryDTO GetCategoryByName(string categoryName);
//    List<CategoryDTO> GetCategoriesInRange(string startName, string endName);
//}

//public class CategoryService : ICategoryService
//{
//    private readonly YourDbContext _dbContext; // Replace YourDbContext with your actual DbContext class

//    public CategoryService(YourDbContext dbContext)
//    {
//        _dbContext = dbContext;
//    }

//    public CategoryDTO GetCategoryByName(string categoryName)
//    {
//        var categoryEntity = _dbContext.Categories
//            .Include(c => c.CategoryType)
//            .FirstOrDefault(c => c.Name == categoryName);

//        return categoryEntity != null ? MapToDTO(categoryEntity) : null;
//    }

//    public List<CategoryDTO> GetCategoriesInRange(string startName, string endName)
//    {
//        var categoriesEntities = _dbContext.Categories
//            .Include(c => c.CategoryType)
//            .Where(c => string.Compare(c.Name, startName) >= 0 && string.Compare(c.Name, endName) <= 0)
//            .ToList();

//        return categoriesEntities.Select(MapToDTO).ToList();
//    }

//    private CategoryDTO MapToDTO(Category categoryEntity)
//    {
//        return new CategoryDTO
//        {
//            Id = categoryEntity.Id,
//            Name = categoryEntity.Name,
//            TypeName = categoryEntity.CategoryType.TypeName // Assuming navigation property
//        };
//    }
//}
//    }