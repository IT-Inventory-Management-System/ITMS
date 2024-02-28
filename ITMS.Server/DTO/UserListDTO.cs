using ITMS.Server.Models;

namespace ITMS.Server.DTO
{
    public class UserListDTO
    {
     
            public Guid Id { get; set; }
            public String Cgiid { get; set; }
            public String FirstName { get; set; } = null!;
            public String? LastName { get; set; }
            public Guid LocationId { get; set; }

        
    }

}

