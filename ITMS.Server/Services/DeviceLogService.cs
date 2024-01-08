

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

                Cygid = log.Cygid
            })
            .ToList();

        return deviceHistory;
    }


    public DevicelogDto GetDevicesLogInfo(string cygid)
    {
        try
        {
            var devicesLogInfo = _context.DevicesLogs
        .Include(log => log.Device)
        .Include(log => log.Employee)
        .Where(log => log.Device.Cygid == cygid)
        .OrderBy(log => log.EmployeeId)
        .FirstOrDefault();

            if (devicesLogInfo != null)
            {
                var assignedByEmployee = _context.Employees.FirstOrDefault(emp => emp.Id == devicesLogInfo.AssignedBy);
                var recievedByEmployee = _context.Employees.FirstOrDefault(emp => emp.Id == devicesLogInfo.RecievedBy);

                var assignedByFirstName = assignedByEmployee?.FirstName ?? "Unknown";
                var assignedByLastName = assignedByEmployee?.LastName ?? "Unknown";

                var recievedByFirstName = recievedByEmployee?.FirstName ?? "Unknown";
                var recievedByLastName = recievedByEmployee?.LastName ?? "Unknown";

                return new DevicelogDto
                {
                    Cygid = devicesLogInfo.Device.Cygid,
                    Cgiid = devicesLogInfo.Employee.Cgiid,
                    EmployeeName = $"{devicesLogInfo.Employee.FirstName} {devicesLogInfo.Employee.LastName}",
                    AssignedBy = $"{assignedByFirstName} {assignedByLastName}",
                    AssignedDate = devicesLogInfo.AssignedDate,
                    RecievedBy = $"{recievedByFirstName} {recievedByLastName}",
                    RecievedDate = devicesLogInfo.RecievedDate
                };
            }
            else
            {
                // Handle the case where no matching record is found
                return null;
            }
        }

        catch (Exception ex)
        {
            // Log the exception or handle it appropriately
            throw;
        }
    }



}


