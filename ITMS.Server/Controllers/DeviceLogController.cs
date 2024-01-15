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

    [HttpGet("device")]
    public async Task<IActionResult> GetDeviceHistory()
    {
        try
        {
            var deviceHistory = await _deviceLogService.GetDevicesAsync();
            return Ok(deviceHistory);
        }
        catch (Exception ex)
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
}
