using System;
using System.Collections.Generic;

namespace ITMS.Server.Models;

public partial class License
{
    public Guid Id { get; set; }

    public string SoftwareName { get; set; } = null!;

    public string? LicenseKey { get; set; }

    public DateTime? ExpiryDate { get; set; }

    public Guid CreatedBy { get; set; }

    public DateTime CreatedAtUtc { get; set; }

    public Guid UpdatedBy { get; set; }

    public DateTime UpdatedAtUtc { get; set; }

    public bool IsArchived { get; set; }

    public virtual Employee CreatedByNavigation { get; set; } = null!;

    public virtual ICollection<InventoryLicenseAllocation> InventoryLicenseAllocations { get; } = new List<InventoryLicenseAllocation>();

    public virtual Employee UpdatedByNavigation { get; set; } = null!;

    public virtual ICollection<UserLicenseAllocation> UserLicenseAllocations { get; } = new List<UserLicenseAllocation>();
}
