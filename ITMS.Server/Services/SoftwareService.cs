using ITMS.Server.DTO;
using ITMS.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace ITMS.Server.Services
{
    // SoftwareService.cs
    public class SoftwareService
    {
        private readonly ItinventorySystemContext _dbContext;

        public SoftwareService(ItinventorySystemContext dbContext)
        {
            _dbContext = dbContext;
        }

        public List<SoftwareDTO> GetAllSoftware()
        {
            var softwareEntities = _dbContext.Software
                .Include(s => s.SoftwareType)
                .Include(s => s.Category)
                .Include(s => s.CreatedBy)
                .Include(s => s.UpdatedBy)
                .Select(s => new SoftwareDTO
                {
                    Id = s.Id,
                    SoftwareName = s.SoftwareName,
                    SoftwareTypeId = s.SoftwareTypeId,
                    CategoryId = s.CategoryId,
                    SoftwareThumbnail = s.SoftwareThumbnail,
                    CreatedBy = s.CreatedBy,
                    CreatedAtUTC = s.CreatedAtUtc,
                   
                })
                .ToList();

            return softwareEntities;
        }

        public void InsertSoftware(SoftwareDTO softwareDTO)
        {
            softwareDTO.CreatedAtUTC = softwareDTO.CreatedAtUTC != default ? softwareDTO.CreatedAtUTC : DateTime.UtcNow;

            var softwareEntity = new Software
            {
                Id = softwareDTO.Id,
                SoftwareName = softwareDTO.SoftwareName,
                SoftwareTypeId = softwareDTO.SoftwareTypeId,
                CategoryId = softwareDTO.CategoryId,
                SoftwareThumbnail = softwareDTO.SoftwareThumbnail,
                CreatedBy = softwareDTO.CreatedBy,
                //CreatedAtUTC = softwareDTO.CreatedAtUTC,
                UpdatedBy = softwareDTO.UpdatedBy,
                //UpdatedAtUTC = softwareDTO.UpdatedAtUTC
            };

            _dbContext.Software.Add(softwareEntity);
            _dbContext.SaveChanges();
        }
    }

}
