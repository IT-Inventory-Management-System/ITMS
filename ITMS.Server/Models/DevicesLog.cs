using System;
using System.Collections.Generic;

namespace ITMS.Server.Models;

public partial class DevicesLog
{
    public Guid Id { get; set; }

    public Guid DeviceId { get; set; }

    public Guid ModelId { get; set; }

    public Guid UserId { get; set; }

    public string? Description { get; set; }

    public Guid StatusId { get; set; }

    public DateTime? AllotedDate { get; set; }

    public Guid CreatedBy { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public Guid UpdatedBy { get; set; }

    public bool IsArchived { get; set; }

    public string? Action { get; set; }

    public virtual Employee CreatedByNavigation { get; set; } = null!;

    public virtual Inventory Device { get; set; } = null!;

    public virtual DeviceModel Model { get; set; } = null!;

    public virtual Status Status { get; set; } = null!;

    public virtual Employee UpdatedByNavigation { get; set; } = null!;

    public virtual Employee User { get; set; } = null!;
}
