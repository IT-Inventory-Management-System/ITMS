using ITMS.Server.Models;
using ITMS.Server.Services;
using ITMS.Server.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Elfie.Serialization;
using static ITMS.Server.Services.GetSoftwareService;
using Microsoft.AspNetCore.Authorization;

using System.Runtime.InteropServices;
using System;
namespace ITMS.Server.Controllers
{
    [ApiController]
    [Route("api/software")]
    public class SoftwareController : ControllerBase
    {
        private readonly ItinventorySystemContext _context;
        private readonly SoftwareService _softwareService;
        private readonly IGetSoftwareService _addSoftwareService;
        private readonly IGetSoftwareVersionService _addSoftwareVersionService;
        public SoftwareController(ItinventorySystemContext context, IGetSoftwareService addSoftwareService, IGetSoftwareVersionService addSoftwareVersionService, SoftwareService softwareService)
        {
            _context = context;
            _addSoftwareService = addSoftwareService;
            _addSoftwareVersionService = addSoftwareVersionService;
            _softwareService = softwareService;
        }

        [Authorize]
        [HttpGet("getSoftware")]
        public async Task<IEnumerable<GetSoftwareDTO>> listSoftware()
        {
            return await _addSoftwareService.listSoftware();
        }

        [Authorize]
        [HttpGet("getSoftwareVersion")]
        public async Task<IEnumerable<GetSoftwareVersionDTO>> listSoftwareVersions(String SoftwareName)
        {
            return await _addSoftwareVersionService.listSoftwareVersions(SoftwareName);
        }

        [Authorize]
        [HttpGet("getSoftwareId")]
        public async Task<IEnumerable<GetSoftwareDTO>> listSoftwareId(String SoftwareName, String Version)
        {
            return await _addSoftwareService.getSoftwareId(SoftwareName, Version);
        }

        [Authorize]
        [HttpGet ("getsoftwareType")]
        public ActionResult<IEnumerable<SoftwareType>> GetSoftwareTypes()
        {
            var softwareTypes = _context.SoftwareTypes
        .Select(st => new SoftwareTypeDTO
        {
            Id = st.Id,
            TypeName = st.TypeName
        })
        .ToList();

            return Ok(softwareTypes);
        }


        //[HttpGet("GetUserSoftware/{id}")]
        //public IActionResult GetUserSoftware(Guid id)
        //{
        //    try
        //    {
        //        var softwareList = _softwareService.GetUserSoftware(id);
        //        return Ok(softwareList);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }

        }




    }
