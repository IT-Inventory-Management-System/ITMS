//using ITMS.Server.DTO;
//using ITMS.Server.Models;
//using ITMS.Server.Services;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;

//namespace ITMS.Server.Controllers
//{
//    [Route("api/SoftwarePage")]
//    [ApiController]
//    public class SoftwarePageController : ControllerBase
//    {
//        private readonly SoftwarePageService _softwarepageService;

//        public SoftwarePageController(SoftwarePageService softwarepageService)
//        {
//            _softwarepageService = softwarepageService;
//        }

//        [HttpGet("software")]
//        public ActionResult<IEnumerable<SoftwarePage>> GetSoftware()
//        {
//            var software = _softwarepageService.GetSoftware();
//            return Ok(software);
//        }

//        [HttpGet("selected")]
//        public IActionResult GetSelected([FromQuery] SingleSoftwareSelectedParams parameters)
//        {
//            SingleSoftwareSelected? selected = _softwarepageService.GetSingleSelected(parameters);
//                //.GetSingleSelected(parameters);
//            return Ok(selected);

//        }

//        [HttpGet("History")]
//        public ActionResult<IEnumerable<SingleSoftwareHistory>> GetHistory([FromQuery] SingleSoftwareSelectedParams parameters)
//        {
//            return _softwarepageService.GetSingleHistory(parameters);
//        }
//    }
//}

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
        public List<IEnumerable<SoftwarePage>> GetSoftware(bool arch)
        {
            List<IEnumerable<SoftwarePage>> list = new List<IEnumerable<SoftwarePage>>();

            var softwareIndia = new List<SoftwarePage>();
            var softwareUSA = new List<SoftwarePage>(); 
            if (arch==false) {
                softwareIndia = _softwarepageService.GetSoftware("India", false);

                softwareUSA = _softwarepageService.GetSoftware("USA", false);
            }

            softwareIndia.AddRange(_softwarepageService.GetSoftware("India", true));
            softwareUSA.AddRange(_softwarepageService.GetSoftware("USA", true));


            list.Add(softwareIndia);
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

        [HttpGet("softwarestable")]
        public ActionResult<IEnumerable<Softwares>> GetSoftwares()
        {
            try
            {
                var software = _softwarepageService.GettableSoftwares();
                return Ok(software);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

     [HttpPost("archive")]
public IActionResult Archive([FromBody] SoftwareUpdateDto dto)
{
    if (!ModelState.IsValid)
    {
        return BadRequest(ModelState);
    }

    bool updateResult = _softwarepageService.UpdateSoftwareArchiveStatus(dto);
    if (!updateResult)
    {
        return NotFound("Software not found.");
    }

    return Ok("Software archive status updated successfully.");
}




    }
}