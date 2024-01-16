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
        [HttpGet("{deviceLogId}/comments")]
        public ActionResult<List<CommentDto>> GetCommentsById(Guid deviceLogId)
        {
            try
            {
                List<CommentDto> comments = _userDeviceService.GetCommentsById(deviceLogId);

                if (comments == null)
                {
                    return NotFound($"Device log with ID {deviceLogId} not found.");
                }

                return Ok(comments);
            }
            catch (Exception ex)
            {
                // Log the exception and return a 500 Internal Server Error
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }
    }
}
