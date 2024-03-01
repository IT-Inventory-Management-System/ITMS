using ITMS.Server.Models;

using ITMS.Server.DTO;
using ITMS.Server.Models;
using Microsoft.EntityFrameworkCore;
using Prism.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
 
public class DeviceLogService
{
    private readonly ItinventorySystemContext _context;

    public DeviceLogService(ItinventorySystemContext context)
    {
        _context = context;
    }

    public List<DevicelogDto> GetDevicesAsync(Guid locationId)
    {
        var deviceHistory = _context.Devices
            .Include(log => log.DeviceModel)
            .ThenInclude(model => model.Category)
            .Where(log => log.LocationId == locationId && log.DeviceModel.Category.Name == "Laptop")
            .OrderBy(log => log.Cygid)
            .Join(
                _context.Statuses,
                device => device.Status,
                status => status.Id,
                (device, status) => new DevicelogDto
                {
                    Id = device.Id,
                    Cygid = device.Cygid,
                    status = status.Type,
                    OperatingSystem = device.DeviceModel.OsNavigation.Osname,
                    purchaseDate = device.PurchasedDate,
                    processor = device.DeviceModel.Processor
                }
            )
            .ToList();

        return deviceHistory;
    }


    public async Task<IEnumerable<DevicelogDto>> GetDevicesLogInfoAsync(string cygid)
    {
        try
        {
            var deviceId = await GetDeviceIdByCygidAsync(cygid);

            if (deviceId != Guid.Empty)
            {
                var devicelogIds = await GetDevicelogIdsByDeviceIdAsync(deviceId);


                var devicesLogInfoList = await _context.DevicesLogs
                    .Include(log => log.Device)
                    .Include(log => log.Employee)
                    .Include(log => log.Comment)
                    .Where(log => log.Device.Cygid == cygid)
                    .OrderBy(log => log.EmployeeId)
                    .ToListAsync();

                foreach (var devicelogId in devicelogIds)
                {
                    var comments = await GetCommentsByDeviceLogIdAsync(devicelogId);
                    List<Comment> commentDtos = new List<Comment>();
                    foreach (var comment in comments)
                    {
                        commentDtos.Add(new Comment
                        {
                            Id = comment.Id,
                            
                            Description = comment.Description,
                            DeviceLogId = comment.DeviceLogId,
                            CreatedByNavigation = new Employee
                            {
                                FirstName = comment.CreatedBy,
                            },
                            CreatedAtUtc = comment.CreatedAt
                        });
                    }
                    var deviceLogInfo = devicesLogInfoList.FirstOrDefault(log => log.Id == devicelogId);
                    //deviceLogInfo.Comments = commentDtos;
                }

                return devicesLogInfoList.Select(devicesLogInfo => FormatDevicelogDto(devicesLogInfo));
            }
            else
            {
                Console.WriteLine($"Device with Cygid '{cygid}' not found.");
                return Enumerable.Empty<DevicelogDto>();
            }
            return null;
        }
        catch (Exception ex)
        {
            throw;
        }
    }


    private DevicelogDto FormatDevicelogDto(DevicesLog devicesLogInfo)
    {
        var assignedByEmployee = _context.Employees.FirstOrDefault(emp => emp.Id == devicesLogInfo.AssignedBy);
        var receivedByEmployee = _context.Employees.FirstOrDefault(emp => emp.Id == devicesLogInfo.RecievedBy);

        var assignedByFirstName = assignedByEmployee?.FirstName ?? "-";
        var assignedByLastName = assignedByEmployee?.LastName ?? "-";

        var receivedByFirstName = receivedByEmployee?.FirstName ?? "-";
        var receivedByLastName = receivedByEmployee?.LastName ?? "-";

        return new DevicelogDto
        {
            Id = devicesLogInfo.Id,
            Cygid = devicesLogInfo.Device.Cygid,
            DeviceId = devicesLogInfo.Device.Id,
            Cgiid = devicesLogInfo.Employee.Cgiid,
            UserId = devicesLogInfo.Employee.Id,
            EmployeeName = $"{devicesLogInfo.Employee.FirstName} {devicesLogInfo.Employee.LastName}",
            AssignedBy = $"{assignedByFirstName} {assignedByLastName}",
            AssignedDate = devicesLogInfo.AssignedDate,
            RecievedBy = $"{receivedByFirstName} {receivedByLastName}",
            RecievedDate = devicesLogInfo.RecievedDate,
            FormattedAssignedDate = devicesLogInfo.AssignedDate?.ToString("MM-dd-yyyy") ?? "DefaultDate",
            Comments = devicesLogInfo.Comments
        };
    }

