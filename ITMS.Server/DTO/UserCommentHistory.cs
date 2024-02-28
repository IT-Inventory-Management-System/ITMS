namespace ITMS.Server.DTO
{
    public class UserCommentHistory
    {
        public string Description { get; set; }
        public Guid CreatedBy { get; set; }
        public DateTime CreatedAtUtc { get; set; } // Add this property
        public Guid DeviceId { get; set; }
    }
}
