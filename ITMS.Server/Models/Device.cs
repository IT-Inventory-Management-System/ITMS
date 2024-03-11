using System;
using System.Collections.Generic;

namespace ITMS.Server.Models;

public partial class Device
{
    public Guid Id { get; set; }

    public string? SerialNumber { get; set; }

    public string? Cygid { get; set; }

    public Guid? DeviceModelId { get; set; }

    public Guid CreatedBy { get; set; }

    public DateTime CreatedAtUtc { get; set; }

    public Guid? UpdatedBy { get; set; }

    public DateTime? UpdatedAtUtc { get; set; }

    public Guid? AssignedTo { get; set; }

    public Guid? AssignedBy { get; set; }
    
    public Guid? RecievedBy { get; set; }

    public DateTime? AssignedDate { get; set; }

    public DateTime? RecievedDate { get; set; }

    public Guid Status { get; set; }

    public bool? IsArchived { get; set; }

    public DateTime? PurchasedDate { get; set; }

    public DateTime? WarrantyDate { get; set; }

    public Guid LocationId { get; set; }

    public int ScreenSize { get; set; }

    public virtual Employee? AssignedByNavigation { get; set; }

    public virtual Employee? AssignedToNavigation { get; set; }

    public virtual ICollection<Comment> Comments { get; } = new List<Comment>();

    public virtual Employee CreatedByNavigation { get; set; } = null!;

    public virtual DeviceModel? DeviceModel { get; set; }

    public virtual ICollection<DevicesLog> DevicesLogs { get; } = new List<DevicesLog>();

    public virtual Location Location { get; set; } = null!;

    public virtual Employee? RecievedByNavigation { get; set; }

    public virtual Status StatusNavigation { get; set; } = null!;

    public virtual Employee? UpdatedByNavigation { get; set; }
}
