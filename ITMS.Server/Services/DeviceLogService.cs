using ITMS.Server.DTO;
using ITMS.Server.Models;
using Microsoft.EntityFrameworkCore;
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
        var deviceHistory = await _context.Devices.OrderBy(log => log.Cygid)
            .Select(log => new DevicelogDto
            {

                Cygid = log.Cygid
            })
            .ToListAsync();

        return deviceHistory;
    }

    public async Task<IEnumerable<DevicelogDto>> GetDevicesLogInfoAsync(string cygid)
    {
        try
        {
            var devicesLogInfoList = await _context.DevicesLogs
                .Include(log => log.Device)
                .Include(log => log.Employee)
                .Include(log => log.Comment)
                .Where(log => log.Device.Cygid == cygid)
                .OrderBy(log => log.EmployeeId)
                .ToListAsync();

            return devicesLogInfoList.Select(devicesLogInfo =>
            {
                var assignedByEmployee = _context.Employees.FirstOrDefault(emp => emp.Id == devicesLogInfo.AssignedBy);
                var receivedByEmployee = _context.Employees.FirstOrDefault(emp => emp.Id == devicesLogInfo.RecievedBy);

                var assignedByFirstName = assignedByEmployee?.FirstName ?? "Unknown";
                var assignedByLastName = assignedByEmployee?.LastName ?? "Unknown";

                var receivedByFirstName = receivedByEmployee?.FirstName ?? "Unknown";
                var receivedByLastName = receivedByEmployee?.LastName ?? "Unknown";

                return new DevicelogDto
                {
                    Cygid = devicesLogInfo.Device.Cygid,
                    Cgiid = devicesLogInfo.Employee.Cgiid,
                    EmployeeName = $"{devicesLogInfo.Employee.FirstName} {devicesLogInfo.Employee.LastName}",
                    AssignedBy = $"{assignedByFirstName} {assignedByLastName}",
                    AssignedDate = devicesLogInfo.AssignedDate,
                    RecievedBy = $"{receivedByFirstName} {receivedByLastName}",
                    RecievedDate = devicesLogInfo.RecievedDate,
                    FormattedAssignedDate = devicesLogInfo.AssignedDate?.ToString("MM-dd-yyyy") ?? "DefaultDate",
                    Comment = new CommentDto
                    {
                        CommentCreatedAtUtc = DateTime.UtcNow,
                        CommentDescription = devicesLogInfo.Comment?.Description,
                        CreatedByFullName = $"{assignedByFirstName} {assignedByLastName}"
                    }
                };
            });
        }
        catch (Exception ex)
        {
            // Log the exception or handle it appropriately
            throw;
        }
    }
}
