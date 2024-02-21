namespace ITMS.Server.DTO
{
    public class EmployeeDTO
    {
        public Guid? deviceLogId { get; set; }
        public string FirstName { get; set; }
        public string? LastName { get; set; }

        public DateTime? RecievedDate { get; set; }

        public string ActionName { get; set; }
    }
}
