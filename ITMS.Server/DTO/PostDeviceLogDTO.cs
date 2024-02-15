namespace ITMS.Server.DTO
{
    public class PostDeviceLogDTO
    {
        public Guid? DeviceId { get; set; }
        public Guid? EmployeeId { get; set; }
        public Guid? AssignedBy { get; set;}
        public Guid? CreatedBy { get; set; }
        public Guid? UpdatedBy { get; set; }
        public Guid? SoftwareAllocationId { get; set; }

    }
}
