namespace ITMS.Server.DTO
{
    public class GetSoftwareVersionDTO
    {

        public Guid Id { get; set; }

        public string SoftwareName { get; set; } = null!;

        public string? SoftwareVersion { get; set; }


    }
}
