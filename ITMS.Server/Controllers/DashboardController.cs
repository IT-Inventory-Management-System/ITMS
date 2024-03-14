using ITMS.Server.DTO;
using ITMS.Server.Models;
using ITMS.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ITMS.Server.Controllers
{
    [Route("api/Dashboard")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly DashboardService _dashboardService;

        public DashboardController(DashboardService dashboardService)
        {
            _dashboardService = dashboardService;
        }

        [Authorize]
        [HttpGet("accessories")]
        public ActionResult<IEnumerable<Accessories>> GetAccessories()
        {
            var inventory = _dashboardService.GetAccessories();
            return Ok(inventory);
        }


        //[HttpGet("softwares")]
        //public ActionResult<IEnumerable<Accessories>> GetSoftwares()
        //{
        //    var software = _dashboardService.GetSoftwares();
        //    return Ok(software);
        //}

        [Authorize]
        [HttpGet("softwares")]
        public ActionResult<IEnumerable<Softwares>> GetSoftwares()
        {
            try
            {
                var software = _dashboardService.GetSoftwares();
                return Ok(software);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

        [Authorize]
        [HttpGet("primary")]
        public ActionResult<IEnumerable<Accessories>> GetPrimary()
        {
            List<List<Primary>> os = _dashboardService.GetPrimary();
            return Ok(os);
        }

        [Authorize]
        [HttpPost("logs")]
        public ActionResult<IEnumerable<Logs>> GetLogs([FromBody] Getlocation country)
        {
            var history = _dashboardService.GetLogsForLocation(Guid.Parse(country.locationid), 1);
            return Ok(history);
        }

    }
}
