
using ITMS.Server.DTO;
using ITMS.Server.Models;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Crypto.Prng.Drbg;
using System;
using Xamarin.Forms;
using Device = ITMS.Server.Models.Device;

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

    public List<DevicelogDto> GetArchivedCygIds()
    {
        

        var archivedCygIds = _context.Devices.OrderBy(log => log.Cygid).Where(log=>log.IsArchived==true)
            .Select(log => new DevicelogDto
            {

                Cygid = log.Cygid
            })
            .ToList();

       

        return archivedCygIds;
    }
}



