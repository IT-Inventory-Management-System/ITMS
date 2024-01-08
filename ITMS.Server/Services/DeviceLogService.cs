

using ITMS.Server.Models;
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


    public List<DevicelogDto> GetDevicesLogInfo()
    {
        var devicesLogInfo = _context.DevicesLogs 
            .OrderBy(log => log.EmployeeId) 
            .Join(_context.Employees, 
                log => log.EmployeeId,
                emp => emp.Id,
                (log, emp) => new DevicelogDto
                {
                    Cgiid = emp.Cgiid,
                    EmployeeName = $"{emp.FirstName} {emp.LastName}",
                    AssignedBy = $"{log.AssignedByNavigation.FirstName} {log.AssignedByNavigation.LastName}",
                    AssignedDate = log.AssignedDate,
                    RecievedBy = $"{log.RecievedByNavigation.FirstName} {log.RecievedByNavigation.LastName}",
                    RecievedDate = log.RecievedDate
                })
            .ToList();

        return devicesLogInfo;
    }

}
    

