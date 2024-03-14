namespace ITMS.Server.DTO
{
    public class TokenApiDto
    {

        public string AccessToken { get; set; }
        public string Token { get; set; }

    }


    public class UserLoginDto
    {

        public string Email { get; set; }
        public string Password { get; set; }

    }
}
