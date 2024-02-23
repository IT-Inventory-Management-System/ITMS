
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
        public string? version { get; set; }
        public bool? isArchived { get; set; }
        public int inStock { get; set; }
        public List<DateTime?> purchaseDates { get; set; }

        //public List<Ver_Qty_Pur_Arch>? version { get; set; }

    }

    public class TablePage
    {
        public string name { get; set; }
        public string? version { get; set; }
        public string type { get; set; }
        public DateTime? purchasedDate { get; set; }
        public DateTime? expireyDate { get; set; }
        public string? assignedTo { get; set; }
        public string? assignedBy { get; set; }
        public DateTime? assignedDate { get; set;}
        public bool? isArchived { get; set; }
    }

    public class Ver_Qty_Pur_Arch
    {
        public string? version { get; set; }
        public int inStock { get; set; }
        public List<DateTime?>? purchaseDates { get; set; }
        public bool? isArchived { get; set; }

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

        public List<Pur_Qty_Exp> PurchaseDates { get; set; }

        public List<DateTime?>? ExpiryDates { get; set; }

        public bool? isArchived { get; set; }
    }
    public class filterDto{
        public string location { get; set; }
        public List<string?> selectedStock { get; set; }
        public string IsArchived { get; set; }
        public List<string?> selectedType { get; set; }
        public DateOnly? From { get; set; }
        public DateOnly? To { get; set; }
    }

    public class Pur_Qty_Exp
    {
        public DateTime? PurchaseDates { get; set; }
        public DateTime? ExpiryDates { get; set; }
        public int Qty { get; set; }
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

    public class SoftwareUpdateDto
    {
        public string Name { get; set; }
        public string Version { get; set; }
        public string Type { get; set; }
        public bool IsArchived { get; set; }

        public string location { get; set; }
    }

}