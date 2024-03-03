using ITMS.Server.DTO;
using ITMS.Server.Models;
using Microsoft.EntityFrameworkCore;
using MiNET.Blocks;
using System.Runtime.InteropServices;

namespace ITMS.Server.Services
{
    public interface IGetAccessoryService
    {

        Task<IEnumerable<getAccessoriesDTO>> listAccessories();
        Task<IEnumerable<getMouseDetailsDTO>> getMouseDetails(Guid locationId, Guid c);
        
    }
    public class GetAccessoriesService : IGetAccessoryService
    {
        private readonly ItinventorySystemContext _context;

        public GetAccessoriesService(ItinventorySystemContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<getAccessoriesDTO>> listAccessories()
        {
            var result = await (from c in _context.Categories
                                join ct in _context.CategoryTypes
                                 on c.CategoryTypeId equals ct.Id
                                where (ct.TypeName != "Software" && ct.TypeName!= "Primary Devices")
                                select new getAccessoriesDTO
                                {
                                    Id = c.Id,
                                    Name = c.Name
                                }).ToListAsync();
            return result;
        }
        public async Task<IEnumerable<getMouseDetailsDTO>> getMouseDetails(Guid locationId, Guid catId)
        {
            var result = await (from c in _context.DeviceModel
                                join cat in _context.Categories
                                on c.CategoryId equals cat.Id
                                where cat.Id == catId
                                join d in _context.Devices
                                on c.Id equals d.DeviceModelId
                                where d.LocationId == locationId &&
                                d.AssignedTo == null
                                && d.IsArchived==false
                                select new getMouseDetailsDTO
                                {
                                    Id = c.Id,
                                    Brand = c.Brand,
                                    iswired = c.IsWired,
                                    CYGID = d.Cygid,
                                  
                                }).ToListAsync();
            return result;
        }


    }

}
