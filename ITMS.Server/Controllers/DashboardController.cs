using ITMS.Server.DTO;
using ITMS.Server.Models;
using ITMS.Server.Services;
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

        [HttpGet("accessories")]
        public ActionResult<IEnumerable<Accessories>> GetAccessories()
        {
            var inventory = _dashboardService.GetAccessories();
            return Ok(inventory);
        }


        [HttpGet("softwares")]
        public ActionResult<IEnumerable<Accessories>> GetSoftware()
        {
            var software = _dashboardService.GetSoftwares();
            return Ok(software);
        }

        [HttpGet("primary")]
        public ActionResult<IEnumerable<Accessories>> GetPrimary()
        {
            List<Primary> os = _dashboardService.GetPrimary();
            List<Primary> primary = _dashboardService.GetNextPrimary();
            List<Primary> combinedList = os.Concat(primary).ToList();


            return Ok(combinedList);
        }

    }
}
