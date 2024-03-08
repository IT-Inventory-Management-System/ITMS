using ITMS.Server.DTO;
using ITMS.Server.Models;
using ITMS.Server.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ITMS.Server.Controllers
{
    [Route("api/Login")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly LoginService _loginService;

        public LoginController(LoginService LoginService)
        {
            _loginService = LoginService;
        }


        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody] UserLoginDto userObj)
        {
            var result = _loginService.Authenticate(userObj);
            if (result == null)
                return BadRequest();

            if (result != null)
                return null;

            return Ok(result);
        }






    }
    }
