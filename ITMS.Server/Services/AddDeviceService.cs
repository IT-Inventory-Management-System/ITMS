using ITMS.Server.Models;
using Microsoft.EntityFrameworkCore;
using System;

public interface IDeviceService
{
    Task<List<DeviceModelDTO>> GetUniqueDeviceModelsAsync();
}

public class AddDeviceService : IDeviceService
{
    private readonly ItinventorySystemContext _dbContext;

    public AddDeviceService(ItinventorySystemContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<DeviceModelDTO>> GetUniqueDeviceModelsAsync()
    {
        var uniqueDeviceModels = await _dbContext.DeviceModels
            .Join(
                _dbContext.Ostypes,
                deviceModel => deviceModel.Os,
                osType => osType.Id,
                (deviceModel, osType) => new { DeviceModel = deviceModel, OsType = osType }
            )
            .GroupBy(joinResult => new { joinResult.DeviceModel.DeviceName, joinResult.OsType.Osname })
            .Select(g => new DeviceModelDTO
            {
                Id = g.First().DeviceModel.Id,
                DeviceName = g.Key.DeviceName,
                OSName = g.Key.Osname,
                // Map other properties as needed
            })
            .ToListAsync();




        return uniqueDeviceModels;
    }
}
