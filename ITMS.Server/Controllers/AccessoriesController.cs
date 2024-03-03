using ITMS.Server.DTO;
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
        private readonly IGetAccessoryService _getAccessoryService;

        public AccessoriesController(AccessoriesService accessoriesService, IGetAccessoryService getAccessoryService)
        {
            _accessoriesService = accessoriesService;
            _getAccessoryService = getAccessoryService;
        }

        [HttpGet("GetUserAccessories/{id}")]
        public IActionResult GetUserAccessories(Guid id)
        {
            try
            {
                var accessoriesList = _accessoriesService.GetUserAccessories(id);
                return Ok(accessoriesList);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetAccessoriesList")]
        public async Task<IEnumerable<getAccessoriesDTO>> listAccessories()
        {
            return await _getAccessoryService.listAccessories();
        }

        [HttpGet("GetAccessoriesDetails/{locationId}")]
        public async Task<IEnumerable<getMouseDetailsDTO>> getMouseDetails(Guid locationId)
        {
            return await _getAccessoryService.getMouseDetails(locationId);

        }


    }
}