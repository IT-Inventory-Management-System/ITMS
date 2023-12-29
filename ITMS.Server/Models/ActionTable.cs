using System;
using System.Collections.Generic;

namespace ITMS.Server.Models;

public partial class ActionTable
{
    public Guid Id { get; set; }

    public string ActionName { get; set; } = null!;

    public virtual ICollection<DevicesLog> DevicesLogs { get; } = new List<DevicesLog>();
}
