using ITMS.Server.DTO;
using ITMS.Server.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using static MiNET.Net.McpeSetScoreboardIdentity;

namespace ITMS.Server.Services
{
    public interface ILoginService
    {
        Employee Authenticate(UserLoginDto userLoginDto);
    }

    public class LoginService : ILoginService
    {
        private readonly ItinventorySystemContext _context;
        private static RNGCryptoServiceProvider rngCsp = new RNGCryptoServiceProvider();
        private static readonly int SaltSize = 16;
        private static readonly int HashSize = 20;
        private static readonly int Iterations = 10000;

        public LoginService(ItinventorySystemContext context)
        {
            _context = context;
        }

        public Employee Authenticate(UserLoginDto userLoginDto)
        {
            // Fetch user based on provided credentials
            var user = _context.Employees.FirstOrDefault(u => u.Email == userLoginDto.Email);

            if (user == null)
                return null;

            if(VerifyPassword(userLoginDto.Password, user.Password) == false)
            {
                return null;
            }

            return user; // Return authenticated user
        }

        public static bool VerifyPassword(string password, string base64Hash)
        {
            var hashBytes = Convert.FromBase64String(base64Hash);

            var salt = new byte[SaltSize];
            Array.Copy(hashBytes, 0, salt, 0, SaltSize);

            var key = new Rfc2898DeriveBytes(password, salt, Iterations);
            byte[] hash = key.GetBytes(HashSize);

            for (var i = 0; i < HashSize; i++)
            {
                if (hashBytes[i + SaltSize] != hash[i])
                    return false;
            }
            return true;
        }
    }
}
