using ITMS.Server.DTO;
using ITMS.Server.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ITMS.Server.Services
{
    public interface ILoginService
    {
        Employee Authenticate(UserLoginDto userLoginDto);
    }

    public class LoginService : ILoginService
    {
        private readonly ItinventorySystemContext _context;

        public LoginService(ItinventorySystemContext context)
        {
            _context = context;
        }

        public Employee Authenticate(UserLoginDto userLoginDto)
        {
            // Fetch user based on provided credentials
            var user = _context.Employees.FirstOrDefault(u => u.FirstName == userLoginDto.FirstName && u.LastName==userLoginDto.LastName && u.Password == userLoginDto.Password);

            // If user is not found, return null
            if (user == null)
                return null;

            return user; // Return authenticated user
        }
    }
}
