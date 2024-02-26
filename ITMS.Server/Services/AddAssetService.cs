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
        
            Task<IEnumerable<getCGIDTO>> getCGIID();
        Task<IEnumerable<getLaptopIds>> getlaptopIds();


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
        public async Task<IEnumerable<getCGIDTO>> getCGIID()
        {
            //    var result = await (from c in _context.Devices
            //                        where c.Cygid.StartsWith("CGI-MOU")
            //                        select new getCGIDTO
            //                        {
            //                            CGIID = int.Parse(c.Cygid.Substring(8))  // Convert to integer
            //                        })
            //              .OrderByDescending(c => c.CGIID)
            //              .Take(1)
            //              .ToListAsync();


            //    if (result.Count == 0)
            //    {
            //        return new List<getCGIDTO> { new getCGIDTO { CGIID = 0 } };
            //    }
            //    else
            //    return result;

            var result = await (from c in _context.Devices
                                where c.Cygid.StartsWith("CGI-MOU")
                                select new getCGIDTO
                                {
                                    CGIID = c.Cygid.Substring(8) // Leave it as string for now
                                })
                    .ToListAsync();
            if (result.Count == 0)
            {
                return new List<getCGIDTO> { new getCGIDTO { CGIID = "0" } };
            }
            // Convert CGIID to integers and order the result
            else
            {
                result = result.OrderByDescending(c => int.Parse(c.CGIID)).ToList();
                return result.Take(1);
            }

        }

        public async Task <IEnumerable<getLaptopIds>> getlaptopIds()
        {
            var result = await (
        from device in _context.Devices
        join deviceModel in _context.DeviceModel on device.DeviceModelId equals deviceModel.Id
        join category in _context.Categories on deviceModel.CategoryId equals category.Id
        where category.Name == "Laptop" // Replace "Laptop" with the actual category name you're looking for
        select new getLaptopIds
        {
            CYGID = device.Cygid,
            SerialNumber = device.SerialNumber
        }
    ).ToListAsync();
            return result;

        }

    }
}
