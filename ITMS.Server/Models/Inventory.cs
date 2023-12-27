using System;
using System.Collections.Generic;

namespace ITMS.Server.Models;

public partial class Inventory
{
    public Guid Id { get; set; }

    public string? SerialNumber { get; set; }

    public string? Cygid { get; set; }

    public Guid DeviceModelId { get; set; }

    public Guid CreatedBy { get; set; }

    public DateTime CreatedAtUtc { get; set; }

    public Guid UpdatedBy { get; set; }

    public DateTime UpdatedAtUtc { get; set; }

    public Guid? AssignedTo { get; set; }

    public Guid Status { get; set; }

    public bool IsArchived { get; set; }

    public DateTime PurchasedOn { get; set; }

    public DateTime? WarrantyDate { get; set; }

    public virtual Employee? AssignedToNavigation { get; set; }

    public virtual Employee CreatedByNavigation { get; set; } = null!;

    public virtual DeviceModel DeviceModel { get; set; } = null!;

    public virtual ICollection<DevicesLog> DevicesLogs { get; } = new List<DevicesLog>();

    public virtual ICollection<InventoryLicenseAllocation> InventoryLicenseAllocations { get; } = new List<InventoryLicenseAllocation>();

    public virtual Status StatusNavigation { get; set; } = null!;

    public virtual Employee UpdatedByNavigation { get; set; } = null!;
}
