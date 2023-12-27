using System;
using System.Collections.Generic;

namespace ITMS.Server.Models;

public partial class Status
{
    public Guid Id { get; set; }

    public string Type { get; set; } = null!;

    public virtual ICollection<DevicesLog> DevicesLogs { get; } = new List<DevicesLog>();

    public virtual ICollection<Inventory> Inventories { get; } = new List<Inventory>();
}
