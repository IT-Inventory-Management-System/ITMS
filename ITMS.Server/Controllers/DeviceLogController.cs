// Controllers/DeviceLogController.cs
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class DeviceLogController : ControllerBase
{
    private readonly DeviceLogService _deviceLogService;

    public DeviceLogController(DeviceLogService deviceLogService)
    {
        _deviceLogService = deviceLogService;
    }

    [HttpGet("devices")]
    public IActionResult GetDeviceHistory()
    {
        try
        {
            var deviceHistory = _deviceLogService.GetDevices();
            return Ok(deviceHistory);
        }
        catch (Exception ex)
        {
            // Log the exception or handle it appropriately
            return StatusCode(500, "Internal Server Error");
        }
    }

    [HttpGet("devicesloginfo")]
    public IActionResult GetDevicesLogInfo()
    {
        try
        {
            var devicesLogInfo = _deviceLogService.GetDevicesLogInfo();
            return Ok(devicesLogInfo);
        }
        catch (Exception ex)
        {
            // Log the exception or handle it appropriately
            return StatusCode(500, "Internal Server Error");
        }
    }
}
