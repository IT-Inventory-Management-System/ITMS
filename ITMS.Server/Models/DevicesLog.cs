using System;
using System.Collections.Generic;

namespace ITMS.Server.Models;

public partial class DevicesLog
{
    public Guid Id { get; set; }

    public Guid DeviceId { get; set; }

    public Guid EmployeeId { get; set; }

    public Guid? CommentId { get; set; }

    public Guid? AssignedBy { get; set; }

    public Guid? RecievedBy { get; set; }

    public DateTime? AssignedDate { get; set; }

    public DateTime? RecievedDate { get; set; }

    public DateTime? AllotedDate { get; set; }

    public Guid CreatedBy { get; set; }

    public DateTime CreatedAtUtc { get; set; }

    public Guid? UpdatedBy { get; set; }

    public DateTime? UpdatedAtUtc { get; set; }

    public Guid? ActionId { get; set; }

    public virtual ActionTable? Action { get; set; }

    public virtual Employee? AssignedByNavigation { get; set; }

    public virtual Comment? Comment { get; set; }

    public virtual Employee CreatedByNavigation { get; set; } = null!;

    public virtual Device Device { get; set; } = null!;

    public virtual Employee Employee { get; set; } = null!;

    public virtual Employee? RecievedByNavigation { get; set; }

    public virtual Employee? UpdatedByNavigation { get; set; }
    public virtual List<Comment> Comments { get; set; } = new List<Comment>();
    
}
