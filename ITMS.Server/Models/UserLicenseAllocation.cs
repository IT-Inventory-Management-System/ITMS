using System;
using System.Collections.Generic;

namespace ITMS.Server.Models;

public partial class UserLicenseAllocation
{
    public Guid Id { get; set; }

    public Guid? EmployeeId { get; set; }

    public Guid? LicenseId { get; set; }

    public DateTime AllocationDate { get; set; }

    public virtual Employee? Employee { get; set; }

    public virtual License? License { get; set; }
}
