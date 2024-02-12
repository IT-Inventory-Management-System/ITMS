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
        private readonly EmployeeService _employeeService;
        public EmployeeController(ItinventorySystemContext context, IUserListService userListService, EmployeeService employeeService)
        {
            _context = context;
            _userListService = userListService;
            _employeeService = employeeService;
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


        [HttpPost("AddUsers")]
        public void PutNewUsers(List<PutNewUsers> listOfUsers)
        {
            _employeeService.PutUsers(listOfUsers);
            return;
        }
    }
}
