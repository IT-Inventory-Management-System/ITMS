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

    public class getcommentDTO
    {

        public string? Description { get; set;}
        public DateTime CreatedAtUtc { get; set; }
        public Guid? ActionId { get; set; }
        public Guid? EmployeeId { get; set; }
        public Guid? AssignedBy { get; set; }
        public Guid? ReceivedBy { get; set; }
        public Guid? CreatedBy { get; set; }
    }

    public class singleComment
    {
        public string? Description { get; set; }
        public DateTime CreatedAtUtc { get; set; }
        public string? ActionId { get; set; }
        public string? AssignedTo { get; set; }
        public string? AssignedBy { get; set; }
        public string? ReceivedBy { get; set; }
        public string? CreatedBy { get; set; }
    }

    public class getComments
    {
        public DateTime? UpdatedDate { get; set; }
        public IEnumerable<singleComment> Comments { get; set; }
    }

}
