using ITMS.Server.DTO;
using ITMS.Server.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Xamarin.Forms;


namespace ITMS.Server.Services
{
    public class LoginService
    {
        private readonly ItinventorySystemContext _context;
        private readonly PasswordHasher<UserLoginDto> _passwordHasher;


        public LoginService(ItinventorySystemContext context)
        {
            _context = context;
            _passwordHasher = new PasswordHasher<UserLoginDto>();
        }



        public TokenApiDto Authenticate(UserLoginDto userObj)
        {
            if (userObj == null)
                return null;

            var user = _context.Employees
                .FirstOrDefault(x => x.FirstName == userObj.FirstName && x.LastName == userObj.LastName);

            if (user == null)
                return null;

            // Verify the password
            //var result = _passwordHasher.VerifyHashedPassword(userObj, user.Password, userObj.Password);
            //if (result != PasswordVerificationResult.Success)
            //    return null;

            // Password is correct, generate JWT token
            var jwtToken = CreateJwt(user);

            return new TokenApiDto
            {
                Token = jwtToken
            };
        }


        private string CreateJwt(Employee user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("veryverysceret.....");
            var identity = new ClaimsIdentity(new Claim[]
            {
                //new Claim(ClaimTypes.Role,user.RoleId),
                new Claim(ClaimTypes.Name,$"{user.FirstName}")
            });

            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddSeconds(10),
                SigningCredentials = credentials
            };
            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);
        }

    }
}