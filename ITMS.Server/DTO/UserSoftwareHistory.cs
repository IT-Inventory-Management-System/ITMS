namespace ITMS.Server.DTO
{
    public class UserSoftwareHistory
    {
        public string TypeName { get; set; }
        public string SoftwareName { get; set; }
        public string AssignBy { get; set; }
        public string? AssignedTo { get; set; }
        //public DateTime? SubmitedByDate { get; set; }
        public DateTime? AssignedDate { get; set; } // Change to DateTime? if AssignedDate can be null
    }
}
