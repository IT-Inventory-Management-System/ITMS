using ITMS.Server.DTO;
using ITMS.Server.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ITMS.Server.Controllers
{
   

    // SoftwareController.cs
    [ApiController]
    [Route("api/[controller]")]
    public class SoftwareController : ControllerBase
    {
        private readonly SoftwareService _softwareService;

        public SoftwareController(SoftwareService softwareService)
        {
            _softwareService = softwareService;
        }

        [HttpGet]
        public ActionResult<List<SoftwareDTO>> GetAllSoftware()
        {
            var softwareList = _softwareService.GetAllSoftware();
            return Ok(softwareList);
        }

        [HttpPost]
        public ActionResult InsertSoftware([FromBody] SoftwareDTO softwareDTO)
        {
            _softwareService.InsertSoftware(softwareDTO);
            return Ok();
        }
    }

}
