
using ITMS.Server.DTO;
using ITMS.Server.Models;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Crypto.Prng.Drbg;
using System;
using System.Text;
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
        };

        string formattedDate = deviceDto.FormattedPurchasedDate;
        

        return deviceDto;
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
    }



