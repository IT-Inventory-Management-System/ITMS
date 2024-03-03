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
        Task<IEnumerable<getMouseDetailsDTO>> getMouseDetails(Guid locationId);
        
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
                                select new getAccessoriesDTO
                                {
                                    Id = c.Id,
                                    Name = c.Name
                                }).ToListAsync();
            return result;
        }
        public async Task<IEnumerable<getMouseDetailsDTO>> getMouseDetails(Guid locationId)
        {
            var result = await (from c in _context.DeviceModel
                                join cat in _context.Categories
                                on c.CategoryId equals cat.Id
                                where cat.Name == "Mouse"
                                join d in _context.Devices
                                on c.Id equals d.DeviceModelId
                                where d.LocationId == locationId
                                select new getMouseDetailsDTO

                                {
                                    Id = c.Id,
                                    Brand = c.Brand,
                                    iswired = c.IsWired,
                                    CYGID = d.Cygid,
                                    assignedTo = d.AssignedTo,
                                }).ToListAsync();
            return result;

        }
    
    }

}
