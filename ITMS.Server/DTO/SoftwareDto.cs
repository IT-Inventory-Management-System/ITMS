namespace ITMS.Server.DTO
{
    // SoftwareTypeDTO.cs
    public class SoftwareTypeDTO
    {
        public Guid Id { get; set; }
        public required string TypeName { get; set; }
    }

    // SoftwareDTO.cs
    public class SoftwareDTO
    {
        public Guid Id { get; set; }
        public required string SoftwareName { get; set; }
        public Guid SoftwareTypeId { get; set; }
        public Guid CategoryId { get; set; }
        public required byte[] SoftwareThumbnail { get; set; }
        public string Version { get; set; }
        public Guid CreatedBy { get; set; }
        public DateTime CreatedAtUTC { get; set; }
        public Guid UpdatedBy { get; set; }
        public DateTime UpdatedAtUTC { get; set; }
    }

    // SoftwareAllocationDTO.cs
    public class SoftwareAllocationDTO
    {
        public Guid Id { get; set; }
        public Guid SoftwareId { get; set; }
        public required string ActivationKey { get; set; }
        public DateTime PurchasedDate { get; set; }
        public DateTime ExpiryDate { get; set; }
        public Guid AssignedTo { get; set; }
        public Guid AssignedBy { get; set; }
        public DateTime AssignedDate { get; set; }
        public Guid LocationId { get; set; }
    }

}
