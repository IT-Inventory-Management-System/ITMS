
using Microsoft.AspNetCore.Mvc;
using ITMS.Server.Services;

using System.Threading.Tasks;
using System.Collections.Generic;

using ITMS.Server.Models;
using ITMS.Server.Services;
using ITMS.Server.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace itms.server.controllers
{
    // devicecontroller.cs

    [ApiController]
    [Route("api/Device")]
    public class Devicecontroller : ControllerBase
    {
        private readonly DeviceService _deviceservice;

        public Devicecontroller(DeviceService deviceservice)
        {
            _deviceservice = deviceservice;
        }




        [HttpGet("categories")]
        public async Task<ActionResult<IEnumerable<Category>>> getcategories()
        {
            try
            {
                var categories = await _deviceservice.GetCategoriesAsync();
                return Ok(categories);
            }
            catch (Exception ex)
            {
                // log the exception
                return StatusCode(500, "internal server error");
            }
        }



        [HttpGet("modelCount/{deviceModelName}")]
        public async Task<ActionResult<int>> GetModelCount(string deviceModelName)
        {
            try
            {
<<<<<<< Updated upstream
                var modelCount = await _deviceservice.GetModelCountAsync(deviceModelName);
=======

                var deviceDto = await _deviceService.GetDeviceStatusAndAgeAsync(deviceId);

                var modelCount = await _deviceService.GetModelCountAsync(deviceModelName);
>>>>>>> Stashed changes
                return Ok(modelCount);
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpGet("{deviceId}")]

        public ActionResult<DeviceDto> GetDeviceStatusAndAge(string deviceId)
        {
            var deviceDto = _deviceservice.GetDeviceStatusAndAge(deviceId);

            if (deviceDto == null)
                return NotFound();

            return Ok(deviceDto);
        }



        //[HttpGet("GetDeviceByCGIId")]
        //public async Task<IEnumerable<DeviceDto>> GetDeviceByCGIIdAsync(Guid cgiId) 
        //{
        //    return await _deviceservice.GetDevicesAsync(cgiId);
        //}


        [HttpGet("GetDevices/{id}")]
        public IActionResult GetDevices(Guid id)
        {
            try
            {
                var devices = _deviceservice.GetDevices(id);
                return Ok(devices);
            }
            catch (Exception ex)
            {
                // Log the exception or handle it appropriately
                return StatusCode(500, "Internal Server Error");
            }
        }


        [HttpGet("archived-cygids")]
        public IActionResult GetDeviceHistory()
        {
            try
            {
                var deviceHistory = _deviceservice.GetArchivedCygIds();
                return Ok(deviceHistory);
            }
            catch (Exception ex)
            {
                // Log the exception or handle it appropriately
                return StatusCode(500, "Internal Server Error");
            }
        }

    }
}

    





