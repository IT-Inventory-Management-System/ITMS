using ITMS.Server.DTO;
using ITMS.Server.Models;
using ITMS.Server.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ITMS.Server.Controllers
{
    [Route("api/SoftwarePage")]
    [ApiController]
    public class SoftwarePageController : ControllerBase
    {
        private readonly SoftwarePageService _softwarepageService;

        public SoftwarePageController(SoftwarePageService softwarepageService)
        {
            _softwarepageService = softwarepageService;
        }

        [HttpGet("software")]
        public ActionResult<IEnumerable<SoftwarePage>> GetSoftware()
        {
            var software = _softwarepageService.GetSoftware();
            return Ok(software);
        }

        [HttpGet("selected")]
        public IActionResult GetSelected([FromQuery] SingleSoftwareSelectedParams parameters)
        {
            SingleSoftwareSelected? selected = _softwarepageService.GetSingleSelected(parameters);
                //.GetSingleSelected(parameters);
            return Ok(selected);

        }

        [HttpGet("History")]
        public ActionResult<IEnumerable<SingleSoftwareHistory>> GetHistory([FromQuery] SingleSoftwareSelectedParams parameters)
        {
            return _softwarepageService.GetSingleHistory(parameters);
        }
    }
}
