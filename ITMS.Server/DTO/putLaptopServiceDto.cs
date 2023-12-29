namespace ITMS.Server.DTO
{
    public class putLaptopServiceDto
    {
        public int OS { get; set; }
        public Guid DeviceModelId { get; set; }

        public int Qty { get; set; }

        public DateTime PurchasedOn { get; set; }

        public DateTime? WarrantyDate { get; set; }

        public List<int> SerialNumberList { get; set; }

        public List<String> CYGIdsList { get; set; }




        public Guid CreatedBy { get; set; }

        public DateTime CreatedAtUtc { get; set; }


        public Guid? AssignedTo { get; set; }

        public Guid Status { get; set; }

        public bool IsArchived { get; set; }


    }
}
