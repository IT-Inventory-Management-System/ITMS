using ITMS.Server.Models;
using ITMS.Server.Services;
using ITMS.Server.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Elfie.Serialization;
using Microsoft.AspNetCore.Authorization;

namespace ITMS.Server.Controllers
{
    [ApiController]
    [Route("api/asset")]
    public class AssetController : ControllerBase
    {
        private readonly ItinventorySystemContext _context;
        private readonly IAddAssetService _addAssetService;
        public AssetController(ItinventorySystemContext context, IAddAssetService addAssetService)
        {
            _context = context;
            _addAssetService = addAssetService;
        }

        [Authorize]
        [HttpGet("getEmployee")]
        public async Task<IEnumerable<GetEmployeeDTO>> getAllEmployeeBasicDetails()
        {
          return await _addAssetService.getAllEmployeeBasicDetails();

        }


        [Authorize]
        [HttpGet("getAccessories")]
        public async Task<IEnumerable<GetAccessories>> getAccessories()
        {
            return await _addAssetService.getAccessories();

        }

        [Authorize]
        [HttpGet("getMouseBrand")]
        public async Task<IEnumerable<GetBrandDTO>> getMouseBrand()
        {
            return await _addAssetService.getMouseBrand();
        }

        [Authorize]
        [HttpGet("getCGIID")]
        public async Task<IEnumerable<getCGIDTO>> getCGIID()
        {
            return await _addAssetService.getCGIID();
        }

        [Authorize]
        [HttpGet("getLaptopIDs")]
        public async Task<IEnumerable<getLaptopIds>> getlaptopIds()
        {
            return await _addAssetService.getlaptopIds();
        }

    }
}
