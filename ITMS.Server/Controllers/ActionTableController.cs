using ITMS.Server.DTO;
using ITMS.Server.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ITMS.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActionTableController : ControllerBase
    {
        private readonly ActionService _ActionTableService;
        public ActionTableController(ActionService actionTableService)
        {
            _ActionTableService = actionTableService;
        }

        [HttpGet("getActions")]
        public IActionResult GetActions()
        {
            try
            {
                var ActionsList = _ActionTableService.GetActions();
                return Ok(ActionsList);
            }
            catch (Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
