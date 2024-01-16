// Services/UserDeviceService.cs
using System;
using System.Linq;
using System.Threading.Tasks;
using ITMS.Server.Models;
using Microsoft.EntityFrameworkCore;

// Services/UserDeviceService.cs
public interface IUserDeviceService
{
    List<CommentDto> GetCommentsById(Guid deviceLogId);
}

public class UserDeviceService : IUserDeviceService
{
    private readonly ItinventorySystemContext _dbContext;

    public UserDeviceService(ItinventorySystemContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<UserDeviceDto> GetUserDeviceById(Guid deviceId)
    {
        var device = await _dbContext.Devices
            .Include(d => d.DeviceModel)
            .Include(d => d.StatusNavigation)
            .Include(d => d.CreatedByNavigation)
            .Include(d => d.Comments).ThenInclude(c => c.CreatedByNavigation)
            .Where(d => d.Id == deviceId)
            .FirstOrDefaultAsync();

        if (device == null)
        {
            return null;
        }

        var userDeviceDto = new UserDeviceDto
        {
            Id = device.Id,
           
            StatusId = device.Status,
            
            CreatedByUserName = $"{device.CreatedByNavigation.FirstName} {device.CreatedByNavigation.LastName}",
            CreatedAtUtc = device.CreatedAtUtc,
            ModelName = device.DeviceModel.DeviceName,
        };


        return userDeviceDto;
    }
    public List<CommentDto> GetCommentsById(Guid deviceLogId)
    {
        var comments = _dbContext.Comments
            .Include(comment => comment.CreatedByNavigation)
            .Where(comment => comment.DeviceLogId == deviceLogId)
            .Select(comment => new CommentDto
            {
                Id = comment.Id,
                Description = comment.Description,
                CreatedBy = comment.CreatedByNavigation.FirstName??"Unkown",
                CreatedAt = comment.CreatedAtUtc
            })
            .ToList();

        return comments;
    }


}
