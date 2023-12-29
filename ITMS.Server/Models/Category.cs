using System;
using System.Collections.Generic;

namespace ITMS.Server.Models;

public partial class Category
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public Guid CategoryTypeId { get; set; }

    public virtual CategoryType CategoryType { get; set; } = null!;

    public virtual ICollection<DeviceModel> DeviceModels { get; } = new List<DeviceModel>();

    public virtual ICollection<Software> Softwares { get; } = new List<Software>();
}
