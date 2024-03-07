namespace ITMS.Server.DTO
{
    public class RevokeAllServiceDTO
    {
        public Guid DeviceId { get; set; }
        public Guid DeviceLogId { get; set; }
        public Guid ActionId { get; set; }
        public string DeviceComment { get; set; }
        public Guid userId { get; set; }
        public Guid CreatedBy { get; set; }
    }
}
