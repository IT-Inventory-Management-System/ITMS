// Services/UserDeviceService.cs
using System;
using System.Linq;
using System.Threading.Tasks;
using ITMS.Server.DTO;
using ITMS.Server.Models;
using Microsoft.EntityFrameworkCore;

// Services/UserDeviceService.cs
public class UserDeviceService
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

        var latestComment = device.Comments.OrderByDescending(c => c.CreatedAtUtc).FirstOrDefault();
        if (latestComment != null)
        {
            userDeviceDto.CommentDescription = latestComment.Description;
            userDeviceDto.CreatedByFullName = $"{latestComment.CreatedByNavigation.FirstName} {latestComment.CreatedByNavigation.LastName}";
            userDeviceDto.CommentCreatedAtUtc = latestComment.CreatedAtUtc;
        }

        return userDeviceDto;
    }

    public List<UserDeviceHistory> GetDevices(Guid id)
    {
        try
        {
            var devicesWithComments = _dbContext.DevicesLogs
                .Where(log => log.EmployeeId == id)
                .Include(e => e.Employee)
                .Include(d => d.Device)
                    .ThenInclude(dm => dm.DeviceModel)
                .Select(log => new UserDeviceHistory
                {
                    cygid = log.Device.Cygid,
                    Model = log.Device.DeviceModel.ModelNo,
                    DeviceId = log.DeviceId, //one change
                    AssignBy = _dbContext.Employees
                        .Where(employee => employee.Id == log.Device.AssignedBy)
                        .Select(employee => $"{employee.FirstName} {employee.LastName}")
                        .FirstOrDefault(),
                    AssignedDate = (DateTime)log.Device.AssignedDate,
                    Comments = _dbContext.Comments
                        .Where(comment => comment.DeviceId == log.Device.Id)
                        .Select(c => new CommentDto
                        {
                            Id = c.Id,
                            Description = c.Description,
                            CreatedBy = _dbContext.Employees
                                .Where(employee => employee.Id == c.CreatedBy)
                                .Select(employee => $"{employee.FirstName} {employee.LastName}")
                                .FirstOrDefault(),
                            CreatedAt = c.CreatedAtUtc
                        })
                        .ToList(),
                })
                .ToList();

            return devicesWithComments;
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return null;
        }
    }
}
