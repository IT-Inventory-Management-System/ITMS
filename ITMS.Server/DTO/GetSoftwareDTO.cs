namespace ITMS.Server.DTO
{
    public class GetSoftwareDTO
    {
            public Guid Id { get; set; }
            public required string SoftwareName { get; set; }
            public Guid SoftwareTypeId { get; set; }
            public Guid CategoryId { get; set; }
            public required string SoftwareThumbnail { get; set; }
    }
}
