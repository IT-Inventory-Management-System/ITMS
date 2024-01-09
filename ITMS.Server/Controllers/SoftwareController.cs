using ITMS.Server.Models;
using ITMS.Server.Services;
using ITMS.Server.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Elfie.Serialization;
using static ITMS.Server.Services.GetSoftwareService;
namespace ITMS.Server.Controllers
{
    [ApiController]
    [Route("api/software")]
    public class SoftwareController : ControllerBase
    {
        private readonly ItinventorySystemContext _context;
        private readonly IGetSoftwareService _addSoftwareService;
        public SoftwareController(ItinventorySystemContext context, IGetSoftwareService addSoftwareService)
        {
            _context = context;
            _addSoftwareService = addSoftwareService;
        }
        [HttpGet("getSoftware")]
        public async Task<IEnumerable<GetSoftwareDTO>> listSoftware()
        {
            return await _addSoftwareService.listSoftware();
        }
    }
}
