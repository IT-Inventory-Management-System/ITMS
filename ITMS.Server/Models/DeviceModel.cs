using System;
using System.Collections.Generic;

namespace ITMS.Server.Models;

public partial class DeviceModel
{
    public Guid Id { get; set; }

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

    public virtual Category Category { get; set; } = null!;

    public virtual Employee CreatedByNavigation { get; set; } = null!;

    public virtual ICollection<Device> Devices { get; } = new List<Device>();

    public virtual Ostype? OsNavigation { get; set; }

    public virtual Employee? UpdatedByNavigation { get; set; }
}
