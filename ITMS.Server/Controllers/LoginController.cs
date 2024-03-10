using ITMS.Server.DTO;
using ITMS.Server.Models;
using ITMS.Server.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

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
        public IActionResult Authenticate([FromBody] UserLoginDto userLoginDto)
        {
            var user = _loginService.Authenticate(userLoginDto);
            if (user == null)
                return BadRequest("Invalid credentials");

            var token = GenerateJwtToken(user);
            return Ok(new { Token = token });
        }


        private string GenerateJwtToken(Employee employee)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("ITIMSSECRETKEYFORJWTTOKEN"); // Replace with your own secret key
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
            new Claim(ClaimTypes.Name, employee.FirstName),
            new Claim(ClaimTypes.Surname, employee.LastName),
                    // You can add more claims as needed
                }),
                Expires = DateTime.UtcNow.AddDays(7), // Token expiration time
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

    }





}
    
