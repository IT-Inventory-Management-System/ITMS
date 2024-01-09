//// Services/UserDeviceService.cs
//using System;
//using System.Linq;
//using System.Threading.Tasks;
//using ITMS.Server.Models;
//using Microsoft.EntityFrameworkCore;

//// Services/UserDeviceService.cs
//public class UserDeviceService
//{
//    private readonly ItinventorySystemContext _dbContext;

//    public UserDeviceService(ItinventorySystemContext dbContext)
//    {
//        _dbContext = dbContext;
//    }

//    public async Task<UserDeviceDto> GetUserDeviceById(Guid deviceId)
//    {
//        var device = await _dbContext.Devices
//            .Include(d => d.DeviceModel)
//            .Include(d => d.StatusNavigation)
//            .Include(d => d.CreatedByNavigation)
//            .Include(d => d.Comments).ThenInclude(c => c.CreatedByNavigation)
//            .Where(d => d.Id == deviceId)
//            .FirstOrDefaultAsync();

//        if (device == null)
//        {
//            return null;
//        }

//        var userDeviceDto = new UserDeviceDto
//        {
//            Id = device.Id,
           
//            StatusId = device.Status,
            
//            CreatedByUserName = $"{device.CreatedByNavigation.FirstName} {device.CreatedByNavigation.LastName}",
//            CreatedAtUtc = device.CreatedAtUtc,
//            ModelName = device.DeviceModel.DeviceName,
//        };

//        var latestComment = device.Comments.OrderByDescending(c => c.CreatedAtUtc).FirstOrDefault();
//        if (latestComment != null)
//        {
//            userDeviceDto.comments.CommentDescription = latestComment.Description;
//            userDeviceDto.comments.CreatedByFullName = $"{latestComment.CreatedByNavigation.FirstName} {latestComment.CreatedByNavigation.LastName}";
//            userDeviceDto.comments.CommentCreatedAtUtc = latestComment.CreatedAtUtc;
//        }

//        return userDeviceDto;
//    }
//}