    public async Task<List<CommentDto>> GetCommentsByDeviceLogIdAsync(Guid devicelogId)
    {
        try
        {
            var comments = await _context.Comments
                .Where(comment => comment.DeviceLogId == devicelogId)
                .OrderByDescending(comment => comment.CreatedAtUtc)
                .Select(comment => new CommentDto
                {
                    Id = comment.Id,
                    DeviceLogId = comment.DeviceLogId,
                    Description = comment.Description,
                    CreatedBy = comment.CreatedByNavigation.FirstName,
                    CreatedAt = comment.CreatedAtUtc,
                })
         .ToListAsync();
            // Assuming you have a CommentDto instance called 'commentDto'


            return comments;
        }
        catch (Exception ex)
        {
            throw;
        }
    }

    public async Task<Guid> GetDeviceIdByCygidAsync(string cygid)
    {
        try
        {
            var device = await _context.Devices
                .Where(d => d.Cygid == cygid)
                .Select(d => d.Id)
                .FirstOrDefaultAsync();

            if (device == Guid.Empty)
            {
                return Guid.Empty;
            }

            return device;
        }
        catch (Exception ex)
        {
            throw;
        }
    }

    public async Task<List<Guid>> GetDevicelogIdsByDeviceIdAsync(Guid deviceId)
    {
        try
        {
            var devicelogIds = await _context.DevicesLogs
                .Where(log => log.DeviceId == deviceId)
                .Select(log => log.Id)
                .ToListAsync();

            return devicelogIds;
        }
        catch (Exception ex)
        {
            throw;
        }
    }

    public CommentDto AddComment(DeviceAddComment commentDto)
    {
        System.Threading.Thread.CurrentThread.CurrentCulture = new System.Globalization.CultureInfo(System.Threading.Thread.CurrentThread.CurrentCulture.Name);
        Comment commentEntity = new Comment
        {
            Description = commentDto.Description,
            CreatedBy = commentDto.CreatedBy,
            CreatedAtUtc = DateTime.Now,
            DeviceId = commentDto.DeviceId,
            DeviceLogId = commentDto.DeviceLogId
        };

        var createdByEntity = _context.Employees
      .Where(e => e.Id == commentDto.CreatedBy)
      .FirstOrDefault();


        if (createdByEntity != null)
        {
            commentEntity.CreatedByNavigation = createdByEntity;
        }


        _context.Comments.Add(commentEntity);
        _context.SaveChanges();


        CommentDto addedComment = new CommentDto
        {
            Id = commentEntity.Id,
            DeviceLogId = commentEntity.DeviceLogId,
            DeviceId = commentEntity.DeviceId,
            Description = commentEntity.Description,
            CreatedBy = commentEntity.CreatedByNavigation != null
                             ? $"{commentEntity.CreatedByNavigation.FirstName} "
                             : null,
            CreatedAt = commentEntity.CreatedAtUtc,
        };

        return addedComment;
    }

    public List<historySingleDevice> singleHistory(Guid locationId, string CYGID)
    {

        return _context.DevicesLogs
     .Include(dl => dl.Device)
     .Include(dl => dl.Employee)
     .Include(dl => dl.AssignedByNavigation)
     .Where(dl => (dl.Device.LocationId == locationId) && (dl.Device.Cygid == CYGID))
     .OrderBy(dl => dl.UpdatedAtUtc)
     .GroupBy(dl => new
     {
         empName = dl.Employee.FirstName + " " + dl.Employee.LastName,
         CYGID = dl.Employee.Cgiid,
         AssignedBy = dl.AssignedByNavigation.FirstName + " " + dl.AssignedByNavigation.LastName,
         AssignedDate = dl.AssignedDate
     })
     .Select(group => new historySingleDevice
     {
         empName = group.Key.empName,
         CYGID = group.Key.CYGID,
         AssignedBy = group.Key.AssignedBy,
         AssignedDate = group.Key.AssignedDate,
         RecievedBy = group.FirstOrDefault().RecievedBy == null ? null : _context.Employees
             .Where(e => e.Id == group.FirstOrDefault().RecievedBy)
             .Select(e => e.FirstName + " " + e.LastName)
             .FirstOrDefault(),
         RecievedDate = group.FirstOrDefault().RecievedBy == null ? null : group.FirstOrDefault().RecievedDate
     })
     .ToList();


    }
}