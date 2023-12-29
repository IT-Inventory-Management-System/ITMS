using ITMS.Server.Models;
using Microsoft.EntityFrameworkCore;
using System;

public class DeviceService
{
    private readonly ItinventorySystemContext _context;

    public DeviceService(ItinventorySystemContext context)
    {
        _context = context;
    }

   

    public async Task<IEnumerable<CategoryTypeWithCategoriesDTO>> GetCategoriesAsync()
    {
       
            var categoryTypesWithCategories = await _context.CategoryTypes
            .Include(ct => ct.Categories)
            .Select(ct => new CategoryTypeWithCategoriesDTO
            {
                
                TypeName = ct.TypeName,
                Categories = ct.Categories.Select(c => new CategoryDTO
                {
                    
                    Name = c.Name,
                    CategoryTypeName = c.CategoryType.TypeName
                }).ToList()
            })
            .ToListAsync();

        return categoryTypesWithCategories;
    }
}
