using ITMS.Server.Models;
using ITMS.Server.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ITMS.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccessoriesController : ControllerBase
    {
        private readonly AccessoriesService _accessoriesService;

        public AccessoriesController(AccessoriesService accessoriesService)
        {
            _accessoriesService = accessoriesService;
        }

        //[HttpGet("GetUserAccessories/{id}")]
        //public IActionResult GetUserAccessories(Guid id)
        //{
        //    try
        //    {
        //        var accessoriesList = _accessoriesService.GetUserAccessories(id);
        //        return Ok(accessoriesList);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}

    }


}
