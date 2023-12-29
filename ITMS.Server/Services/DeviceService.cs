using Microsoft.EntityFrameworkCore;
using System;

public class DeviceService
{
    private readonly AppDbContext _context;

    public DeviceService(AppDbContext context)
    {
        _context = context;
    }

    public IEnumerable<Device> GetDevices()
    {
        return _context.Devices.ToList();
    }

    public Device GetDeviceById(int id)
    {
        return _context.Devices.FirstOrDefault(d => d.Id == id);
    }

    public void AddDevice(Device device)
    {
        _context.Devices.Add(device);
        _context.SaveChanges();
    }

    public IEnumerable<Device> Filter(string Name, int CategoryId, int StatusId)
    {
        var devices = _context.Devices.AsQueryable();

        if (!string.IsNullOrEmpty(nameFilter))
        {
            devices = devices.Where(d => d.Name.Contains(nameFilter));
        }

        if (CategoryId != 0)
        {
            devices = devices.Where(d => d.CategoryId.Contains(nameFilter));
        }

        if (StatusId != 0)
        {
            devices = devices.Where(d => d.StatusId.Contains(nameFilter));
        }

        return devices;
    }

    public void UpdateDevice(Device updatedDevice)
    {
        var existingDevice = _context.Devices.FirstOrDefault(d => d.Id == updatedDevice.Id);
        if (existingDevice != null)
        {
            existingDevice.Name = updatedDevice.Name;
            existingDevice.Type = updatedDevice.Type;
            existingDevice.SerialNumber = updatedDevice.SerialNumber;
            _context.SaveChanges();
        }
    }

    public void DeleteDevice(int id)
    {
        var device = _context.Devices.FirstOrDefault(d => d.Id == id);
        if (device != null)
        {
            _context.Devices.Remove(device);
            _context.SaveChanges();
        }
    }

    public async Task<IEnumerable<CategoryDTO>> GetCategoriesAsync()
    {
        var categories = await _context.Categories
            .Include(c => c.categoryType)
            .Select(c => new CategoryDTO
            {
                categoryType = c.categoryType.TypeName,
                Name = c.CategoryName
            })
            .ToListAsync();

        return categories;
    }
}
