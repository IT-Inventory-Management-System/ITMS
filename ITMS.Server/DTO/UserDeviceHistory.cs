
namespace ITMS.Server.DTO
{
    public class UserDeviceHistory
    {
        public Guid DeviceId { get; set; } //JUST ONE CHANGE
        public string cygid { get; set; }
        public string Model { get; set; }

        public string AssignBy { get; set; }

        public DateTime AssignedDate { get; set; }

        public string? SubmitedBy { get; set; }

        public DateTime? SubmitedByDate { get; set; }
        public List<CommentDto> Comments { get; set; }



    }
}
