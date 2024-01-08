// Services/DeviceLogService.cs
using ITMS.Server.Models;

public class DeviceLogService
{
    private readonly ItinventorySystemContext _context;

    public DeviceLogService(ItinventorySystemContext context)
    {
        _context = context;
    }

    public List<DevicelogDto> GetDevices()
    {
        var deviceHistory = _context.Devices.OrderBy(log=>log.Cygid)
            .Select(log => new DevicelogDto
            {
                
                Cygid=log.Cygid
            })
            .ToList();

        return deviceHistory;
    }

    
    // Add other methods for specific business logic related to device history
}
