using ITMS.Server.Models;
using ITMS.Server.Services;
using ITMS.Server.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Elfie.Serialization;
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
        [HttpGet("getAllEmployee")]
        public async Task<IEnumerable<GetEmployeeDTO>> getAllEmployeeBasicDetails()
        {
          return await _addAssetService.getAllEmployeeBasicDetails();

        }
        [HttpGet("getEmployee")]
        public async Task<IEnumerable<GetEmployeeDTO>> getEmployeeBasicDetails(String serachName)
        {
            return await _addAssetService.getEmployeeBasicDetails(serachName);

        }
    }
}
