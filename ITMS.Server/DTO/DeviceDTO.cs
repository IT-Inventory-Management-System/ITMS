
using FSharp.Data.Runtime.StructuralTypes;
using Org.BouncyCastle.Utilities;
using static Azure.Core.HttpHeader;
using System.Runtime.InteropServices;

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
    public class ArchivedoneDto
    {
        public string? Cygid { get; set; }

        public Guid CreatedBy { get; set; }
        public Guid? UpdatedBy { get; set; }
        public string? Description { get; set; }
    }

    public class GetDeviceModelDTO
    {
        public string brand { get; set; }
        public string OS { get; set; }
        public string Processor { get; set; }
        public string Ram { get; set; }
        public string Storage { get; set; }
        public int total { get; set; }
        public int assigned { get; set; }
        public int inventory { get; set; }
    }

    public class DeviceModelInputDTO
    {
        public string deviceModelId { get; set; }
        public string locationId { get; set; }

    }


    public class locationaccesoryDTO{
        public Guid locationId { get; set; }
        public bool? IsArchived { get; set; }

        public string? CYGID { get; set; }
    }

    public class allAccessoriesDTO
    {
        public Guid? accessoryId { get; set; }
        public string? Brand { get; set; }
        public string? CYGID { get; set; }
        public string? Status { get; set; }
        public bool? IsWired { get; set; }
        public bool? IsArchived { get; set; }
        public bool? AssignedTo { get; set; }
        public string? Category { get; set; }
        public int? Qty { get; set; }
        public DateTime? PurchaseDate { get; set; }
        public DateTime? WarrantyDate { get; set; }
        public string? CategoryType { get; set; }
        public int? ScreenSize { get; set; }
        public bool? IsHDMI { get; set; }
        public bool? IsVGA { get; set; }
        public bool? IsDVI { get; set; }

    }

    public class filterAccessoriesBodyDTO
    {
        public string? Category { get; set; }
        public string? IsWired { get; set; }
        public string? Availability { get; set; }
        public List<string>? selectedStock { get; set; }
        public bool? IsArchived { get; set; }
        public Guid location { get; set; }
    }

    public class historySingleAccessory
    {
        public string? empName { get; set;}
        public string? CYGID { get; set; }
        public string? AssignedBy { get; set; }
        public DateTime? AssignedDate { get; set; }
        public string? RecievedBy { get; set; }
        public DateTime? RecievedDate { get; set; }
    }

    public class UnassignableDto
    {
        public string? Cygid { get; set; }
        public Guid CreatedBy { get; set; }
        public Guid? UpdatedBy { get; set; }
        public string? Description { get; set; }
        public bool IsUnassignable { get; set; }
    }
    public class DeviceModelInputDto
    {
        public Guid CategoryId { get; set; }
        public string? Brand { get; set; }
        public Guid CreatedBy { get; set; }
        public Guid? UpdatedBy { get;set; }
    }
    public class MonitorDTO
    {
        public bool? IsHDMI { get; set; }
        public bool? IsVGA { get; set; }
        public bool? IsDVI { get; set; }
        public Guid CreatedBy { get; set; }
        public Guid? UpdatedBy { get; set; }
        public string? Brand { get; set; }
        public Guid CategoryId { get; set; }

    }
    public class monitorInputDTO
    {
        public string? Brand { get; set; }

    }
    public class CommonDTO
    {
        public Guid CreatedBy { get; set; }
        public Guid? UpdatedBy { get; set; }
        public string? Brand { get; set; }
        public Guid CategoryId { get; set; }

    }

    public class DeviceInputDTO
    {
        public string? Model { get; set; }
        public string? SerialNumber { get; set; }
        public DateTime? DateOfPurchase { get; set; }
        public string? AssignedTo { get; set; }
        public string? CYGID { get; set; }
        public DateTime? AssignedDate { get; set; }
        public Guid CreatedBy { get; set; }
        public Guid? UpdatedBy { get; set; }
        public Guid locationId { get; set; }

    }

    public class ListDeviceInputDto
    {
        public List<DeviceInputDTO> Devices { get; set; }
    }

    public class DeviceResponseDTO
    {
        public string CYGID { get; set; }
        public string ErrorMessage { get; set; }
    }


    public class OneTimeAddDeviceDTO
    {
        public string FullDeviceName { get; set; }
        public string? Processor { get; set; }
        public string DeviceLog { get; set; }
        public string? Ram { get; set; }
        public string? Storage { get; set; }
        public string? SerialNo { get; set; }
        public string? PurchasedDate { get; set; }
        public string? Cygid { get; set; }
        public Guid LoggedIn { get; set; }
        public Guid locationId { get; set; }
    }

    public class PutSingleDeviceModelDTO
    {
        public string FullDeviceName { get; set; }
        public string? Processor { get; set; }
        public string? Ram { get; set; }
        public string? Storage { get; set; }

    }
}
