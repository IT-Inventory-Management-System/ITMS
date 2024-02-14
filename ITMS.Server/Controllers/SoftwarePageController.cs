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
        public List<IEnumerable<SoftwarePage>> GetSoftware()
        {
            List<IEnumerable<SoftwarePage>> list = new List<IEnumerable<SoftwarePage>>();
            var softwareIndia = _softwarepageService.GetSoftware("India");
            list.Add(softwareIndia);
            var softwareUSA = _softwarepageService.GetSoftware("USA");
            list.Add(softwareUSA);
            return list;
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
