namespace ITMS.Server.DTO
{
    public class PostCommentDTO
    {
        public string? Description { get; set; }

        public Guid CreatedBy { get; set; }

        public DateTime CreatedAtUtc { get; set; }

        public Guid DeviceId { get; set; }

        public Guid? SoftwareAllocationId { get; set; }

        public Guid DevicelogId { get; set; }
    }

    public class getcommentDTO
    {
        public string? Description { get; set;}
        public DateTime CreatedAtUtc { get; set; }
        public Guid? ActionId { get; set; }
        public Guid? EmployeeId { get; set; }
        public Guid? AssignedBy { get; set; }
        public Guid? ReceivedBy { get; set; }
    }
}
