

using ITMS.Server.DTO;
using ITMS.Server.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

public class DeviceLogService
{
    private readonly ItinventorySystemContext _context;

    public DeviceLogService(ItinventorySystemContext context)
    {
        _context = context;
    }

    public List<DevicelogDto> GetDevices()
    {
        var deviceHistory = _context.Devices.OrderBy(log => log.Cygid)
            .Select(log => new DevicelogDto
            {
                Id = log.Id,
                Cygid = log.Cygid
            })
            .ToList();

        return deviceHistory;
    }


    public IEnumerable<DevicelogDto> GetDevicesLogInfo(string cygid)
    {
        try
        {
            var devicesLogInfoList = _context.DevicesLogs
                .Include(log => log.Device)
                .Include(log => log.Employee)
                .Where(log => log.Device.Cygid == cygid)
                .OrderBy(log => log.EmployeeId)
                .ToList();

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
                   Id = devicesLogInfo.Id,
                    Cygid = devicesLogInfo.Device.Cygid,
                    Cgiid = devicesLogInfo.Employee.Cgiid,
                    EmployeeName = $"{devicesLogInfo.Employee.FirstName} {devicesLogInfo.Employee.LastName}",
                    AssignedBy = $"{assignedByFirstName} {assignedByLastName}",
                    AssignedDate = devicesLogInfo.AssignedDate,
                    RecievedBy = $"{receivedByFirstName} {receivedByLastName}",
                    RecievedDate = devicesLogInfo.RecievedDate,
                    FormattedAssignedDate = devicesLogInfo.AssignedDate?.ToString("MM-dd-yyyy") ?? "DefaultDate"

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







