using ITMS.Server.DTO;
using ITMS.Server.Models;
using Microsoft.EntityFrameworkCore;
using MiNET.Blocks;

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


        public List<UserSoftwareHistory> GetUserSoftware(Guid id)
        {
            try
            {
                var softwareList = _dbContext.DevicesLogs
                    .Where(dl => dl.EmployeeId == id && dl.SoftwareAllocationNavigation != null && dl.DeviceId == null)
                    .Include(dl => dl.SoftwareAllocationNavigation)
                        .ThenInclude(sa => sa.Software)
                            .ThenInclude(s => s.SoftwareType)
                             .OrderByDescending(log => log.AssignedDate)
                    .Select(dl => new UserSoftwareHistory
                    {
                        DeviceLogId = dl.Id,
                        SoftwareAllocationId = dl.SoftwareAllocationNavigation.Id,

                        TypeName = dl.SoftwareAllocationNavigation.Software.SoftwareType.TypeName,
                        SoftwareName = dl.SoftwareAllocationNavigation.Software.SoftwareName,
                        Version = dl.SoftwareAllocationNavigation.Version, //new version added
                        AssignBy = _dbContext.Employees
                            .Where(employee => employee.Id == dl.AssignedBy)
                            .Select(employee => $"{employee.FirstName} {employee.LastName}")
                            .FirstOrDefault(),
                        AssignedTo = _dbContext.Employees
                            .Where(employee => employee.Id == dl.EmployeeId)
                            .Select(employee => $"{employee.FirstName} {employee.LastName}")
                            .FirstOrDefault(),
                        AssignedDate = dl.AssignedDate,
                        PurchasedDate = dl.SoftwareAllocationNavigation.PurchasedDate,
                        ExpiryDate = dl.SoftwareAllocationNavigation.ExpiryDate,
                        RemainingDays = Math.Max(0, (dl.SoftwareAllocationNavigation.ExpiryDate.HasValue ? (dl.SoftwareAllocationNavigation.ExpiryDate.Value - DateTime.Today).Days : 0)),
                        RecievedBy = _dbContext.Employees
                            .Where(employee => employee.Id == dl.RecievedBy)
                            .Select(employee => $"{employee.FirstName} {employee.LastName}")
                            .FirstOrDefault(),
                        RecievedByDate = dl.RecievedDate,
                        ActionName = _dbContext.ActionTables
                               .Where(action => action.Id == dl.ActionId)
                               .Select(action => $"{action.ActionName}")
                               .FirstOrDefault(),
                        UpdatedBy = _dbContext.Employees
                               .Where(employee => employee.Id == dl.UpdatedBy)
                               .Select(employee => $"{employee.FirstName} {employee.LastName}")
                               .FirstOrDefault(),
                        UpdatedAtUtc = dl.UpdatedAtUtc
                    })
                    .ToList();

                return softwareList;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }



    }

}
