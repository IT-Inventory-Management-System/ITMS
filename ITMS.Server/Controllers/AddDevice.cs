using ITMS.Server.Models;
using ITMS.Server.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ITMS.Server.Controllers
{
    [ApiController]
    [Route("api/devices")]
    public class DeviceController : ControllerBase
    {
        private readonly IDeviceService _deviceService;

        public DeviceController(IDeviceService deviceService)
        {
            _deviceService = deviceService;
        }

        [HttpGet("unique-device-models")]
        public async Task<IActionResult> GetUniqueDeviceModels()
        {
            var uniqueDeviceModels = await _deviceService.GetUniqueDeviceModelsAsync();
            return Ok(uniqueDeviceModels);
        }
    }
}



