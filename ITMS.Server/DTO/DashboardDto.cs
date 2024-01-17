
namespace ITMS.Server.DTO
{
    //    public class DashboardDtocs
    //    {
    //        public string OS { get; set; }
    //        public String Status { get; set; }
    //        public List<RecentActivityDto> RecentActivities { get; set; }
    //        // public int TotalSoftwareLicenses { get; set; }
    //        public List<SoftwareLicsenseDto> SoftwareLicsense { get; set; }
    //    }
    //}

    //    public class RecentActivityDto
    //    {
    //        public string ActivityType { get; set; }
    //        public string Description { get; set; }
    //        public DateTime Timestamp { get; set; }
    //    }

    //    public class SoftwareLicsenseDto
    //    {
    //        public string Name { get; set; }
    //        public string Description { get; set; }
    //        public DateTime expiration { get; set; }
    //    }


    public class Accessories
    {
        public string Name { get; set; }
        public int Total { get; set; }
        public int Assigned { get; set; }
    }

    public class Primary
    {
        public string Name { get; set; }
        public int Total { get; set; }
        public int Assigned { get; set; }
    }

    public class Logs
    {
        public string? UpdatedBy { get; set; }
        public string CYGID { get; set; }
        public string? Category { get; set; }
        public string? SubmittedTo { get; set; }
        public string? AssignedTo { get; set; }
        public string Action { get; set; }
    }


    public class Softwares
    {
        public string Name { get; set; }
        public string Version { get; set; }
        public string Type { get; set; }

        public int Inventory { get; set; }
        public int Assigned { get; set; }

    }
}

