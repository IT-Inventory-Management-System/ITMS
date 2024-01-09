
using Microsoft.AspNetCore.Mvc;
using ITMS.Server.Services;
using ITMS.Server.DTO;




using System.Threading.Tasks;
using System.Collections.Generic;
using ITMS.Server.Models;
using Microsoft.AspNetCore.Http.HttpResults;

namespace itms.server.controllers
{
    // devicecontroller.cs
    [Route("api/devices")]
    [ApiController]
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
      
            [HttpGet("{deviceId}")]
            public ActionResult<DeviceDto> GetDeviceStatusAndAge(string deviceId)
            {
                var deviceDto = _deviceservice.GetDeviceStatusAndAge(deviceId);

                if (deviceDto == null)
                    return NotFound();

                return Ok(deviceDto);
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





