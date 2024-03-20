using ITMS.Server.Models;
using ITMS.Server.Services;
using ITMS.Server.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Elfie.Serialization;
using Microsoft.AspNetCore.Authorization;

using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using Microsoft.AspNetCore.JsonPatch.Internal;
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
        [HttpGet("getCGIIDKeyboard")]
        public async Task<IEnumerable<getCGIDTO>> getCGIIDKeyboard()
        {
            return await _addAssetService.getCGIIDKeyboard();
        }

        [Authorize]
        [HttpGet("getLaptopIDs")]
        public async Task<IEnumerable<getLaptopIds>> getlaptopIds()
        {
            return await _addAssetService.getlaptopIds();
        }

        [Authorize]
        [HttpGet("getMonitorBrands")]
        public async Task<IEnumerable<monitorInputDTO>> getMonitorBrands()
        {
            return await _addAssetService.getMonitorBrands();
        }

        [Authorize]
        [HttpPost("getBrandDetails")]
        public async Task<IEnumerable<categoryInputDTO>> getBrandDetails([FromBody] categoryDTO categoryDTO)
        {
            
            return await _addAssetService.getBrandDetails(categoryDTO.categoryName);
        }

        [Authorize]
        [HttpPost("getBrandFromName")]
        public async Task<IEnumerable<getBrand>> getBrandFromName([FromBody] categoryDTO categoryDTO)
        {

            return await _addAssetService.getBrandFromName(categoryDTO.categoryName);
        }

        [Authorize]
        [HttpPost("addMonitorModel")]
        public async Task<IActionResult> addMonitor([FromBody] MonitorDTO monitorDTO)
        {
            try
            {
                await _addAssetService.postMonitorDetails(monitorDTO);

                return Ok(); 
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error adding monitor: {ex.Message}");
            }
        }

        [Authorize]
        [HttpPost("addCommonModel")]
        public async Task<IActionResult>addCommonModel([FromBody] CommonDTO commonDTO)
        {
            try
            {
                await _addAssetService.AddCommonModel(commonDTO);

                return Ok(); 
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error adding monitor: {ex.Message}");
            }
        }

        [Authorize]
        [HttpPost("getCGIIDsCommon")]
        public async Task<IEnumerable<getCGIDTO>> getCGIIDCommon([FromBody] commonInputDTO commonDto)
        {

            return await _addAssetService.getCGIIDCommon(commonDto.Name);
        }

        [Authorize]
        [HttpPost("getKeyboardComboBrand")]
        public async Task<IEnumerable<GetBrandDTO>> getKeyboardComboBrand([FromBody] commonInputDTO commonDto)
        {
            return await _addAssetService.getKeyboardComboBrand(commonDto);
        }

        [HttpPost("importDeviceData")]
        public async Task<List<DeviceResponseDTO>> importDevice([FromBody] List<DeviceInputDTO> importDeviceInput)
        {
            return await _addAssetService.importDeviceData(importDeviceInput);
        }

    }
}
