using ITMS.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ITMS.Server.Controllers
{
    [ApiController]
    [Route("api/devices")]
    public class AddDeviceController : ControllerBase
    {
        private readonly IDeviceService _deviceService;

        public AddDeviceController(IDeviceService deviceService)
        {
            _deviceService = deviceService;
        }

        [HttpGet("device-models")]
        public async Task<IActionResult> GetLaptopModelsName()
        {
            var uniqueDeviceModels = await _deviceService.GetLaptopModelsAsync();
            return Ok(uniqueDeviceModels);
        }

        [HttpGet("software-models")]
        public async Task<IActionResult> GetSoftwareModelsName()
        {
            var uniqueSoftwareModels = await _deviceService.GetSoftwareModelsAsync();
            return Ok(uniqueSoftwareModels);
        }
    }
}



