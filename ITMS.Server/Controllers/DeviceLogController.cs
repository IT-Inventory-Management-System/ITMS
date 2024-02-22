// Controllers/DeviceLogController.cs
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class DeviceLogController : ControllerBase
{
    private readonly DeviceLogService _deviceLogService;

    public DeviceLogController(DeviceLogService deviceLogService)
    {
        _deviceLogService = deviceLogService;
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

}
