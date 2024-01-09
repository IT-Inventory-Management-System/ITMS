
using Microsoft.AspNetCore.Mvc;
using ITMS.Server.Services;
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




        [HttpGet("api/devices/categories")]
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
      
            [HttpGet("api/devices/{deviceId}")]
            public ActionResult<DeviceDto> GetDeviceStatusAndAge(string deviceId)
            {
                var deviceDto = _deviceservice.GetDeviceStatusAndAge(deviceId);

                if (deviceDto == null)
                    return NotFound();

                return Ok(deviceDto);
            }



        [HttpGet("GetDeviceByCGIId")]
        public async Task<IEnumerable<DeviceDto>> GetDeviceByCGIIdAsync(Guid cgiId) 
        {
            return await _deviceservice.GetDevicesAsync(cgiId);
        }
    }
    }





