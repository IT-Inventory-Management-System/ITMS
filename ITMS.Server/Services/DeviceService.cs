
using ITMS.Server.DTO;
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

public DeviceDto GetDeviceStatusAndAge(string deviceId)
{
    var device = GetDevice(deviceId);
      
        if (device == null)
        return null;

    _context.Entry(device)
.Reference(d => d.DeviceModel)
.Load();

    var ageInYears = CalculateDeviceAge(device.PurchasedDate);

        var deviceDto = new DeviceDto
        {
            Id = device.Id,
            SerialNumber = device.SerialNumber,
            AgeInYears = ageInYears,
            Cygid = device.Cygid,
            DeviceModelId = device.DeviceModelId,
            PurchasedDate = device.PurchasedDate,
            WarrantyDate = device.WarrantyDate,
            Status = new StatusDto
            {
                Id = device.StatusNavigation.Id,
                Type = device.StatusNavigation.Type
            },
            DeviceModel = new DeviceModelDto
            {
                DeviceName = device.DeviceModel?.DeviceName,
                Processor = device.DeviceModel?.Processor,
                Ram = device.DeviceModel?.Ram,
                Storage = device.DeviceModel?.Storage,
            },
           
            
    
    };

    return deviceDto;
}

  
    private Device GetDevice(string deviceId)
{
    return _context.Devices
        .Include(d => d.StatusNavigation).Include(d => d.DeviceModel)
        .FirstOrDefault(d => d.Cygid == deviceId);
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


    public IEnumerable<DevicelogDto> GetDevices(Guid id)
    {
        try
        {
            var getdevices = _context.Devices
                .Where(log => log.AssignedTo == id)
                .Include(d => d.DeviceModel)
                .ToList();

            var result = getdevices.Select(UserLogInfo =>

            {
                var assignedTo = _context.Employees.FirstOrDefault(emp => emp.Id ==id);
                var assignedtoFirstName = assignedTo?.FirstName ?? "Unknown";
                var assignedtoLastName = assignedTo?.LastName ?? "Unknown";
                var assignedByEmployee = _context.Employees.FirstOrDefault(emp => emp.Id == UserLogInfo.AssignedBy);
                var receivedByEmployee = _context.Employees.FirstOrDefault(emp => emp.Id == UserLogInfo.RecievedBy);

                var assignedByFirstName = assignedByEmployee?.FirstName ?? "Unknown";
                var assignedByLastName = assignedByEmployee?.LastName ?? "Unknown";

                var receivedByFirstName = receivedByEmployee?.FirstName ?? "Unknown";
                var receivedByLastName = receivedByEmployee?.LastName ?? "Unknown";
                var modelNo = UserLogInfo.DeviceModel != null ? UserLogInfo.DeviceModel.ModelNo : "Unknown";


                return new DevicelogDto
                {
                    Cygid = UserLogInfo.Cygid,
                    Cgiid = UserLogInfo.AssignedToNavigation?.Cgiid,
                    AssignedTo = $"{assignedtoFirstName} {assignedtoLastName}",
                    AssignedBy = $"{assignedByFirstName} {assignedByLastName}",
                    AssignedDate = UserLogInfo.AssignedDate,
                    RecievedBy = $"{receivedByFirstName} {receivedByLastName}",
                    Model = modelNo
                };
            });

            return result.ToList(); // Returning a list of DevicelogDto objects

        }
        catch (Exception ex)
        {
            // Log the exception or handle it appropriately
            throw;
        }
    }

}



