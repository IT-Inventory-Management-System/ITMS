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
    [Route("api/employee")]
    public class EmployeeController : ControllerBase
    {
        private readonly ItinventorySystemContext _context;
        private readonly IUserListService _userListService;
      
        private readonly EmployeeService _employeeService;

        public EmployeeController(ItinventorySystemContext context, IUserListService userListService, EmployeeService employeeService)
        {
            _context = context;
            _userListService = userListService;
            _employeeService = employeeService;
        }

        [Authorize]
        [HttpGet("basicdetails/{locationId}")]
        public async Task<IEnumerable<UserListDTO>> GetUserDevicesAsync(Guid locationId)
        {
            return await _userListService.GetUserDevicesAsync(locationId);
        }

        [Authorize]
        [HttpGet("GetFirstUser")]
        public async Task<UserListDTO> GetFirstUserAsync()
        {
            return await _userListService.GetFirstUserAsync();
        }

        [Authorize]
        [HttpGet("admin-list/{locationId}")]
        public async Task<IEnumerable<AdminListDTO>> GetAdminList(string locationId)
        {
            return await _userListService.GetAdminList(Guid.Parse(locationId));
        }

        [Authorize]
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

        [Authorize]
        [HttpPost("AddUsers")]
        public void PutNewUsers(List<PutNewUsers> listOfUsers)
        {
            _employeeService.PutUsers(listOfUsers);
            return;
        }

    }
}
