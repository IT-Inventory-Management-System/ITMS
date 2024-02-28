// Models/LoginRequestModel.cs
namespace ITMS.Server.DTO
{
    public class LoginRequestDto
    {
        public required string Email { get; set; }
        public required string Password { get; set; }
    }
}
