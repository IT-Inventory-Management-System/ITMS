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

    public async Task<List<DevicelogDto>> GetDevicesAsync()
    {
        
        var deviceHistory = await _context.Devices
            .OrderBy(log => log.Cygid)
            .Select(log => new DevicelogDto
            {
                Id = log.Id,
                Cygid = log.Cygid
            })
            .ToListAsync();

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
                    foreach(var comment in comments)
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
                deviceLogInfo.Comments = commentDtos;
            
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
            DeviceId=devicesLogInfo.Device.Id,
            Cgiid = devicesLogInfo.Employee.Cgiid,
            UserId=devicesLogInfo.Employee.Id,
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

    public List<CommentDto> AddComment(DeviceAddComment commentDto)
    {
        System.Threading.Thread.CurrentThread.CurrentCulture = new System.Globalization.CultureInfo(System.Threading.Thread.CurrentThread.CurrentCulture.Name);
        Comment commentEntity = new Comment
        {
            Description = commentDto.Description,
            CreatedBy = commentDto.CreatedBy,
            CreatedAtUtc = DateTime.Now,
            DeviceId = commentDto.DeviceId,
            DeviceLogId= commentDto.DeviceLogId
        };

            _context.Comments.Add(commentEntity);
            _context.SaveChanges();

            // Retrieve the updated list of comments after adding the new comment
            var updatedComments = GetCommentsByDeviceLogIdAsync(commentDto.DeviceLogId).Result;

            return updatedComments;
        }
        catch (Exception ex)
        {
            throw;
        }
    }


}


