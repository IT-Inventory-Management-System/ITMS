// Services/UserDeviceService.cs
using System;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using ITMS.Server.DTO;
using ITMS.Server.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client.Extensions.Msal;
using MiNET.Blocks;

// Services/UserDeviceService.cs

public class UserDeviceService 
{
    private readonly ItinventorySystemContext _dbContext;

    public UserDeviceService(ItinventorySystemContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<UserDeviceDto> GetUserDeviceById(Guid deviceId)
    {
        var device = await _dbContext.Devices
            .Include(d => d.DeviceModel)
            .Include(d => d.StatusNavigation)
            .Include(d => d.CreatedByNavigation)
            .Include(d => d.Comments).ThenInclude(c => c.CreatedByNavigation)
            .Where(d => d.Id == deviceId)
            .FirstOrDefaultAsync();

        if (device == null)
        {
            return null;
        }

        var userDeviceDto = new UserDeviceDto
        {
            Id = device.Id,
           
            StatusId = device.Status,
            
            CreatedByUserName = $"{device.CreatedByNavigation.FirstName} {device.CreatedByNavigation.LastName}",
            CreatedAtUtc = device.CreatedAtUtc,
            ModelName = device.DeviceModel.DeviceName,
        };


        return userDeviceDto;
    }

    public List<UserDeviceHistory> GetDevices(Guid id)
    {
        try
        {
            var devicesWithComments = _dbContext.DevicesLogs
               .Where(log => log.EmployeeId == id)
               .Include(e => e.Employee)
               .Include(d => d.Device)
                   .ThenInclude(dm => dm.DeviceModel)
                   .Where(log => log.Device.DeviceModel.Category.Name == "Laptop" && log.SoftwareAllocation == null)
                   .OrderByDescending(log => log.AssignedDate)

               .Select(log => new UserDeviceHistory
               {
                   DeviceLogId = log.Id,
                   DeviceId = log.DeviceId,
                   CategoryName = log.Device.DeviceModel.Category.Name,
                   cygid = log.Device.Cygid,
                   Model = log.Device.DeviceModel.ModelNo,
                   AssignBy = _dbContext.Employees
                       .Where(employee => employee.Id == log.AssignedBy)
                       .Select(employee => $"{employee.FirstName} {employee.LastName}")
                       .FirstOrDefault(),
                   AssignedDate = (DateTime)log.AssignedDate,
                   SubmitedBy = _dbContext.Employees
                       .Where(employee => employee.Id == log.RecievedBy)
                       .Select(employee => $"{employee.FirstName} {employee.LastName}")
                       .FirstOrDefault(),
                   SubmitedByDate = (DateTime)log.RecievedDate,
                   OSName = _dbContext.Ostypes
                       .Where(os => os.Id == log.Device.DeviceModel.Os)
                       .Select(os => $"{os.Osname}")
                       .FirstOrDefault(),
                   Processor = log.Device.DeviceModel.Processor,
                   Ram = log.Device.DeviceModel.Ram,
                   Storage = log.Device.DeviceModel.Storage,
                   PurchasedDate = log.Device.PurchasedDate,
                   DeviceAge = Math.Round((DateTime.Today - (log.Device.PurchasedDate ?? DateTime.Today)).TotalDays / 365.0, 1),
                   ActionName = _dbContext.ActionTables
                       .Where(action => action.Id == log.ActionId)
                       .Select(action => $"{action.ActionName}")
                       .FirstOrDefault(),
                   ActionId = log.ActionId,
                   UpdatedBy = _dbContext.Employees
                       .Where(employee => employee.Id == log.UpdatedBy)
                       .Select(employee => $"{employee.FirstName} {employee.LastName}")
                       .FirstOrDefault(),
                   UpdatedAtUtc = log.UpdatedAtUtc,
                   CreatedAtUtc = log.CreatedAtUtc,
                 
               })
               .ToList();

            var latestDeviceLogs = devicesWithComments
                .GroupBy(log => log.DeviceId)
                .Select(group => group.OrderByDescending(log => log.CreatedAtUtc).First())
                .ToList();


            return latestDeviceLogs;

        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            throw ex;
        }
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
                    UpdatedAtUtc = dl.UpdatedAtUtc,
                    CreatedAtUtc = dl.CreatedAtUtc
                })
                .ToList();

            var latestSoftwareLogs = softwareList
               .GroupBy(log => log.SoftwareAllocationId)
               .Select(group => group.OrderByDescending(log => log.CreatedAtUtc).First())
               .ToList();


            return latestSoftwareLogs;
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return null;
        }
    }


    public List<UserAccessoriesHistory> GetUserAccessories(Guid id)
    {
        try
        {
            var accessoriesList = _dbContext.DevicesLogs
                .Where(log => log.EmployeeId == id && log.Device.DeviceModel.Category.Name != "Laptop" && log.SoftwareAllocation == null)
                .Include(log => log.Device)
                    .ThenInclude(device => device.DeviceModel)
                        .ThenInclude(model => model.Category)
                            .ThenInclude(category => category.CategoryType)
                .Select(log => new UserAccessoriesHistory
                {
                    DeviceLogId = log.Id,
                    DeviceId = log.DeviceId,
                    cygid = log.Device.Cygid, //new change in accessories
                    DeviceName = log.Device.DeviceModel.DeviceName,
                    Brand = log.Device.DeviceModel.Brand,
                    ModelNo = log.Device.DeviceModel.ModelNo,
                    CategoryName = log.Device.DeviceModel.Category.Name,
                    CategoryType = log.Device.DeviceModel.Category.CategoryType.TypeName,
                    AssignBy = _dbContext.Employees
                        .Where(employee => employee.Id == log.AssignedBy)
                        .Select(employee => $"{employee.FirstName} {employee.LastName}")
                        .FirstOrDefault(),
                    AssignedTo = _dbContext.Employees
                        .Where(employee => employee.Id == log.EmployeeId)
                        .Select(employee => $"{employee.FirstName} {employee.LastName}")
                        .FirstOrDefault(),
                    AssignedDate = log.AssignedDate,
                    isWired = log.Device.DeviceModel.IsWired,
                    SubmittedBy = _dbContext.Employees
                        .Where(employee => employee.Id == log.RecievedBy)
                        .Select(employee => $"{employee.FirstName} {employee.LastName}")
                        .FirstOrDefault(),
                    SubmittedByDate = log.RecievedDate,
                    ActionName = _dbContext.ActionTables
                           .Where(action => action.Id == log.ActionId)
                           .Select(action => $"{action.ActionName}")
                           .FirstOrDefault(),
                    UpdatedBy = _dbContext.Employees
                           .Where(employee => employee.Id == log.UpdatedBy)
                           .Select(employee => $"{employee.FirstName} {employee.LastName}")
                           .FirstOrDefault(),
                    UpdatedAtUtc = log.UpdatedAtUtc,
                    CreatedAtUtc = log.CreatedAtUtc,
                    ActionId = log.ActionId,
                })
                .ToList();

            var latestAccessoriesLogs = accessoriesList
              .GroupBy(log => log.DeviceId)
              .Select(group => group.OrderByDescending(log => log.CreatedAtUtc).First())
              .ToList();


            return latestAccessoriesLogs;
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return null;
        }
    }

}
