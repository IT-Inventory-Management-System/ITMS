using System;

public interface IDeviceService
{
    Task<List<DeviceModelDTO>> GetUniqueDeviceModelsAsync();
}

public class DeviceService : IDeviceService
{
    private readonly AppDbContext _dbContext;

    public DeviceService(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<DeviceModelDTO>> GetUniqueDeviceModelsAsync()
    {
        var uniqueDeviceModels = await _dbContext.DeviceModels
            .Include(dm => dm.OSType) // Include OSType relationship
            .GroupBy(dm => new { dm.DeviceName, dm.OSType.OSName })
            .Select(g => new DeviceModelDTO
            {
                Id = g.First().Id,
                DeviceName = g.Key.DeviceName,
                OSName = g.Key.OSName,
                // Map other properties as needed
            })
            .ToListAsync();

        return uniqueDeviceModels;
    }
}
