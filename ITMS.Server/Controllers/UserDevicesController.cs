using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ITMS.Server.Services;

namespace ITMS.Server.Controllers
{
    [ApiController]
    [Route("api/userdevices")]
    public class UserDeviceController : ControllerBase
    {
        private readonly UserDeviceService _userDeviceService;

        public UserDeviceController(UserDeviceService userDeviceService)
        {
            _userDeviceService = userDeviceService;
        }

        [HttpGet("{deviceId}")]
        public async Task<IActionResult> GetUserDeviceById(Guid deviceId)
        {
            var userDeviceDto = await _userDeviceService.GetUserDeviceById(deviceId);

            if (userDeviceDto == null)
            {
                return NotFound();
            }

            return Ok(userDeviceDto);
        }
    }
}
