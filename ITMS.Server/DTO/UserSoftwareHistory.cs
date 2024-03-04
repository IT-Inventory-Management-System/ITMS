namespace ITMS.Server.DTO
{
    public class UserSoftwareHistory
    {
        public Guid DeviceLogId { get; set; } //change
        public Guid? SoftwareAllocationId { get; set; } //change
        public string TypeName { get; set; }
        public string SoftwareName { get; set; }
        public string? Version { get; set; } //new 
        public string AssignBy { get; set; }
        public string? AssignedTo { get; set; }
        //public DateTime? SubmitedByDate { get; set; }
        public DateTime? AssignedDate { get; set; } 
        public DateTime? PurchasedDate { get; set; } //new

        public DateTime? ExpiryDate { get; set; } //new
        public int RemainingDays { get; set; } //new
        public string? RecievedBy { get; set; } //new 
        public DateTime? RecievedByDate { get; set; } //new
        public string ActionName { get; set; } //new

        public string UpdatedBy { get; set; } //new
        public DateTime? CreatedAtUtc { get; set; } //new

        public DateTime? UpdatedAtUtc { get; set; } //new
        public List<CommentDto> Comments { get; set; } //change here
    }
}
