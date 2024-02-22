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
        [HttpGet("basicdetails/{locationId}")]
        public async Task<IEnumerable<UserListDTO>> GetUserDevicesAsync(Guid locationId)
        {
            return await _userListService.GetUserDevicesAsync(locationId);
        }

        [HttpGet("GetFirstUser")]
        public async Task<UserListDTO> GetFirstUserAsync()
        {
            return await _userListService.GetFirstUserAsync();
        }

        [HttpGet("admin-list/{locationId}")]
        public async Task<IEnumerable<AdminListDTO>> GetAdminList(string locationId)
        {
            return await _userListService.GetAdminList(Guid.Parse(locationId));
        }

        [HttpPost("change-role")]
        public async Task<IActionResult> ChangeUserRoleAsync([FromBody] ChangeRoleDTO changeRoleDTO)
        {
            try
            {
                await _userListService.ChangeUserRoleAsync( Guid.Parse(changeRoleDTO.UserId), changeRoleDTO.NewRole);

                return Ok();
            }
            catch (Exception ex)
            {
                // Handle exceptions and return appropriate response
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error: {ex.Message}");
            }
        }

    }
}
