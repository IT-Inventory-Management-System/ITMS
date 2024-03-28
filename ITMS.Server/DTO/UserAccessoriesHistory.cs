namespace ITMS.Server.DTO
{
    public class UserAccessoriesHistory
    {
        public Guid DeviceLogId { get; set; } //new
        public Guid? DeviceId { get; set; } //new property
        public string cygid { get; set; } //new property
        public string DeviceName { get; set; }
        public string Brand { get; set; }
        public string ModelNo { get; set; }
        public string CategoryName { get; set; }
        public string CategoryType { get; set; }
        public string AssignBy { get; set; }
        public string AssignedTo { get; set; }
        public DateTime? AssignedDate { get; set; }
        public bool? isWired { get; set; }  // New property added
        public string? SubmittedBy { get; set; } //new 
        public DateTime? SubmittedByDate { get; set; } //new
        public string ActionName { get; set; } //new
        public Guid? ActionId { get; set; }

        public string UpdatedBy { get; set; } //new
        public DateTime? CreatedAtUtc { get; set; } //new
        public DateTime? UpdatedAtUtc { get; set; } //new
    }
}
