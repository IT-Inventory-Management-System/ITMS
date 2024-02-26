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
        public RecievedByController(IUserRecievedBy UserRecievedBy )
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
        [HttpPost("RevokeAll")]
        public async Task<IActionResult> RevokeAll([FromBody] RevokeAllDTO receivedByDTO)
        {
           try
            {
                foreach (var laptop in receivedByDTO.Laptop)
                {
                    RevokeAllServiceDTO revokeAllServiceDTO = new RevokeAllServiceDTO
                    {
                        DeviceLogId = laptop.DeviceLogId,
                        ActionId = laptop.ActionId,
                        DeviceComment = laptop.DeviceComment
                    };
                    var taskResult = _UserRecievedBy.RevokeAll(false,receivedByDTO.UserId ,revokeAllServiceDTO);

                    // Wait for the task to complete
                    await taskResult;
                    if (taskResult != null)
                    {
                        // Handle success
                    }
                    else
                    {
                        return NotFound($"DeviceLog with ID {laptop.DeviceLogId} not found");
                    }
                }

                // Traverse the Software array
                foreach (var software in receivedByDTO.Software)
                {
                    RevokeAllServiceDTO revokeAllServiceDTO = new RevokeAllServiceDTO
                    {
                        DeviceLogId = software.DeviceLogId,
                        ActionId = software.ActionId,
                    };
                    var taskResult = _UserRecievedBy.RevokeAll(true, receivedByDTO.UserId, revokeAllServiceDTO);

                    // Wait for the task to complete
                    await taskResult;
                    if (taskResult != null)
                    {
                        // Handle success
                    }
                    else
                    {
                        return NotFound($"Software with ID {software.DeviceLogId} not found");
                    }
                }

                // Traverse the Accessory array
                foreach (var accessory in receivedByDTO.Accessory)
                {
                    RevokeAllServiceDTO revokeAllServiceDTO = new RevokeAllServiceDTO
                    {
                        DeviceLogId = accessory.DeviceLogId,
                        ActionId = accessory.ActionId,
                        DeviceComment = accessory.DeviceComment
                    };
                    var taskResult = _UserRecievedBy.RevokeAll(false,receivedByDTO.UserId, revokeAllServiceDTO);

                    // Wait for the task to complete
                    await taskResult;
                    if (taskResult != null)
                    {
                        // Handle success
                    }
                    else
                    {
                        return NotFound($"Accessory with ID {accessory.DeviceLogId} not found");
                    }
                }

                // All updates were successful
                return Ok(new { message = "All updates were successful" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }

    }
}
