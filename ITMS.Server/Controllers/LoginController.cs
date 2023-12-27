// Controllers/UserController.cs
using ITMS.Server.Services;
using Microsoft.AspNetCore.Mvc;
using ITMS.Server.DTO;

[ApiController]
[Route("[controller]")]
public class LoginController : ControllerBase
{
    private readonly LoginService _loginService;

    public LoginController(LoginService loginService)
    {
        _loginService = loginService;
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] ITMS.Server.Models.LoginRequestDto loginRequest)
    {
        // Call the service for login logic
        var loginResponse = _loginService.ValidateLogin(loginRequest);

        // Handle the response and return appropriate result
        if (loginResponse.Success)
        {
            return Ok("Login successful");
        }
        else
        {
            return BadRequest($"Login failed. {loginResponse.Message}");
        }
    }
}
