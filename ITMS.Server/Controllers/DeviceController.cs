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

        [HttpGet("getDevicess/{locationId}")]
        public async Task<IEnumerable<GetDeviceDTO>> listDevices(Guid locationId)
        {
            return await _getDeviceService.listDevices(locationId);
        }

        [HttpGet("getAllComments/{deviceId}")]
        public async Task<IEnumerable<getComments>> listAllComments(Guid deviceId)
        {
            return await _getDeviceService.listAllComments(deviceId);
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

        [HttpGet("get-unique-processors")]
        public ActionResult<IEnumerable<ProcessorDto>> GetUniqueProcessors()
        {
            var processors = _deviceService.GetUniqueProcessors();
            return Ok(processors);
        }

        [HttpPost("updateDeviceStatus")]
        public async Task<IActionResult> UpdateDeviceStatus([FromBody] ArchivedoneDto archiveDto)
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
                return BadRequest(ex);
            }
        }
    
    [HttpPost("updateDeviceStatustoNotassigned")]
    public async Task<IActionResult> UpdateDeviceStatustoNotassigned([FromBody] ArchivedoneDto archiveDto)
    {
        try
        {
            var result = await _deviceService.UpdateDeviceStatusToNotAssigned(archiveDto);

            if (result)
            {
                return Ok(result);
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
        [HttpGet("DeviceModels/{DeviceModelId}")]
        public async Task<IActionResult> GetDeviceModels(Guid DeviceModelId, [FromQuery] Guid location)
        {
            try
            {
                var deviceHistory = await _deviceService.GetDeviceModels(DeviceModelId, location);
                return Ok(deviceHistory);
            }
            catch (Exception ex)
            {

                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}

    
