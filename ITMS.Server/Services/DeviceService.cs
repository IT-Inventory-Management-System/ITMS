
using ITMS.Server.DTO;

using ITMS.Server.Models;

using Microsoft.AspNetCore.Http.HttpResults;

using Microsoft.EntityFrameworkCore;

using System;

using System.Collections.Generic;

using System.Linq;

using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Xml.Schema;
using System.Web.Mvc;

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

    public async Task<List<DevicelogDto>> GetArchivedCygIdsAsync(Guid locationId)

    {

        var archivedCygIds = await _context.Devices
            .Where(log => log.LocationId == locationId)

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

            return "Less than a month";

        return remainingWarranty.ToString();

    }


    private ITMS.Server.Models.Device GetDevice(string deviceId)

    {

        return _context.Devices

            .Include(d => d.StatusNavigation).Include(d => d.DeviceModel)

            .FirstOrDefault(d => d.Cygid == deviceId);

    }


    public DevicelogDto GetDevices(Guid id)

    {

        try

        {

            var device = _context.Devices

                .Where(log => log.AssignedTo == id)

                .Include(d => d.DeviceModel)

                .FirstOrDefault();

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

                    Id = device.Id,

                    Cygid = device.Cygid,

                    Cgiid = device.AssignedToNavigation?.Cgiid,

                    AssignedTo = $"{assignedtoFirstName} {assignedtoLastName}",

                    AssignedBy = $"{assignedByFirstName} {assignedByLastName}",

                    AssignedDate = device.AssignedDate,

                    RecievedBy = $"{receivedByFirstName} {receivedByLastName}",

                    Model = modelNo,



                };

            }

            return null;

        }

        catch (Exception ex)

        {



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

    public List<OsTypeDto> GetOstypes()
    {
        var ostypes = _context.Ostypes.ToList();
        List<OsTypeDto> oslist = new List<OsTypeDto>();
        foreach (var ostype in ostypes)
        {
            OsTypeDto ostable = new OsTypeDto();
            ostable.Type = ostype.Osname;
            ostable.Id = ostype.Id;
            oslist.Add(ostable);
        }
        return oslist;



    }
    public List<locationDto> Getlocation()
    {
        var locationtypes = _context.Locations.ToList();
        List<locationDto> locationlist = new List<locationDto>();

        foreach (var location in locationtypes)
        {
            locationDto singlelocation = new locationDto();
            singlelocation.Type = location.Location1;
            singlelocation.Id = location.Id;
            locationlist.Add(singlelocation);
        }
        return locationlist;


    }

    public List<StatusDto> GetStatus()
    {
        var statusTypes = _context.Statuses.ToList();
        List<StatusDto> statusList = new List<StatusDto>();

        foreach (var status in statusTypes)
        {
            StatusDto s = new StatusDto();
            s.Type = status.Type;
            s.Id = status.Id;
            statusList.Add(s);
        }
        return statusList;


    }

    public List<ProcessorDto> GetUniqueProcessors()
    {
        var uniqueProcessors = _context.DeviceModel
                                .Where(d => d.Processor != null)
                                .Select(d => d.Processor)
                                .Distinct()
                                .ToList();
        List<ProcessorDto> processorList = new List<ProcessorDto>();

        foreach (var processor in uniqueProcessors)
        {
            ProcessorDto processorDto = new ProcessorDto();
            processorDto.Name = processor;
            processorList.Add(processorDto);
        }

        return processorList;
    }

    public async Task<bool> UpdateDeviceStatusToDiscarded(ArchivedoneDto archiveDto)
    {
        try
        {
            var device = await GetDeviceAsync(archiveDto.Cygid);

            if (device == null)
                return false;

            if (device.AssignedTo != null)
            {
                return false;
            }

            // Make sure StatusNavigation is not null
            if (device.StatusNavigation != null)
            {
                // Find the "discarded" status from the database
                var discardedStatus = await _context.Statuses.FirstOrDefaultAsync(s => s.Type == "discarded");
                var action = await _context.ActionTables.FirstOrDefaultAsync(s => s.ActionName == "Archived");
                if (discardedStatus != null)
                {
                    // Update the status to discarded
                    device.StatusNavigation = discardedStatus;

                    // Set IsArchived to true (1)
                    device.IsArchived = true;
                    DevicesLog oldlog = new DevicesLog
                    {
                        DeviceId = device.Id,
                    CreatedBy=archiveDto.CreatedBy, // Updated to use value from frontend
                        UpdatedBy = archiveDto.UpdatedBy,
                        UpdatedAtUtc = DateTime.UtcNow,
                        CreatedAtUtc = DateTime.UtcNow,
                        ActionId = action?.Id

                    };
                    _context.DevicesLogs.Add(oldlog);
                    await _context.SaveChangesAsync();

                    Comment addArchiveComment = new Comment
                    {
                        Description = archiveDto.Description,
                        DeviceLogId = oldlog.Id,
                        DeviceId = device.Id,
                        CreatedAtUtc = DateTime.UtcNow,
                        CreatedBy = archiveDto.CreatedBy,
                    };
                    _context.Comments.Add(addArchiveComment);
                    //Save the changes
                   await _context.SaveChangesAsync();

                    return true;
                }
                else
                {
                    // Log or handle the case where the "discarded" status is not found
                    return false;
                }
            }
            else
            {
                // Log or handle the case where StatusNavigation is null
                return false;
            }
        }
        catch (Exception)
        {
            // Log or handle the exception as needed
            throw;
        }
    }

    public async Task<bool> UpdateDeviceStatusToNotAssigned(ArchivedoneDto archiveDto)
    {
        try
        {
            var device = await GetDeviceAsync(archiveDto.Cygid);

            if (device == null)
                return false;

            // Make sure StatusNavigation is not null
            if (device.StatusNavigation != null)
            {
                // Find the "discarded" status from the database
                var discardedStatus = await _context.Statuses.FirstOrDefaultAsync(s => s.Type == "not Assigned");
                var action = await _context.ActionTables.FirstOrDefaultAsync(s => s.ActionName == "UnArchived");

                if (discardedStatus != null)
                {
                    // Update the status to discarded
                    device.StatusNavigation = discardedStatus;

                    // Set IsArchived to true (1)
                    device.IsArchived = false;

                    // Save the changes
                    DevicesLog oldlog = new DevicesLog
                    {
                        DeviceId = device.Id,
                        CreatedBy = archiveDto.CreatedBy, // Updated to use value from frontend
                        UpdatedBy = archiveDto.UpdatedBy,
                        UpdatedAtUtc = DateTime.UtcNow,
                        CreatedAtUtc = DateTime.UtcNow,
                        ActionId = action?.Id

                    };
                    _context.DevicesLogs.Add(oldlog);
                    await _context.SaveChangesAsync();

                    return true;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<List<GetDeviceModelDTO>> GetDeviceModels(Guid DeviceModelId, Guid location)
    {
        var deviceModels = await _context.DeviceModel
            .Join(
                _context.Ostypes,
                device => device.Os,
                osType => osType.Id,
                (device, osType) => new { Device = device, OSType = osType }
            )
            .Where(deviceOs => deviceOs.Device.Id == DeviceModelId)
            .Select(log => new GetDeviceModelDTO
            {
                brand = log.Device.Brand,
                Ram = log.Device.Ram,
                Storage=log.Device.Storage,
                Processor=log.Device.Processor,
                OS = log.OSType.Osname,
                total = _context.Devices.Count(device => device.DeviceModelId == DeviceModelId && device.LocationId == location) ,
                assigned = _context.Devices.Count(device => device.DeviceModelId == DeviceModelId && device.AssignedTo != null && device.LocationId == location),
                inventory = _context.Devices.Count(device => device.DeviceModelId == DeviceModelId && device.LocationId == location) -
                        _context.Devices.Count(device => device.DeviceModelId == DeviceModelId && device.AssignedTo != null && device.LocationId == location)

            })
            .ToListAsync();

        return deviceModels;
    }

    public List<allAccessoriesDTO> GetAllAccessories(Guid locationId)
    {
        return _context.Devices
            .Include(d => d.StatusNavigation)
            .Include(d => d.DeviceModel)
              .ThenInclude(dm => dm.Category)
             .Where(d => (d.DeviceModel.Category.Name != "Laptop") && ((d.DeviceModel.Category.Name != "Software")) && (d.LocationId == locationId))
            .Select(d => new allAccessoriesDTO
            {
                Brand = d.DeviceModel.Brand,
                CYGID = d.Cygid,
                Status = d.StatusNavigation.Type,
                Category = d.DeviceModel.Category.Name,
                IsWired = d.DeviceModel.IsWired,
                Qty = _context.Devices.Count(c => c.DeviceModelId == d.DeviceModel.Id),
                PurchaseDate = d.PurchasedDate,
                WarrantyDate = d.WarrantyDate,
                IsArchived = d.IsArchived,
                AssignedTo = d.AssignedTo == null ? false : true,
                accessoryId = d.Id
            }).ToList();
    }

    public List<allAccessoriesDTO> GetFilterAccessories(List<allAccessoriesDTO> allData, filterAccessoriesBodyDTO filter)
    {
         allData = allData.Where(d => (string.IsNullOrEmpty(filter.Category) || d.Category==filter.Category) && 
            (string.IsNullOrEmpty(filter.IsWired) || (d.IsWired==true && filter.IsWired== "Wired") || (d.IsWired == false && filter.IsWired == "Wireless")) &&
            (string.IsNullOrEmpty(filter.Availability)) || (filter.Availability=="Available" && d.AssignedTo==false) || (filter.Availability == "Assigned" && d.AssignedTo == true)
            ).ToList();

         allData = allData.Where(d =>
            {
                if (filter.selectedStock == null || filter.selectedStock.Count == 0)
                    return true;

                foreach (var stockOption in filter.selectedStock)
                {
                    if (string.IsNullOrEmpty(stockOption))
                        continue;

                    if ((stockOption == "Low In Stock" && d.Qty <= 1) ||
                        (stockOption == "In Stock" && d.Qty > 1) ||
                        (stockOption == "Out Of Stock" && d.Qty == 0))
                    {
                        return true;
                    }
                }

            return false;
         }).ToList();

        return allData;
        }

    public List<historySingleAccessory> singleHistory(Guid locationId, string CYGID)
    {

        return _context.DevicesLogs
     .Include(dl => dl.Device)
     .Include(dl => dl.Employee)
     .Include(dl => dl.AssignedByNavigation)
     .Where(dl => (dl.Device.LocationId == locationId) && (dl.Device.Cygid == CYGID))
     .OrderBy(dl => dl.UpdatedAtUtc)
     .GroupBy(dl => new
     {
         empName = dl.Employee.FirstName + " " + dl.Employee.LastName,
         CYGID = dl.Employee.Cgiid,
         AssignedBy = dl.AssignedByNavigation.FirstName + " " + dl.AssignedByNavigation.LastName,
         AssignedDate = dl.AssignedDate
     })
     .Select(group => new historySingleAccessory
     {
         empName = group.Key.empName,
         CYGID = group.Key.CYGID,
         AssignedBy = group.Key.AssignedBy,
         AssignedDate = group.Key.AssignedDate,
         RecievedBy = group.FirstOrDefault().RecievedBy == null ? null : _context.Employees
             .Where(e => e.Id == group.FirstOrDefault().RecievedBy)
             .Select(e => e.FirstName + " " + e.LastName)
             .FirstOrDefault(),
         RecievedDate = group.FirstOrDefault().RecievedBy == null ? null : group.FirstOrDefault().RecievedDate
     }).OrderByDescending(group => group.AssignedDate)
     .ToList();


    }


}