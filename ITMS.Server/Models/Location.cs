using System;
using System.Collections.Generic;

namespace ITMS.Server.Models;

public partial class Location
{
    public Guid Id { get; set; }

    public string Location1 { get; set; } = null!;

    public virtual ICollection<Device> Devices { get; } = new List<Device>();

    public virtual ICollection<Employee> Employees { get; } = new List<Employee>();

    public virtual ICollection<SoftwareAllocation> SoftwareAllocations { get; } = new List<SoftwareAllocation>();
}
