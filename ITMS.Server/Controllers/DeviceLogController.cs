// Controllers/DeviceLogController.cs
using ITMS.Server.DTO;
using ITMS.Server.Models;
using ITMS.Server.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;
using static adminHistoryParamsDTO;

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
    public List<DevicelogDto> GetDeviceHistory(Guid locationId)
    {

        try
        {
            List<DevicelogDto> deviceHistory = _deviceLogService.GetDevicesAsync(locationId);
            return deviceHistory;
        }
        catch (Exception)
        {
            // Log the exception or handle it appropriately
            return new List<DevicelogDto>();
        }
    }

    [HttpGet("devicesloginfo/{cygid}")]
    public async Task<IEnumerable<DevicelogDto>> GetDevicesLogInfo(string cygid)
    {
        try
        {
            var devicesLogInfo = await _deviceLogService.GetDevicesLogInfoAsync(cygid);
            return devicesLogInfo;
        }
        catch (Exception ex)
        {
            // Log the exception or handle it appropriately
            // return StatusCode(500, "Internal Server Error");
            return new List<DevicelogDto>();
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
    

    [HttpPost("employeeLog")]
    public List<returnSingleLog> GetDevicesLogs([FromBody] adminHistoryParamsDTO adminHistoryParams)
    {
        var employeeId = adminHistoryParams.employeeId != null ? Guid.Parse(adminHistoryParams.employeeId) : (Guid?)null;

        var locationName = Guid.Parse(adminHistoryParams.locationName);

        var groupedLogs = _context.DevicesLogs
            .Include(dl => dl.UpdatedByNavigation)
            .Where(dl => ((employeeId==null)||(dl.UpdatedBy == employeeId)) &&(dl.DeviceId != null ? dl.Device.LocationId == locationName : dl.SoftwareAllocationNavigation.LocationId == locationName))
            .OrderByDescending(dl => dl.UpdatedAtUtc)
            .GroupBy(dl => dl.UpdatedAtUtc.Date)
                          .Select(dl => new returnSingleLog
                          {
                              UpdatedDate = dl.Key,
                              Logs = dl.Select(s => new singleLog
                              {
                                  CYGID = s.DeviceId != null ? s.Device.Cygid : null,

                                  //UpdatedBy = s.UpdatedByNavigation.FirstName + " " + s.UpdatedByNavigation.LastName != null ? s.UpdatedByNavigation.LastName : null,
                                  UpdatedBy = s.UpdatedByNavigation != null && s.UpdatedByNavigation.FirstName != null
              ? s.UpdatedByNavigation.FirstName + " " + (s.UpdatedByNavigation.LastName != null ? s.UpdatedByNavigation.LastName : "")
              : null,

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
                              }).OrderByDescending(l => l.UpdatedOn).ToList()
                          }).OrderByDescending(group => group.UpdatedDate)
       .ToList();

        return groupedLogs;
    }                            
    
    [HttpPost("filterDevices")]
    public List<DevicelogDto> FiltterCard([FromBody] FilterDTO filterInput)
    {

        List<DevicelogDto> filterDevices = GetDeviceHistory(filterInput.locationId);
        filterDevices = filterDevices.Where(d =>
        (filterInput.deviceStatus.Count == 0|| filterInput.deviceStatus.Contains(d.status)) &&
        (filterInput.operatingSystem.Count == 0|| filterInput.operatingSystem.Contains(d.OperatingSystem)) &&
        (filterInput.uniqueProcessor.Count == 0 || filterInput.uniqueProcessor.Contains(d.processor)) &&
        (filterInput.fromDate == null || ((DateOnly.FromDateTime((DateTime)d.purchaseDate) >= filterInput.fromDate))) &&
        (filterInput.toDate == null ||  ((DateOnly.FromDateTime((DateTime)d.purchaseDate) <= filterInput.toDate)))
        ).ToList();

        return filterDevices;
    }

    [HttpPost("singleHistoryDevice")]
    public List<historySingleDevice> singleHistoryDevice([FromBody] locationDeviceDTO dto)
    {
        List<historySingleDevice> history = _deviceLogService.singleHistory(dto.locationId, dto.CYGID);

        return history;
    }

    //[HttpPost("employeeLog")]
    //public IActionResult GetDevicesLogs(Guid employeeId, string location)
    //{
    //    // Retrieve DevicesLog data based on EmployeeId and Location
    //    var devicesLogs = _context.DevicesLogs
    //        .Where(dl => dl.EmployeeId == employeeId && dl.Device.Location.Location1 == location)
    //        .OrderBy(dl => dl.CreatedAtUtc) // Assuming logs are ordered by CreatedAtUtc
    //        .ToList();

                               

    [HttpPost("filterEmployeeLog")]
    public List<returnSingleLog> FilterDevicesLogs([FromBody] filterDateadminHistoryParamsDTO filterParams)
    {
        var employeeId = filterParams.employeeId != null ? filterParams.employeeId : null;
        // adminHistoryParamsDTO allDataParams = new adminHistoryParamsDTO() { employeeId= filterParams.employeeId, locationName = filterParams.locationName };
        adminHistoryParamsDTO allDataParams = new adminHistoryParamsDTO() { employeeId = employeeId, locationName = filterParams.locationName };
        List<returnSingleLog> allData = GetDevicesLogs(allDataParams);

        if (filterParams.Date != new DateOnly())
        {
            allData = allData.Where(ud => DateOnly.FromDateTime((DateTime)ud.UpdatedDate) == filterParams.Date).ToList();
        }


        return allData;
    }
}
