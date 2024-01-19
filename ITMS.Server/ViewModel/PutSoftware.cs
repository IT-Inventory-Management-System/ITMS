using System.Runtime.InteropServices;

namespace ITMS.Server.ViewModel
{
    public class PutSoftware
    {
        public string SoftwareName { get; set; } = null!;

        public Guid SoftwareTypeId { get; set; }

        public Guid CategoryId { get; set; }

        public byte[] SoftwareThumbnail { get; set; }
       
        public string? Version { get; set; }

        public Guid CreatedBy { get; set; }

        public DateTime CreatedAtUtc { get; set; }

        public Guid? UpdatedBy { get; set; }

        public DateTime? UpdatedAtUtc { get; set; }
    }
}
