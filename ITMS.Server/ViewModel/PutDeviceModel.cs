using System;
using System.Collections.Generic;

namespace ITMS.Server.ViewModel
{
    public class PutDeviceModel
    {
        public string? DeviceName { get; set; }

        public string? Brand { get; set; }

        public string? ModelNo { get; set; }

        public string? Processor { get; set; }

        public Guid? Os { get; set; }

        public string? Ram { get; set; }

        public string? Storage { get; set; }

        public bool? IsWired { get; set; }

        public Guid CategoryId { get; set; }

        public Guid CreatedBy { get; set; }

        public DateTime CreatedAtUtc { get; set; }

        public Guid? UpdatedBy { get; set; }

        public DateTime? UpdatedAtUtc { get; set; }

        public bool? IsArchived { get; set; }
    }
}
