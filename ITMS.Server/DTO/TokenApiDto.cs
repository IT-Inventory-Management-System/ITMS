namespace ITMS.Server.DTO
{
    public class TokenApiDto
    {

        public string AccessToken { get; set; }
        public string Token { get; set; }

    }


    public class UserLoginDto
    {

        public string LastName { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }



    }
}
