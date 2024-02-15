
//namespace ITMS.Server.DTO
//{



//    public class SoftwarePage
//    {
//        public string name { get; set; }

//        public byte[]? SoftwareThumbnail { get; set; }
//        public string type { get; set; }
//        public List<string?>? version { get; set; }


//    }

//    public class SingleSoftwareSelectedParams
//    {
//        public string name { get; set; }
//        public string type { get; set; }
//        public string version { get; set; }
//        public string location { get; set; }
//    }

//    public class SingleSoftwareSelected
//    {
//        public string? Name { get; set; }
//        public string? Type { get; set; }
//        public string? Version { get; set; }
//        public DateTime? ExpDate { get; set; }
//        public int? Inventory { get; set; }
//        public int? Assigned { get; set; }

//        // public DateTime? ExpDateIndia { get; set; }
//        public int? ExpiryDateCount { get; set; } = 0;

//        //public int? ExpiryDateCountIndia { get; set; } = 0;

//        public List<DateTime?> PurchaseDates { get; set; }
//        public List<DateTime?>? ExpiryDates { get; set; }
//    }

//    public class SingleSoftwareHistory
//    {
//        public string? assignedTo { get; set; }
//        public string? assignedToCGI { get; set; }
//        public string? assignedBy { get; set; } 
//        public DateTime? assignedDate { get; set; }
//    }
//}



namespace ITMS.Server.DTO
{



    public class SoftwarePage
    {
        public string name { get; set; }

        public byte[]? SoftwareThumbnail { get; set; }
        public string type { get; set; }
        public List<string?>? version { get; set; }


    }

    public class SingleSoftwareSelectedParams
    {
        public string name { get; set; }
        public string type { get; set; }
        public string version { get; set; }
        public string location { get; set; }
    }

    public class SingleSoftwareSelected
    {
        public string? Name { get; set; }
        public string? Type { get; set; }
        public string? Version { get; set; }
        public DateTime? ExpDate { get; set; }
        public int? Inventory { get; set; }
        public int? Assigned { get; set; }

        // public DateTime? ExpDateIndia { get; set; }
        public int? ExpiryDateCount { get; set; } = 0;

        //public int? ExpiryDateCountIndia { get; set; } = 0;

        public List<DateTime?> PurchaseDates { get; set; }
        public List<DateTime?>? ExpiryDates { get; set; }
    }

    public class SingleSoftwareHistory
    {
        public string? assignedTo { get; set; }
        public string? assignedToCGI { get; set; }
        public string? assignedBy { get; set; }
        public DateTime? assignedDate { get; set; }
    }



    public class tableSoftwares
    {
        public string? Name { get; set; }
        public string? Type { get; set; }
        public string? Version { get; set; }
        public DateTime? ExpDate { get; set; }
        public int? Inventory { get; set; }
        public int? Assigned { get; set; }

        // public DateTime? ExpDateIndia { get; set; }
        public int? ExpiryDateCount { get; set; } = 0;

        //public int? ExpiryDateCountIndia { get; set; } = 0;

        public List<DateTime?> PurchaseDates { get; set; }
        public List<DateTime?>? ExpiryDates { get; set; }

    }
}