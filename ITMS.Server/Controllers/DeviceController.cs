using Microsoft.AspNetCore.Mvc;
using ITMS.Server.Services;
using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using ITMS.Server.Models;
using ITMS.Server.DTO;


namespace itms.server.controllers
{
    // devicecontroller.cs
    [Route("api/Device")]
    [ApiController]
    public class DeviceController : ControllerBase
    {
        private readonly DeviceService _deviceService;
        private readonly IGetDeviceService _getDeviceService;

        public DeviceController(DeviceService deviceService, IGetDeviceService getDeviceService)
        {
            _deviceService = deviceService;
            _getDeviceService = getDeviceService;
        }

        [HttpGet("getDevices")]
        public async Task<IEnumerable<GetDeviceDTO>> listDevices()
        {
            return await _getDeviceService.listDevices();
        }

        [HttpGet("checkDeviceStatus")]
        public async Task<IActionResult> checkDeviceStatus(string CYGID)
        {
            var result = await _getDeviceService.CheckDeviceStatus(CYGID);
            if (result.FirstOrDefault().AssignedTo == null)
            {
                return Ok(CYGID + " Not Assigned");
            }
            else
            {
                return BadRequest(CYGID + " Already Assigned");
            }

        }
        [HttpGet("categories")]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            try
            {
                var categories = await _deviceService.GetCategoriesAsync();
                return Ok(categories);
            }
            catch (Exception ex)
            {

                return StatusCode(500, "internal server error");
            }
        }



        [HttpGet("{deviceId}")]
        public async Task<ActionResult<DeviceDto>> GetDeviceStatusAndAge(string deviceId)
        {
            try
            {
                var deviceDto = await _deviceService.GetDeviceStatusAndAgeAsync(deviceId);

                if (deviceDto == null)
                    return NotFound();

                return Ok(deviceDto);
            }
            catch (Exception ex)
            {

                return StatusCode(500, "Internal Server Error");
            }
        }


        [HttpGet("GetDevices/{id}")]
        public IActionResult GetDevices(Guid id)
        {
            try
            {
                var devices = _deviceService.GetDevices(id);
                return Ok(devices);
            }
            catch (Exception ex)
            {

                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpGet("archived-cygids/{locationId}")]
        public async Task<IActionResult> GetDeviceHistory(Guid locationId)
        {
            try
            {
                var deviceHistory = await _deviceService.GetArchivedCygIdsAsync(locationId);
                return Ok(deviceHistory);
            }
            catch (Exception ex)
            {

                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpGet("get-ostype")]
        public ActionResult<IEnumerable<Ostype>> GetOstypes()
        {
            var getos = _deviceService.GetOstypes();
            return Ok(getos);
        }
        [HttpGet("get-location")]
        public ActionResult<IEnumerable<Location>> Getlocation()
        {
            var getLocation = _deviceService.Getlocation();
            return Ok(getLocation);
        }

        [HttpGet("get-status")]
        public ActionResult<IEnumerable<Location>> GetStatus()
        {
            var statusList = _deviceService.GetStatus();
            return Ok(statusList);
        }


        [HttpPost("updateDeviceStatus")]
        public async Task<IActionResult> UpdateDeviceStatus([FromBody]ArchiveDto archiveDto)
        {
            try
            {
                var result = await _deviceService.UpdateDeviceStatusToDiscarded(archiveDto);

                if (result)
                {
                    return Ok(result);
                }
                else
                {
                    return Ok();
                }
            }
            catch (Exception ex)
            {
                // Log or handle the exception as needed
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    
    [HttpPost("updateDeviceStatustoNotassigned")]
    public async Task<IActionResult> UpdateDeviceStatustoNotassigned([FromBody] ArchiveDto archiveDto)
    {
        try
        {
            var result = await _deviceService.UpdateDeviceStatusToNotAssigned(archiveDto);

            if (result)
            {
                return Ok($"Device with cygid {archiveDto.Cygid} status updated to Not Assigned.");
            }
            else
            {
                return NotFound($"Device with cygid {archiveDto.Cygid} not found or status update failed.");
            }
        }
        catch (Exception ex)
        {
            // Log or handle the exception as needed
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}
}

    
