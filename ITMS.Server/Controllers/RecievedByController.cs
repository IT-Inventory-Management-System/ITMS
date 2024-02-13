using ITMS.Server.DTO;
using ITMS.Server.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ITMS.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecievedByController : ControllerBase
    {
        private readonly IUserRecievedBy _UserRecievedBy;
        public RecievedByController(IUserRecievedBy UserRecievedBy)
        {
            _UserRecievedBy = UserRecievedBy;
        }
        [HttpPost]
        public async Task<IActionResult> UpdateReceivedBy([FromBody] RecievedByDTO receivedByDTO)
        {
            try
            {
                var updatedReceivedBy = await _UserRecievedBy.UpdateReceivedBy(receivedByDTO);
                if (updatedReceivedBy != null)
                {
                    return Ok(new { receivedBy = updatedReceivedBy });
                }
                else
                {
                    return NotFound($"DeviceLog with ID {receivedByDTO.deviceLogId} not found");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }

    }
}
