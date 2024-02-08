using System;
using System.Collections.Generic;

namespace ITMS.Server.Models;

public partial class Software
{
    public Guid Id { get; set; }

    public string SoftwareName { get; set; } = null!;

    public Guid SoftwareTypeId { get; set; }

    public Guid CategoryId { get; set; }

    public byte[]? SoftwareThumbnail { get; set; }

    public Guid CreatedBy { get; set; }

    public DateTime CreatedAtUtc { get; set; }

    public Guid? UpdatedBy { get; set; }

    public DateTime? UpdatedAtUtc { get; set; }

    public virtual Category Category { get; set; } = null!;

    public virtual Employee CreatedByNavigation { get; set; } = null!;

    public virtual ICollection<SoftwareAllocation> SoftwareAllocations { get; } = new List<SoftwareAllocation>();

    public virtual SoftwareType SoftwareType { get; set; } = null!;

    public virtual Employee? UpdatedByNavigation { get; set; }
}
