
//using ITMS.Server.Models;

//    private readonly ItinventorySystemContext _dbContext;

//    public UserDeviceService(ItinventorySystemContext dbContext)



//    {
//        _dbContext = dbContext;
//    }

//    public List<UserDeviceDto> GetDevicesForUser(int userId)
//    {
//        List<UserDeviceDto> userDeviceDtos = _dbContext.Devices
//            .Where(device => device.UserId == userId)
//            .Select(device => new UserDeviceDto
//            {
//                DeviceId = device.DeviceId,
//                DeviceName = device.DeviceName,
//                // Map other device properties...
//            })
//            .ToList();

//        return userDeviceDtos;
//    }
//}
