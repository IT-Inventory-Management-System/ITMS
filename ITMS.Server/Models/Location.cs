using System;
using System.Collections.Generic;

namespace ITMS.Server.Models;

public partial class Location
{
    public Guid Id { get; set; }

    public string Location1 { get; set; } = null!;

    public virtual ICollection<Category> Categories { get; } = new List<Category>();

    public virtual ICollection<Employee> Employees { get; } = new List<Employee>();
}
