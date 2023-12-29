using ITMS.Server.Models;
using Microsoft.AspNetCore.Mvc;


namespace ITMS.Server.Controllers
{
    // DeviceController.cs
    [Route("api/devices")]
    [ApiController]
    public class DeviceController : ControllerBase
    {
        private readonly DeviceService _deviceService;

        public DeviceController(DeviceService deviceService)
        {
            _deviceService = deviceService;
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
                // Log the exception
                return StatusCode(500, "Internal Server Error");
            }
        }
    }


}
