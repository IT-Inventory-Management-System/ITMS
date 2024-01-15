using ITMS.Server.DTO;
using ITMS.Server.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using System.Threading.Tasks;

using Xamarin.Forms;


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
                Id = ct.Id,
                TypeName = ct.TypeName,
                Categories = ct.Categories.OrderBy(c => c.Name).Select(c => new CategoryDTO
                {
                    Id = c.Id,
                    Name = c.Name,
                    CategoryTypeName = c.CategoryType.TypeName,
                    CategoryTypeId = c.CategoryType.Id
                }).ToList(),
                Priority = ct.Priority
            })
            .ToListAsync();

        return categoryTypesWithCategories;
    }

    public async Task<DeviceDto> GetDeviceStatusAndAgeAsync(string deviceId)
    {
        var device = await GetDeviceAsync(deviceId);

        if (device == null)
            return null;

        await _context.Entry(device)
            .Reference(d => d.DeviceModel)
            .LoadAsync();
        
        var modelCount = await GetModelCountAsync(device.DeviceModel?.DeviceName);

        var ageInYears = CalculateDeviceAge(device.PurchasedDate);

        // Calculate remaining warranty period
        var warrantyDate = CalculateRemainingWarranty(device.WarrantyDate);

        var deviceDto = new DeviceDto
        {
            Id = device.Id,
            SerialNumber = device.SerialNumber,
            Cygid = device.Cygid,
            DeviceModelId = device.DeviceModelId,
            CreatedBy = device.CreatedBy,
            CreatedAtUtc = device.CreatedAtUtc,
            UpdatedBy = device.UpdatedBy,
            UpdatedAtUtc = device.UpdatedAtUtc,
            AssignedTo = device.AssignedTo,
            PurchasedDate = device.PurchasedDate,

            // Assign the remaining warranty to WarrantyDate
            WarrantyRemaining = warrantyDate,

            Status = new StatusDto
            {
                Id = device.StatusNavigation.Id,
                Type = device.StatusNavigation.Type
            },
            AgeInYears = ageInYears,
            DeviceModel = new DeviceModelDto
            {
                Processor = device.DeviceModel?.Processor,
                DeviceName = device.DeviceModel?.DeviceName,
                Ram = device.DeviceModel?.Ram,
                Storage = device.DeviceModel?.Storage,
            },
            modelCount = modelCount,
        };

        string formattedDate = deviceDto.FormattedPurchasedDate;

        return deviceDto;
    }

    private async Task<Device> GetDeviceAsync(string deviceId)
    {
        return await _context.Devices
            .Include(d => d.StatusNavigation)
            .Include(d => d.DeviceModel)
            .FirstOrDefaultAsync(d => d.Cygid == deviceId);
    }

    public async Task<int> GetModelCountAsync(string deviceModelName)
    {
        return await _context.Devices
            .Include(d => d.DeviceModel)
            .Where(d => d.DeviceModel.DeviceName == deviceModelName)
            .CountAsync();
    }

    private double CalculateDeviceAge(DateTime? purchasedDate)
    {
        if (purchasedDate == null)
            return 0;

        double totalYears = (DateTime.UtcNow - purchasedDate.GetValueOrDefault()).TotalDays / 365;
        double roundedAge = Math.Round(totalYears, 2);
        return roundedAge;
    }

    public async Task<List<DevicelogDto>> GetArchivedCygIdsAsync()
    {
        var archivedCygIds = await _context.Devices
            .OrderBy(log => log.Cygid)
            .Where(log => log.IsArchived == true)
            .Select(log => new DevicelogDto
            {
                Cygid = log.Cygid
            })
            .ToListAsync();

        return archivedCygIds;
    }

    private string CalculateRemainingWarranty(DateTime? warrantyDate)
    {
        if (!warrantyDate.HasValue || warrantyDate.Value < DateTime.Now)
            return "No warranty";

        var remainingTimeSpan = warrantyDate.Value - DateTime.Now;

        // Calculate remaining warranty in years and months
        var remainingYears = remainingTimeSpan.Days / 365;
        var remainingMonths = (remainingTimeSpan.Days % 365) / 30;

        var remainingWarranty = new StringBuilder();

        if (remainingYears > 0)
            remainingWarranty.Append($"{remainingYears} {(remainingYears == 1 ? "year" : "years")} ");

        if (remainingMonths > 0)
            remainingWarranty.Append($"{remainingMonths} {(remainingMonths == 1 ? "month" : "months")}");

        if (remainingWarranty.Length == 0)
            return "Less than a month"; // or any other default value

        return remainingWarranty.ToString();
    }


    private ITMS.Server.Models.Device GetDevice(string deviceId)
{
    return _context.Devices
        .Include(d => d.StatusNavigation).Include(d => d.DeviceModel)
        .FirstOrDefault(d => d.Cygid == deviceId);
}

    public async Task<int> GetModelCountAsync(string deviceModelName)
    {
        return await _context.Devices
            .Include(d => d.DeviceModel)
            .Where(d => d.DeviceModel.DeviceName == deviceModelName)
            .CountAsync();
    }
    private double CalculateDeviceAge(DateTime? purchasedDate)
{
    if (purchasedDate == null)
        return 0;

    double totalYears = (DateTime.UtcNow - purchasedDate.GetValueOrDefault()).TotalDays / 365;
    double roundedAge = Math.Round(totalYears, 2);
    return roundedAge;
}
    //public async Task<IEnumerable<DeviceDto>> GetDevicesAsync(Guid cgiId)
    //{
    //    var result = await (from d in _context.Devices
    //                        where d.AssignedTo == cgiId
    //                        select new DeviceDto
    //                        {
    //                            Id = d.Id,
    //                            Cygid = d.Cygid,
    //                            DeviceModelId = d.DeviceModelId,
    //                            AssignedBy = d.AssignedBy
    //                        }).ToListAsync();
    //    return result;
    //}


    public DevicelogDto GetDevices(Guid id)
    {
        try
        {
            var device = _context.Devices
                .Where(log => log.AssignedTo == id)
                .Include(d => d.DeviceModel)
                .FirstOrDefault(); // Retrieve the first matching device

            if (device != null)
            {
                var comments = _context.Comments
                    .Where(comment => comment.DeviceId == device.Id)
                    .Select(c => new CommentDto
                    {
                        Id = c.Id,
                        Description = c.Description,
                        CreatedBy = _context.Employees
                        .Where(employee => employee.Id == c.CreatedBy)
.Select(employee => $"{employee.FirstName} {employee.LastName}")
                        .FirstOrDefault(),

                        CreatedAt = c.CreatedAtUtc
                    })
                    .ToList();

                var assignedTo = _context.Employees.FirstOrDefault(emp => emp.Id == id);
                var assignedtoFirstName = assignedTo?.FirstName ?? "Unknown";
                var assignedtoLastName = assignedTo?.LastName ?? "Unknown";
                var assignedByEmployee = _context.Employees.FirstOrDefault(emp => emp.Id == device.AssignedBy);
                var receivedByEmployee = _context.Employees.FirstOrDefault(emp => emp.Id == device.RecievedBy);

                var assignedByFirstName = assignedByEmployee?.FirstName ?? "Unknown";
                var assignedByLastName = assignedByEmployee?.LastName ?? "Unknown";

                var receivedByFirstName = receivedByEmployee?.FirstName ?? "Unknown";
                var receivedByLastName = receivedByEmployee?.LastName ?? "Unknown";
                var modelNo = device.DeviceModel != null ? device.DeviceModel.ModelNo : "Unknown";

                return new DevicelogDto
                {
                    Id= device.Id,
                    Cygid = device.Cygid,
                    Cgiid = device.AssignedToNavigation?.Cgiid,
                    AssignedTo = $"{assignedtoFirstName} {assignedtoLastName}",
                    AssignedBy = $"{assignedByFirstName} {assignedByLastName}",
                    AssignedDate = device.AssignedDate,
                    RecievedBy = $"{receivedByFirstName} {receivedByLastName}",
                    Model = modelNo,
                    Comments = comments // Set Comments property after other properties
                };
            }

            return null; // Return null if no device is found with the given ID
        }
        catch (Exception ex)
        {
            // Log the exception or handle it appropriately
            throw;
        }

    }
    public List<DevicelogDto> GetArchivedCygIds()
    {


        var archivedCygIds = _context.Devices.OrderBy(log => log.Cygid).Where(log => log.IsArchived == true)
            .Select(log => new DevicelogDto
            {

                Cygid = log.Cygid
            })
            .ToList();



        return archivedCygIds;
    }



}
