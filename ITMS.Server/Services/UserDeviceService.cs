// Services/UserDeviceService.cs
using System;
using System.Linq;
using System.Threading.Tasks;
using ITMS.Server.DTO;
using ITMS.Server.Models;
using Microsoft.EntityFrameworkCore;
using MiNET.Blocks;

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


        return userDeviceDto;
    }

    public List<UserDeviceHistory> GetDevices(Guid id)
    {
        try
        {
            var devicesWithComments = _dbContext.DevicesLogs
                .Where(e => e.EmployeeId == id)
                .Include(d => d.Device)
                    .ThenInclude(dm => dm.DeviceModel)
                    .ToList();

            List<UserDeviceHistory> devices = new List<UserDeviceHistory>();
            foreach (var logs in devicesWithComments)
            {
                UserDeviceHistory singleUser = new UserDeviceHistory();
                singleUser.DeviceId = logs.Device.Id;
                singleUser.DeviceLogId = logs.Id;
                singleUser.cygid = logs.Device.Cygid;
                singleUser.Model = logs.Device.DeviceModel.ModelNo;
                singleUser.AssignBy =
                //logs.Employee.FirstName; 
                _dbContext.Employees
                .Where(e => e.Id == logs.AssignedBy)
                .Select(e => $"{e.FirstName} {e.LastName}")
                .FirstOrDefault();
                singleUser.AssignedDate = logs.Device.AssignedDate ?? DateTime.MinValue;


                singleUser.SubmitedBy = _dbContext.Employees
                                     .Where(e => e.Id == logs.RecievedBy)
                                     .Select(e => $"{e.FirstName} {e.LastName}")
                                     .FirstOrDefault();
                singleUser.SubmitedByDate = logs.RecievedDate ?? DateTime.MinValue;
                singleUser.Comments = _dbContext.Comments.ToList();
                //            .Where(comment => comment.DeviceId == log.Device.Id)
                //            .Select(c => new CommentDto
                //            {
                //                Id = c.Id,
                //                Description = c.Description,
                //                CreatedBy = _dbContext.Employees
                //                    .Where(employee => employee.Id == c.CreatedBy)
                //                    .Select(employee => $"{employee.FirstName} {employee.LastName}")
                //                    .FirstOrDefault(),
                //                CreatedAt = c.CreatedAtUtc,
                //                DeviceId = c.DeviceId,
                //                DeviceLogId = c.DeviceLogId
                //            })
                //            .ToList(),

                devices.Add( singleUser );
            }

            return devices;

            //var devicesWithComments = _dbContext.DevicesLogs
            //    .Where(log => log.EmployeeId == id)
            //    .Include(e => e.Employee)
            //    .Include(d => d.Device)
            //        .ThenInclude(dm => dm.DeviceModel)
            //    .Select(log => new UserDeviceHistory
            //    {
            //        cygid = log.Device.Cygid,
            //        DeviceLogId = log.Id,
            //        Model = log.Device.DeviceModel.ModelNo,
            //        DeviceId = log.DeviceId, 
            //        AssignBy = _dbContext.Employees
            //            .Where(employee => employee.Id == log.Device.AssignedBy)
            //            .Select(employee => $"{employee.FirstName} {employee.LastName}")
            //            .FirstOrDefault(),
            //        AssignedDate = (DateTime)log.Device.AssignedDate,
            //        Comments = _dbContext.Comments
            //            .Where(comment => comment.DeviceId == log.Device.Id)
            //            .Select(c => new CommentDto
            //            {
            //                Id = c.Id,
            //                Description = c.Description,
            //                CreatedBy = _dbContext.Employees
            //                    .Where(employee => employee.Id == c.CreatedBy)
            //                    .Select(employee => $"{employee.FirstName} {employee.LastName}")
            //                    .FirstOrDefault(),
            //                CreatedAt = c.CreatedAtUtc,
            //                DeviceId = c.DeviceId,
            //                DeviceLogId = c.DeviceLogId
            //            })
            //            .ToList(),
            //    })
            //    .ToList();

            //return devicesWithComments;
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return null;
        }
    }
}
