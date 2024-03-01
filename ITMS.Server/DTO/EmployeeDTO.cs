namespace ITMS.Server.DTO
{
    public class EmployeeDTO
    {
        public Guid? deviceLogId { get; set; }
        public Guid? deviceId { get; set; }
        public Guid? softwareAllocationId { get; set; }
        public string FirstName { get; set; }
        public string? LastName { get; set; }

        public DateTime? RecievedDate { get; set; }

        public string ActionName { get; set; }
    }
}
