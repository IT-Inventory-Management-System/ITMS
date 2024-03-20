namespace ITMS.Server.DTO
{
    public class GetBrandDTO
    {
        public Guid Id { get; set; }
        public string brand { get; set; }
        public bool? iswired { get; set; }

    }

    public class PostMouseModelDTO
    {
        public string brand { get; set; }
        public bool iswired { get; set; }
        public Guid categoryId { get; set; }
        public Guid createdBy { get; set; }
        public Guid updatedBy { get; set; }
        public DateTime createdAt { get; set; }
        public DateTime updatedAt { get; set; }
        public bool isArchived { get; set; }

    }

    public class PostMouseDTO
    {
        public List<String> deviceId { get; set; }
        public int qty { get; set; }
        public Guid deviceModelId { get; set; }
        public Guid createdBy { get; set; }
        public Guid updatedBy { get; set; }
        public Guid status { get; set; }
        public Guid locationId { get; set; }
        public DateTime createdAt { get; set; }
        public DateTime updatedAt { get; set; }
        public bool isArchived { get; set; }
        public DateTime purchaseddate { get; set; }
        public DateTime warrantydate { get; set; }

    }
    public class getCGIDTO
    {
        public string CGIID { get; set; }
    }
    public class getCGIMobile
    {
        public string Brand { get; set; }
    }
    public class getBrand
    {
        public string Brand { get; set; }
    }
    public class commonInputDTO
    {
        public string? Name { get; set; }
    }
    public class mobileInputDTO
    { 
        public string Brand { get; set; }
    }
    public class getAccessoriesDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }

    }
    public class getMouseDetailsDTO
    {
        public Guid Id { get; set; }
        public string Brand { get; set; }
        public bool? iswired { get; set; }
        public string CYGID { get; set; }
        public string? PortType { get; set; }
        public int? ScreenSize { get; set; }
        //public bool? isVGA { get; set; }
        //public bool? isDVI { get; set; }

    }

    public class accessoryInputDTO
    {
        public Guid locationId { get; set; }
        public string categoryName { get; set; }
    }

    public class categoryInputDTO
    {
        public Guid Id { get; set; }
        public string Brand { get; set; }
        public Guid categoryId { get; set; }
        public bool? IsHDMI { get; set; }
        public bool? IsVGA { get; set; }
        public bool? IsDVI { get; set; }
    }
    public class categoryDTO
    {
        public string categoryName { get; set; }
    }

    public class PostMonitorDTO
    {
        public List<String> deviceId { get; set; }
        public int qty { get; set; }
        public Guid deviceModelId { get; set; }
        public int ScreenSize { get; set; }
        public Guid createdBy { get; set; }
        public Guid updatedBy { get; set; }
        public Guid status { get; set; }
        public Guid locationId { get; set; }
        public DateTime createdAt { get; set; }
        public DateTime updatedAt { get; set; }
        public bool isArchived { get; set; }
        public DateTime purchaseddate { get; set; }
        public DateTime warrantydate { get; set; }

    }
    public class CommonDeviceDTO
    {
        public List<String> deviceId { get; set; }
        public int qty { get; set; }
        public Guid deviceModelId { get; set; }
        public Guid createdBy { get; set; }
        public Guid updatedBy { get; set; }
        public Guid status { get; set; }
        public Guid locationId { get; set; }
        public DateTime createdAt { get; set; }
        public DateTime updatedAt { get; set; }
        public bool isArchived { get; set; }
        public DateTime purchaseddate { get; set; }
        public DateTime warrantydate { get; set; }

    }

    public class OneTimePutBagDTO
    {
        public DateTime? Purchaseddate { get; set; }
        public string? AssignedTo { get; set; }
        public Guid LoggedIn { get; set; }
        public Guid locationId { get; set;}
    }
}
