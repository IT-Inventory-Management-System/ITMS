namespace ITMS.Server.DTO
{
    public class GetEmployeeDTO
    {
        public Guid Id { get; set; }
        public string Cgiid { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }
    }


    public class PutNewUsers
    {
        public string Location { get; set; }
        public string Cgiid { get; set; } = null!;

        public string FirstName { get; set; } = null!;

        public string? LastName { get; set; }

        public string Email { get; set; } = null!;

        // public Guid RoleId { get; set; }

        public Guid? CreatedBy { get; set; }

         public string password { get; set; }

        public Guid? UpdatedBy { get; set; }

        // public DateTime? UpdatedAtUtc { get; set; }

        public Guid LocationId { get; set; }
    }
}
