namespace ITMS.Server.DTO
{
    public class PostAssignAssetDTO
    {
        public string? CYGID { get; set; }
        public string? SoftwareId { get; set; }
        public Guid? AssignedTo { get; set; }
        public Guid? AssignedBy { get; set; }
        public DateTime AssignedDate { get; set; }
    }
}
