namespace ITMS.Server.ViewModel
{
    public class PutSofwareAllocation
    {
        public Guid? SoftwareId { get; set; }

        public string? ActivationKey { get; set; }

        public DateTime? PurchasedDate { get; set; }

        public DateTime? ExpiryDate { get; set; }
        
        public int Qty { get; set; }

        public Guid? AssignedTo { get; set; }

        public Guid? AssignedBy { get; set; }

        public DateTime? AssignedDate { get; set; }

        public Guid LocationId { get; set; }
        public string? Version { get; set; }
        public bool? isArchived { get; set; }

    }
}
