
//using ITMS.Server.Models;
//using Microsoft.AspNetCore.Mvc;


//namespace ITMS.Server.Controllers
//{
//    // DeviceController.cs
//    [Route("api/categories")]
//    [ApiController]
//    public class DeviceController : ControllerBase
//    {
//        private readonly DeviceService _deviceService;

//        public DeviceController(DeviceService deviceService)
//        {
//            _deviceService = deviceService;
//        }




//        [HttpGet("categories")]
//        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
//        {
//            try
//            {
//                var categories = await _deviceService.GetCategoriesAsync();
//                return Ok(categories);
//            }
//            catch (Exception ex)
//            {
//                // Log the exception
//                return StatusCode(500, "Internal Server Error");
//            }
//        }
//    }

using Microsoft.AspNetCore.Mvc;
using ITMS.Server.Services;
using ITMS.Server.DTO;

namespace ITMS.Server.Controllers
{
    [ApiController]
    [Route("api/devices")]
    public class DeviceController : ControllerBase
    {
        private readonly DeviceService _deviceService;

        public DeviceController(DeviceService deviceService)
        {
            _deviceService = deviceService;
        }

        [HttpGet("{deviceId}")]
        public ActionResult<DeviceDto> GetDeviceStatusAndAge(string deviceId)
        {
            var deviceDto = _deviceService.GetDeviceStatusAndAge(deviceId);

            if (deviceDto == null)
                return NotFound();

            return Ok(deviceDto);
        }
    }
}

