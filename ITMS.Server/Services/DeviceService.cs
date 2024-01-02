using ITMS.Server.Models;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Crypto.Prng.Drbg;
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
             .OrderBy(ct => ct.Priority)
            .Include(ct => ct.Categories)
            .Select(ct => new CategoryTypeWithCategoriesDTO
            {
                Id= ct.Id,
                TypeName = ct.TypeName,
                Categories = ct.Categories.OrderBy(c=>c.Name).Select(c => new CategoryDTO
                {
                   
                    Id= c.Id,
                    Name = c.Name,
                    CategoryTypeName = c.CategoryType.TypeName,
                    CategoryTypeId=c.CategoryType.Id
                    
                }).ToList(),
                Priority= ct.Priority
            })
            .ToListAsync();

        return categoryTypesWithCategories;
    }
}
