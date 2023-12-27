using System;
using System.Collections.Generic;

namespace ITMS.Server.Models;

public partial class Category
{
    public Guid Id { get; set; }

    public string? Name { get; set; }

    public bool IsArchived { get; set; }

    public Guid CreatedBy { get; set; }

    public DateTime CreatedAtUtc { get; set; }

    public Guid UpdatedBy { get; set; }

    public DateTime UpdatedAtUtc { get; set; }

    public Guid LocationId { get; set; }

    public virtual Employee CreatedByNavigation { get; set; } = null!;

    public virtual ICollection<DeviceModel> DeviceModels { get; } = new List<DeviceModel>();

    public virtual Location Location { get; set; } = null!;

    public virtual Employee UpdatedByNavigation { get; set; } = null!;
}
