﻿using ITMS.Server.DTO;
using ITMS.Server.Models;
using ITMS.Server.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;


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

        [Authorize]
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

        [Authorize]
        [HttpPost("RevokeAll")]
        public async Task<IActionResult> RevokeAll([FromBody] RevokeAllDTO receivedByDTO)
        {
           try
            {
                List<object> laptopResults = new List<object>(); 
                List<object> softwareResults = new List<object>();
                List<object> accessoryResults = new List<object>(); 

                foreach (var laptop in receivedByDTO.Laptop)
                {
                    RevokeAllServiceDTO revokeAllServiceDTO = new RevokeAllServiceDTO
                    {
                        DeviceLogId = laptop.DeviceLogId,
                        ActionId = laptop.ActionId,
                        DeviceComment = laptop.DeviceComment,
                        CreatedBy = receivedByDTO.CreatedBy,
                        DeviceId = laptop.DeviceId,
                        userId = receivedByDTO.archiveUserId,
                    };
                    var taskResult = await _UserRecievedBy.RevokeAll(false, revokeAllServiceDTO);

                    // Wait for the task to complete
                    //await taskResult;
                    if (taskResult != null)
                    {
                        laptopResults.Add(taskResult);
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
                        CreatedBy = receivedByDTO.CreatedBy,
                        userId = receivedByDTO.CreatedBy,
                        SoftwareAllocation= software.SoftwareAllocationId,
                        DeviceId = null,
                        //add deviceId,
                    };
                    var taskResult = await _UserRecievedBy.RevokeAll(true, revokeAllServiceDTO);

                    // Wait for the task to complete
                   // await taskResult;
                    if (taskResult != null)
                    {
                        softwareResults.Add(taskResult);
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
                        DeviceComment = accessory.DeviceComment,
                        CreatedBy = receivedByDTO.CreatedBy,
                        DeviceId = accessory.DeviceId,
                        userId = receivedByDTO.archiveUserId                       
                    };
                    var taskResult = await _UserRecievedBy.RevokeAll(false, revokeAllServiceDTO);

                    // Wait for the task to complete
                   // await taskResult;
                    if (taskResult != null)
                    {
                        accessoryResults.Add(taskResult);
                    }
                    else
                    {
                        return NotFound($"Accessory with ID {accessory.DeviceLogId} not found");
                    }
                }

                await _UserRecievedBy.ArchiveEmployee(receivedByDTO.CreatedBy, receivedByDTO.archiveUserId);
                // All updates were successful
                return Ok(new
                {
                    message = "All updates were successful",
                    LaptopResults = laptopResults,
                    SoftwareResults = softwareResults,
                    AccessoryResults = accessoryResults
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }


        [Authorize]
        [HttpPost("updateExitProcessInitiation")]
        public async Task<IActionResult> UpdateExitProcess([FromBody] UpdateExitProcessInitiated dto)
        {
            try
            {
                await _UserRecievedBy.UpdateExitProcessInitiated(dto);
                return Ok(new { message = "Exit process updated successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

    }
}
