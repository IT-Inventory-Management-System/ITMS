namespace ITMS.Server.DTO
{
    public class UserAccessoriesHistory
    {
        public string DeviceName { get; set; }
        public string Brand { get; set; }
        public string ModelNo { get; set; }
        public string CategoryName { get; set; }
        public string CategoryType { get; set; }
        public string AssignBy { get; set; }
        public string AssignedTo { get; set; }
        public DateTime? AssignedDate { get; set; }
    }
}
