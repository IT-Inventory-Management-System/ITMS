using ITMS.Server.DTO;
using ITMS.Server.Models;
using LibNoise.Modifier;
using Microsoft.EntityFrameworkCore;

namespace ITMS.Server.Services
{
        public interface IAddAssetService
        {
            Task<IEnumerable<GetEmployeeDTO>> getAllEmployeeBasicDetails();
        Task<IEnumerable<GetAccessories>> getAccessories();
        Task<IEnumerable<GetBrandDTO>> getMouseBrand();

    }
    public class AddAssetService : IAddAssetService
    {
        private readonly ItinventorySystemContext _context;

        public AddAssetService(ItinventorySystemContext context)
        {
            _context = context;
        }

     public async Task<IEnumerable<GetEmployeeDTO>> getAllEmployeeBasicDetails()
        {
            var result = await (from e in _context.Employees
                                select new GetEmployeeDTO
                                {
                                    Id = e.Id,
                                    Cgiid = e.Cgiid,
                                    Name = e.FirstName + " " + e.LastName,
                                    Email=e.Email
                                }).ToListAsync();
            return result;
        }
        public async Task<IEnumerable<GetAccessories>> getAccessories()
        {
            var result = await (from c in _context.Categories
                                select new GetAccessories
                                { 
                                Id= c.Id,
                                Name = c.Name
                                }).ToListAsync();
            return result;
        }
        public async Task<IEnumerable<GetBrandDTO>> getMouseBrand()
        {
            var result=await (from c in _context.DeviceModel
                              join cat in _context.Categories
                              on c.CategoryId equals cat.Id
                              where cat.Name== "Mouse"
                              select new GetBrandDTO
                             
                              {
                                  Id= c.Id,
                                  brand= c.Brand,
                                  iswired = c.IsWired
                              }).ToListAsync();
            return result;
        }

    }
}
