// Controllers/DeviceLogController.cs
using ITMS.Server.DTO;
using ITMS.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class DeviceLogController : ControllerBase
{
    private readonly DeviceLogService _deviceLogService;
    private readonly ItinventorySystemContext _context;

    public DeviceLogController(DeviceLogService deviceLogService, ItinventorySystemContext context)
    {
        _deviceLogService = deviceLogService;
        _context = context;
    }

    [HttpGet("devices/{locationId}")]
    public async Task<IActionResult> GetDeviceHistory(Guid locationId)
    {

        try
        {
            var deviceHistory = await _deviceLogService.GetDevicesAsync(locationId);
            return Ok(deviceHistory);
        }
        catch (Exception)
        {
            // Log the exception or handle it appropriately
            return StatusCode(500, "Internal Server Error");
        }
    }

    [HttpGet("devicesloginfo/{cygid}")]
    public async Task<IActionResult> GetDevicesLogInfo(string cygid)
    {
        try
        {
            var devicesLogInfo = await _deviceLogService.GetDevicesLogInfoAsync(cygid);
            return Ok(devicesLogInfo);
        }
        catch (Exception ex)
        {
            // Log the exception or handle it appropriately
            return StatusCode(500, "Internal Server Error");
        }
    }

    [HttpPost("Comment")]
    public IActionResult AddComment([FromBody] DeviceAddComment commentDto)
    {
        try
        {
            CommentDto addedComment = _deviceLogService.AddComment(commentDto);
            return Ok(new { Message = "Comment added successfully", Comment = addedComment });
        }
        catch (Exception ex)
        {
            // Log the exception or handle it accordingly
            return StatusCode(500, new { Message = "Internal Server Error" });
        }
    }

    [HttpPost("filterDevices")]
    public Task<IActionResult> FiltterCard([FromBody] FilterDTO filterInput)
    {

        Task<IActionResult> filterDevices = GetDeviceHistory(filterInput.locationId);
        //filterDevices = filterDevices.Where(d => (filterInput.deviceStatus.Count == 0 || filterInput.deviceStatus.Contains(d.status)));

        return filterDevices;
    }


    //[HttpPost("employeeLog")]
    //public IActionResult GetDevicesLogs(Guid employeeId, string location)
    //{
    //    // Retrieve DevicesLog data based on EmployeeId and Location
    //    var devicesLogs = _context.DevicesLogs
    //        .Where(dl => dl.EmployeeId == employeeId && dl.Device.Location.Location1 == location)
    //        .OrderBy(dl => dl.CreatedAtUtc) // Assuming logs are ordered by CreatedAtUtc
    //        .ToList();

    //    // Group the logs by date
    //    var groupedLogs = devicesLogs.GroupBy(dl => dl.CreatedAtUtc.Date);

    //    // Create a list to hold the formatted logs
    //    var formattedLogs = new List<string>();

    //    // Format each group of logs
    //    foreach (var group in groupedLogs)
    //    {
    //        // Format the date
    //        string formattedDate = group.Key.ToString("MM-dd-yyyy");
    //        formattedLogs.Add(formattedDate);

    //        // Format each log entry
    //        foreach (var logEntry in group)
    //        {
    //            string formattedTime = logEntry.CreatedAtUtc.ToString("hh:mm tt");
    //            //string logInfo = $"{formattedTime}\n{logEntry.Device.DeviceModel.DeviceName} has been {logEntry.Action.ActionName.ToLower()} by {logEntry.AssignedByNavigation.FullName}";
    //            formattedLogs.Add(logInfo);
    //        }
    //    }

    //    return Ok(formattedLogs);
    //}

}
