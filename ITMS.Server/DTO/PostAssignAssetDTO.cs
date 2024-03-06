namespace ITMS.Server.DTO
{
    public class PostAssignAssetDTO
    {
        public List<string?> DeviceCYGIDs { get; set; }
        public List<singleSoftwareDTO> SoftwareIds { get; set; }
        public List<string?> AccessoryCYGIDs { get; set; }
        public Guid AssignedTo { get; set; }
        public Guid AssignedBy { get; set; }
        public List<string?> DeviceComments { get; set; }
        public List<string?> SoftwareComments { get; set; }
        public List<string?> AccessoryComments { get; set; }
    }

    public class singleSoftwareDTO
    {
        public string SoftwareId { get; set; }
        public string version { get; set;}
    }
}
