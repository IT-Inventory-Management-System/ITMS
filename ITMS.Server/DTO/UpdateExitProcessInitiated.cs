namespace ITMS.Server.DTO
{
    public class UpdateExitProcessInitiated
    {
        public Guid EmployeeId { get; set; }
        public Guid updatedBy { get; set; }
        public bool ExitProcessInitiated { get; set; }
    }
}
