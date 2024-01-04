
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



        public StatusDto Status { get; set; }
        public double AgeInYears { get; set; }
        public DeviceModelDto DeviceModel { get; set; }

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

}
