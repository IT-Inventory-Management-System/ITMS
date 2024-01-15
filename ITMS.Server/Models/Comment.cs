using System;
using System.Collections.Generic;

namespace ITMS.Server.Models;

public partial class Comment
{
    public Guid Id { get; set; }

    public Guid DeviceLogId { get; set; }
    public string? Description { get; set; }

    public Guid CreatedBy { get; set; }

    public DateTime CreatedAtUtc { get; set; }
    

    public Guid DeviceId { get; set; }

    public Guid? SoftwareAllocationId { get; set; }

    public virtual Employee CreatedByNavigation { get; set; } = null!;

    public virtual Device Device { get; set; } = null!;
    public virtual ICollection<DevicesLog> DevicesLogs { get; set; } = new List<DevicesLog>();


    public virtual SoftwareAllocation? SoftwareAllocation { get; set; }
}
