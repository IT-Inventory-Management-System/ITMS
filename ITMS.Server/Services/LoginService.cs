//using ITMS.Server.DTO;
//using ITMS.Server.Models;
//using System.Data.SqlClient; // Assuming SQL Server for this example

//namespace ITMS.Server.Services
//{
//    public class LoginService
//    {
//        private readonly string connectionString; // Replace with your actual database connection string

//        public LoginService(string connectionString)
//        {
//            this.connectionString = connectionString;
//        }

//        public LoginResponseDto ValidateLogin(LoginRequestDto loginRequest)
//        {
//            using (var connection = new SqlConnection(connectionString))
//            {
//                connection.Open();

//                // Replace "Users" with your actual table name
//                string query = "SELECT COUNT(*) FROM Users WHERE Username = @Username AND Password = @Password";

//                using (var command = new SqlCommand(query, connection))
//                {
//                    command.Parameters.AddWithValue("@Username", loginRequest.Email);
//                    command.Parameters.AddWithValue("@Password", loginRequest.Password);

//                    int count = (int)command.ExecuteScalar();

//                    if (count > 0)
//                    {
//                        return new LoginResponseDto { Success = true, Message = "Login successful" };
//                    }
//                    else
//                    {
//                        return new LoginResponseDto { Success = false, Message = "Invalid credentials" };
//                    }
//                }
//            }
//        }

        
//    }
//}
