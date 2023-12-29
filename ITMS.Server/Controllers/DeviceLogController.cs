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

    [HttpGet("history")]
    public IActionResult GetDeviceHistory()
    {
        try
        {
            var deviceHistory = _deviceLogService.GetDeviceHistory();
            return Ok(deviceHistory);
        }
        catch (Exception ex)
        {
            // Log the exception or handle it appropriately
            return StatusCode(500, "Internal Server Error");
        }
    }
}

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly DeviceLogService _deviceLogService;

    public UserController(DeviceLogService deviceLogService)
    {
        _deviceLogService = deviceLogService;
    }

    [HttpGet("{userId}/device-history")]
    public IActionResult GetDeviceHistoryForUser(string userId)
    {
        try
        {
            var userDeviceHistory = _deviceLogService.GetDeviceHistoryForUser(userId);
            return Ok(userDeviceHistory);
        }
        catch (Exception ex)
        {
            // Log the exception or handle it appropriately
            return StatusCode(500, "Internal Server Error");
        }
    }
}
