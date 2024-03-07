namespace ITMS.Server.DTO
{
    public class RevokeAllDTO
    {
        public Guid CreatedBy { get; set; }
        public Guid archiveUserId { get; set; }
        public List<LaptopRevokeDTO> Laptop { get; set; }
        public List<SoftwareRevokeDTO> Software { get; set; }
        public List<AccessoryRevokeDTO> Accessory { get; set; }
    }

    public class LaptopRevokeDTO
    {
        public Guid DeviceLogId { get; set; }
        public Guid DeviceId { get; set; }
        public Guid ActionId { get; set; }
        public string DeviceComment { get; set; }
    }

    public class SoftwareRevokeDTO
    {
        public Guid DeviceLogId { get; set; }
        public Guid DeviceId { get; set; }
        public Guid SoftwareAllocationId { get; set; }
        public Guid ActionId { get; set; }
    }

    public class AccessoryRevokeDTO
    {
        public Guid DeviceLogId { get; set; }
        public Guid DeviceId { get; set; }
        public Guid ActionId { get; set; }
        public string DeviceComment { get; set; }
    }
}