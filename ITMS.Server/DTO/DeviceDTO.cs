
using FSharp.Data.Runtime.StructuralTypes;
using Org.BouncyCastle.Utilities;

namespace ITMS.Server.DTO
{
    public class DeviceDto
    {
        public Guid Id { get; set; }

        public string? SerialNumber { get; set; }

        public string? Cygid { get; set; }

        public Guid? DeviceModelId { get; set; }

        public Guid CreatedBy { get; set; }

        public DateTime CreatedAtUtc { get; set; }

        public Guid? UpdatedBy { get; set; }

        public DateTime? UpdatedAtUtc { get; set; }

        public Guid? AssignedTo { get; set; }
        public Guid? AssignedBy { get; set; }

        public DateTime? PurchasedDate { get; set; }
        public string FormattedPurchasedDate => PurchasedDate.HasValue ? PurchasedDate.Value.ToString("dd-MM-yyyy") : null;


        public string WarrantyRemaining { get; set; }

        public DateTime? WarrantyDate { get; set; }


        public StatusDto Status { get; set; }
        public double AgeInYears { get; set; }
        public DeviceModelDto DeviceModel { get; set; }

        public bool? IsArchived { get; set; }

        public int modelCount { get; set; }

    }

    public class StatusDto
    {
        public Guid Id { get; set; }

        public string Type { get; set; } = null!;

    }
    public class DeviceModelDto
    {


        public string? Processor { get; set; }

        public string? DeviceName { get; set; }
        public string? Ram { get; set; }

        public string? Storage { get; set; }


    }

    public class OsTypeDto
    {
        public Guid Id { get; set; }
        public string Type { get; set; }
    }

    public class locationDto
    {
        public Guid Id { get; set; }
        public string Type { get; set; }
    }

    public class ArchiveDto
    {
        public string? Cygid { get; set; }
    }

    public class ProcessorDto
    {
        public string Name { get; set; }
    }

    public class allAccessoriesDTO
    {
        public string? Brand { get; set; }
        public string? CYGID { get; set; }
        public string? Status { get; set; }
        public bool? IsWired { get; set; }
        public string? Category { get; set; }
        public int? Qty { get; set; }
    }

    public class singleAccessoriesBodyDTO
    {
    }
}
