using System;
using System.Collections.Generic;

namespace ITMS.Server.Models;

public partial class CategoryType
{
    public Guid Id { get; set; }

    public string TypeName { get; set; } = null!;

    public virtual ICollection<Category> Categories { get; } = new List<Category>();
}
