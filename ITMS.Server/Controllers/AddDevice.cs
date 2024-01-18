using ITMS.Server.Models;
using ITMS.Server.Services;
using ITMS.Server.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
namespace ITMS.Server.Controllers
{
    [ApiController]
    [Route("api/addDevices")]
    public class AddDeviceController : ControllerBase
    {
        private readonly IDeviceService _deviceService;

        public AddDeviceController(IDeviceService deviceService)
        {
            _deviceService = deviceService;
        }

        [HttpGet("device-models")]
        public async Task<IActionResult> GetLaptopModelsName()
        {
            var uniqueDeviceModels = await _deviceService.GetLaptopModelsAsync();
            return Ok(uniqueDeviceModels);
        }



        [HttpPost]
        public ActionResult PutLaptops([FromBody] PutLaptop pLaptop)
        {
            try
            {
                _deviceService.AddDevice(pLaptop);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }


        [HttpPost("update")]
        public ActionResult PutDeviceModel([FromBody] PutDeviceModel model)
        {
            try
            {
                _deviceService.AddDeviceModel(model);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpGet("software-models")]
        public async Task<IActionResult> GetSoftwareModelsName()
        {
            var uniqueSoftwareModels = await _deviceService.GetSoftwareModelsAsync();
            return Ok(uniqueSoftwareModels);
        }


        [HttpPost("add-software")]
        public ActionResult PutSoftware([FromBody] PutSoftware software)
        {
            try
            {
                _deviceService.AddSoftware(software);
                return Ok("Created");
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpPost("add-software-allocation")]
        public ActionResult PutSoftwareAllocation([FromBody] PutSofwareAllocation softwareAllocation)
        {
            try
            {
                _deviceService.AddSoftwareAllocation(softwareAllocation);
                return Ok("Success");
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }

        }
    }
}
