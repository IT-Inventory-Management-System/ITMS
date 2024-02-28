namespace ITMS.Server.DTO
{
    public class PostCommentDTO
    {
        public string? Description { get; set; }

        public Guid CreatedBy { get; set; }

        public DateTime CreatedAtUtc { get; set; }

        public Guid? DeviceId { get; set; }

        public Guid? SoftwareAllocationId { get; set; }

        public Guid DevicelogId { get; set; }
    }
}
