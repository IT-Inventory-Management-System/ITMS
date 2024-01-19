namespace ITMS.Server.DTO
{
    public class GetSoftwareDTO
    {
        public Guid Id { get; set; }
        public required string SoftwareName { get; set; }
        public string SoftwareType { get; set; }
        public DateTime? ExpiryDate { get; set; }
    }
}
