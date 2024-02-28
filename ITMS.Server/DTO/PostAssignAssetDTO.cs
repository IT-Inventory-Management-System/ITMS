namespace ITMS.Server.DTO
{
    public class PostAssignAssetDTO
    {
        public string? DeviceCYGID { get; set; }
        public string? AccessoryCYGID { get; set; }
        public string? SoftwareId { get; set; }
        public Guid? AssignedTo { get; set; }
        public Guid AssignedBy { get; set; }
        public string? DeviceComment { get; set; }
        public string? SoftwareComment { get; set; }
        public string? AccessoryComment { get; set; }

    }
}
