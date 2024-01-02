using System;
using System.Collections.Generic;

namespace ITMS.Server.Models;

public partial class SoftwareType
{
    public Guid Id { get; set; }

    public string TypeName { get; set; } = null!;

    public virtual ICollection<Software> Softwares { get; } = new List<Software>();
}
