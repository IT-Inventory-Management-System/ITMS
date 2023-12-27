using System;
using System.Collections.Generic;

namespace ITMS.Server.Models;

public partial class DeviceModel
{
    public Guid Id { get; set; }

    public string? ModelName { get; set; }

    public string? Processor { get; set; }

    public string? Os { get; set; }

    public string? Ram { get; set; }

    public string? Rom { get; set; }

    public bool? IsWired { get; set; }

    public Guid CategoryId { get; set; }

    public Guid CreatedBy { get; set; }

    public DateTime CreatedAtUtc { get; set; }

    public Guid UpdatedBy { get; set; }

    public DateTime UpdatedAtUtc { get; set; }

    public bool IsArchived { get; set; }

    public virtual Category Category { get; set; } = null!;

    public virtual Employee CreatedByNavigation { get; set; } = null!;

    public virtual ICollection<DevicesLog> DevicesLogs { get; } = new List<DevicesLog>();

    public virtual ICollection<Inventory> Inventories { get; } = new List<Inventory>();

    public virtual Employee UpdatedByNavigation { get; set; } = null!;
}
