namespace ITMS.Server.DTO
{
    public class GetDeviceDTO
    {
        public Guid Id { get; set; }

        public string? Cygid { get; set; }

        public Guid? AssignedTo { get; set; }

        public Guid? RecievedBy { get; set; }

        public Double? Age { get; set; }

        public string? DeviceName { get; set; }

        public string? Brand { get; set; }

        public string? ModelNo { get; set; }

        public string? Processor { get; set; }

        public String? Os { get; set; }

        public string? Ram { get; set; }

        public string? Storage { get; set; }
        
        public string? SerialNumber { get; set; }

        public DateTime? PurchasedDate { get; set; }

        public DateTime? WarrantyDate { get; set; }

        public DateTime? AssignedDate { get; set; }

        public string? AssignedToName { get; set; }

        public string Status { get; set; }

        public Guid LocationId { get; set; }

    }
}
