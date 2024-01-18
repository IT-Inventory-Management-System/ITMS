using System;
using System.Collections.Generic;

namespace ITMS.Server.Models;

public partial class SoftwareAllocation
{
    public Guid Id { get; set; }

    public Guid? SoftwareId { get; set; }

    public string? ActivationKey { get; set; }

   

    public DateTime? PurchasedDate { get; set; }

    public DateTime? ExpiryDate { get; set; }

    public Guid? AssignedTo { get; set; }

    public Guid? AssignedBy { get; set; }

    public DateTime? AssignedDate { get; set; }

    public Guid LocationId { get; set; }

    public virtual Employee? AssignedByNavigation { get; set; }

    public virtual Employee? AssignedToNavigation { get; set; }

    public virtual ICollection<Comment> Comments { get; } = new List<Comment>();

    public virtual Location Location { get; set; } = null!;

    public virtual Software? Software { get; set; }
}
