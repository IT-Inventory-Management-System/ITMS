namespace ITMS.Server.DTO
{
    public class RevokeAllServiceDTO
    {
        public Guid DeviceLogId { get; set; }
        public Guid ActionId { get; set; }
        public string DeviceComment { get; set; }
        public Guid userId { get; set; }
    }
}
