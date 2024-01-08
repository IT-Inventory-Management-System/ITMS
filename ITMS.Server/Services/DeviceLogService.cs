

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
            var deviceLogInfo = _context.DevicesLogs
                .Include(log => log.Device)
                .Include(log => log.Employee)
                .Where(log => log.Device.Cygid == cygid)
                .OrderBy(log => log.EmployeeId)
                .FirstOrDefault();  // Use FirstOrDefault() instead of Select()

            if (deviceLogInfo != null)
            {
                return new DevicelogDto
                {
                    Cygid = deviceLogInfo.Device.Cygid,
                    Cgiid = deviceLogInfo.Employee.Cgiid,
                    EmployeeName = $"{deviceLogInfo.Employee.FirstName} {deviceLogInfo.Employee.LastName}",
                    AssignedBy = $"{deviceLogInfo.AssignedByNavigation.FirstName} {deviceLogInfo.AssignedByNavigation.LastName}",
                    AssignedDate = deviceLogInfo.AssignedDate,
                    RecievedBy = $"{deviceLogInfo.RecievedByNavigation.FirstName} {deviceLogInfo.RecievedByNavigation.LastName}",
                    RecievedDate = deviceLogInfo.RecievedDate
                };
            }

            // Handle the case where no matching record is found
            return null;
        }
        catch (Exception ex)
        {
            // Log the exception or handle it appropriately
            throw;
        }
    }



}


