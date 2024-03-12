﻿using ITMS.Server.Models;
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
        [HttpGet("getEmployee")]
        public async Task<IEnumerable<GetEmployeeDTO>> getAllEmployeeBasicDetails()
        {
            return await _addAssetService.getAllEmployeeBasicDetails();

        }
        [HttpGet("getAccessories")]
        public async Task<IEnumerable<GetAccessories>> getAccessories()
        {
            return await _addAssetService.getAccessories();

        }

        [HttpGet("getMouseBrand")]
        public async Task<IEnumerable<GetBrandDTO>> getMouseBrand()
        {
            return await _addAssetService.getMouseBrand();
        }

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

        [HttpGet("getLaptopIDs")]
        public async Task<IEnumerable<getLaptopIds>> getlaptopIds()
        {
            return await _addAssetService.getlaptopIds();
        }
        [HttpGet("getMonitorBrands")]
        public async Task<IEnumerable<monitorInputDTO>> getMonitorBrands()
        {
            return await _addAssetService.getMonitorBrands();
        }
        [HttpPost("getBrandDetails")]
        public async Task<IEnumerable<categoryInputDTO>> getBrandDetails([FromBody] categoryDTO categoryDTO)
        {
            
            return await _addAssetService.getBrandDetails(categoryDTO.categoryName);
        }

        [HttpPost("addMonitorModel")]
        public async Task<IActionResult> addMonitor([FromBody] MonitorDTO monitorDTO)
        {
            try
            {
                await _addAssetService.postMonitorDetails(monitorDTO);

                return Ok(); // You can customize the success response
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error adding monitor: {ex.Message}");
            }
        }


    }
}
