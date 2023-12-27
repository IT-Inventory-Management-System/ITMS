using System;
using System.Collections.Generic;

namespace ITMS.Server.Models;

public partial class InventoryLicenseAllocation
{
    public Guid Id { get; set; }

    public Guid? InventoryId { get; set; }

    public Guid? LicenseId { get; set; }

    public DateTime AllocationDate { get; set; }

    public virtual Inventory? Inventory { get; set; }

    public virtual License? License { get; set; }
}
