
namespace ITMS.Server.DTO
{
    public class UserDeviceHistory
    {
        public Guid? DeviceId { get; set; } //JUST ONE CHANGE
        public Guid DeviceLogId { get; set; } //just one change adding the DeviceLogId

        public string CategoryName { get; set; } //new
        public string cygid { get; set; }
        public string Model { get; set; }

        public string AssignBy { get; set; }

        public DateTime AssignedDate { get; set; }

        public string? SubmitedBy { get; set; }

        public DateTime? SubmitedByDate { get; set; }
        public string OSName { get; set; } //new 
        public string? Processor { get; set; } //new
        public string? Ram { get; set; } //new

        public string? Storage { get; set; } //new
        public DateTime? PurchasedDate { get; set; } //new
        public double DeviceAge { get; set; } //new

        public string ActionName {  get; set; } //new

        public string UpdatedBy { get; set; } //new

        public DateTime? UpdatedAtUtc { get; set; } //new
        public DateTime? CreatedAtUtc { get; set; }
        public Guid? ActionId { get; set; }
        public string Comments { get; set; }



    }
}
