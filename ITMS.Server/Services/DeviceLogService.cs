//// Services/DeviceLogService.cs
//public class DeviceLogService
//{
//    private readonly ApplicationDbContext _context;

//    public DeviceLogService(ApplicationDbContext context)
//    {
//        _context = context;
//    }

//    public List<DeviceLogDto> GetDeviceHistory()
//    {
//        var deviceHistory = _context.DevicesLogs
//            .Select(log => new DeviceLogDto
//            {
//                Id = log.Id,
//                DeviceId = log.DeviceId,
//                ModelId = log.ModelId,
//                UserId = log.UserId,
//                Description = log.Description,
//                StatusId = log.StatusId,
//                AllotedDate = log.AllotedDate,
//                Action = log.Action
//            })
//            .ToList();

//        return deviceHistory;
//    }
       
//    public List<UserDeviceLogDto> GetDeviceHistoryForUser(string userId)
//    {
//        var userDeviceHistory = _context.DevicesLogs
//            .Where(log => log.UserId == userId)
//            .Select(log => new UserDeviceLogDto
//            {
//                Id = log.Id,
//                DeviceId = log.DeviceId,
//                ModelId = log.ModelId,
//                Description = log.Description,
//                StatusId = log.StatusId,
//                AllotedDate = log.AllotedDate,
//                Action = log.Action
//            })
//            .ToList();

//        return userDeviceHistory;
//    }

//    // Add other methods for specific business logic related to device history
//}
