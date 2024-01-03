using ITMS.Server.Models;
using Microsoft.EntityFrameworkCore;
using System;

public interface IDeviceService
{
    Task<List<LaptopModelDTO>> GetLaptopModelsAsync();
    Task<List<SoftwareModelDTO>> GetSoftwareModelsAsync();
}

public class AddDeviceService : IDeviceService
{
    private readonly ItinventorySystemContext _dbContext;

    public AddDeviceService(ItinventorySystemContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<LaptopModelDTO>> GetLaptopModelsAsync()
    {
        var uniqueLaptopModels = await _dbContext.DeviceModels
            .Join(
                _dbContext.Ostypes,
                deviceModel => deviceModel.Os,
                osType => osType.Id,
                (deviceModel, osType) => new { DeviceModel = deviceModel, OsType = osType }
            )
            .GroupBy(joinResult => new { joinResult.DeviceModel.DeviceName, joinResult.OsType.Osname })
            .Select(g => new LaptopModelDTO
            {
                Id = g.First().DeviceModel.Id,
                DeviceName = g.Key.DeviceName,
                OSName = g.Key.Osname,
            })
            .ToListAsync();
        return uniqueLaptopModels;
    }
    public async Task<List<SoftwareModelDTO>> GetSoftwareModelsAsync()
    {
        var uniqueSoftwareModels = await _dbContext.Softwares
            .Select(s => new SoftwareModelDTO
            {
                Id = s.Id,
                SoftwareName = s.SoftwareName,
                SoftwareTypeId = s.SoftwareTypeId
            })
            .Distinct()
            .ToListAsync();
        return uniqueSoftwareModels;
    }
}
