namespace ITMS.Server.DTO
{
    public class UserSoftwareHistory
    {
        public Guid SoftwareAllocationId { get; set; } //new
        public string TypeName { get; set; }
        public string SoftwareName { get; set; }
        public string AssignBy { get; set; }
        public string? AssignedTo { get; set; }
        //public DateTime? SubmitedByDate { get; set; }
        public DateTime? AssignedDate { get; set; } 
        public DateTime? PurchasedDate { get; set; } //new

        public DateTime? ExpiryDate { get; set; } //new
        public int RemainingDays { get; set; } //new
        public List<CommentDto> Comments { get; set; } //change here
    }
}
