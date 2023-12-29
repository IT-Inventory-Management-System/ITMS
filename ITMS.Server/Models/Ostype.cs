using System;
using System.Collections.Generic;

namespace ITMS.Server.Models;

public partial class Ostype
{
    public Guid Id { get; set; }

    public string? Osname { get; set; }

    public virtual ICollection<DeviceModel> DeviceModels { get; } = new List<DeviceModel>();
}
