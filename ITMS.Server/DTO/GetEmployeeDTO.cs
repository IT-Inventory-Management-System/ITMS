namespace ITMS.Server.DTO
{
    public class GetEmployeeDTO
    {
        public Guid Id { get; set; }
        public string Cgiid { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }
    }
}
