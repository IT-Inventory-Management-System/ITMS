using ITMS.Server.DTO;
using ITMS.Server.Models;
using ITMS.Server.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;


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


        [Authorize]
        [HttpGet("GetAccessoriesList")]
        public async Task<IEnumerable<getAccessoriesDTO>> listAccessories()
        {
            return await _getAccessoryService.listAccessories();
        }

        [Authorize]
        [HttpPost("GetAccessoriesDetails")]
        public async Task<IEnumerable<getMouseDetailsDTO>> getMouseDetails([FromBody] accessoryInputDTO inputDTO)
        {
            var locationId = inputDTO.locationId;
            var catName = inputDTO.categoryName;

            return await _getAccessoryService.getMouseDetails(locationId,catName);

        }

        //[Authorize]
        //[HttpPost("OneTimePutBag")]
        //public async Task<ActionResult> OneTimePutBag([FromBody] List<OneTimePutBagDTO> listOfBags)
        //{
        //    try
        //    {
        //        List<OneTimePutBagDTO> failedItems = await _accessoriesService.OneTimePutBagService(listOfBags);
        //    }
        //    catch (Exception ex) {
        //        return BadRequest(ex.Message);
        //    }
        //}
    }
}