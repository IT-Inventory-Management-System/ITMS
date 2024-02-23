// Controllers/DeviceLogController.cs
using ITMS.Server.Models;
using ITMS.Server.Services;
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
    //, 
    [HttpPost("employeeLog")]
    public List<returnSingleLog> GetDevicesLogs([FromBody] adminHistoryParamsDTO adminHistoryParams)
    {
        var employeeId = Guid.Parse(adminHistoryParams.employeeId);
        var locationName = Guid.Parse(adminHistoryParams.locationName);

        var groupedLogs = _context.DevicesLogs
            .Include(dl => dl.UpdatedByNavigation)
            .Where(dl => (dl.UpdatedBy == employeeId) &&(dl.DeviceId != null ? dl.Device.LocationId == locationName : dl.SoftwareAllocationNavigation.LocationId == locationName))
            .OrderByDescending(dl => dl.UpdatedAtUtc)
            .GroupBy(dl => dl.UpdatedAtUtc.Date)
                          .Select(dl => new returnSingleLog
                          {
                              UpdatedDate = dl.Key,
                              Logs = dl.Select(s => new singleLog
                              {
                                  CYGID = s.DeviceId != null ? s.Device.Cygid : null,

                                  UpdatedBy = s.UpdatedByNavigation.FirstName + " " + s.UpdatedByNavigation.LastName != null ? s.UpdatedByNavigation.LastName : null,

                                  SubmittedTo = s.RecievedBy != null ? _context.Employees
                                              .Where(e => (e.Id == s.RecievedBy) && (s.DeviceId != null ? s.Device.LocationId == locationName : s.SoftwareAllocationNavigation.LocationId == locationName))
                                              .Select(e => e.FirstName + " " + e.LastName)
                                              .FirstOrDefault() : null,

                                  AssignedTo = s.EmployeeId != null ? _context.Employees
                                              .Where(e => (e.Id == s.EmployeeId) && (s.DeviceId != null ? s.Device.LocationId == locationName : s.SoftwareAllocationNavigation.LocationId == locationName))
                                              .Select(e => e.FirstName + " " + e.LastName)
                                              .FirstOrDefault() :
                                              null,

                                  SoftwareName = s.SoftwareAllocation != null ? s.SoftwareAllocationNavigation.Software.SoftwareName : null,

                                  Category = s.DeviceId != null ? s.Device.DeviceModel.Category.Name : null,
                                  Action = s.Action.ActionName,
                                  UpdatedOn = s.UpdatedAtUtc,
                              })
                          })
       .ToList();

        return groupedLogs;
    }

    [HttpPost("filterEmployeeLog")]
    public List<returnSingleLog> FilterDevicesLogs([FromBody] filterDateadminHistoryParamsDTO filterParams)
    {
        adminHistoryParamsDTO allDataParams = new adminHistoryParamsDTO() { employeeId= filterParams.employeeId, locationName = filterParams.locationName };
        List<returnSingleLog> allData = GetDevicesLogs(allDataParams);

        allData = allData.Where(ud => DateOnly.FromDateTime((DateTime)ud.UpdatedDate) == filterParams.Date).ToList();


        return allData;
    }
}
