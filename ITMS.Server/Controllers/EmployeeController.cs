using ITMS.Server.Models;
using ITMS.Server.Services;
using ITMS.Server.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Elfie.Serialization;
namespace ITMS.Server.Controllers
{
    [ApiController]
    [Route("api/employee")]
    public class EmployeeController : ControllerBase
    {
        private readonly ItinventorySystemContext _context;
        private readonly IUserListService _userListService;
        public EmployeeController(ItinventorySystemContext context, IUserListService userListService)
        {
            _context = context;
            _userListService = userListService;
        }
        [HttpGet("basicdetails")]
        public async Task<IEnumerable<UserListDTO>> GetUserDevicesAsync()
        {
            return await _userListService.GetUserDevicesAsync();
        }
    }
}
