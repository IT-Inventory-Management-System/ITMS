using System;
using System.Collections.Generic;

namespace ITMS.Server.Models; 

public partial class Employee
{
    public Guid Id { get; set; }

    public string Cgiid { get; set; } = null!;

    public string FirstName { get; set; } = null!;

    public string? LastName { get; set; }

    public string Email { get; set; } = null!;

    public string? Password { get; set; }

    public Guid RoleId { get; set; }

    public Guid? CreatedBy { get; set; }

    public DateTime CreatedAtUtc { get; set; }

    public Guid? UpdatedBy { get; set; }

    public DateTime? UpdatedAtUtc { get; set; }

    public bool? IsArchived { get; set; }

    public Guid LocationId { get; set; }

    public bool? ExitProcessInitiated { get; set; }

    public virtual ICollection<Comment> Comments { get; } = new List<Comment>();

    public virtual Employee? CreatedByNavigation { get; set; }

    public virtual ICollection<Device> DeviceAssignedByNavigations { get; } = new List<Device>();

    public virtual ICollection<Device> DeviceAssignedToNavigations { get; } = new List<Device>();

    public virtual ICollection<Device> DeviceCreatedByNavigations { get; } = new List<Device>();

    public virtual ICollection<DeviceModel> DeviceModelCreatedByNavigations { get; } = new List<DeviceModel>();

    public virtual ICollection<DeviceModel> DeviceModelUpdatedByNavigations { get; } = new List<DeviceModel>();

    public virtual ICollection<Device> DeviceRecievedByNavigations { get; } = new List<Device>();

    public virtual ICollection<Device> DeviceUpdatedByNavigations { get; } = new List<Device>();

    public virtual ICollection<DevicesLog> DevicesLogAssignedByNavigations { get; } = new List<DevicesLog>();

    public virtual ICollection<DevicesLog> DevicesLogCreatedByNavigations { get; } = new List<DevicesLog>();

    public virtual ICollection<DevicesLog> DevicesLogEmployees { get; } = new List<DevicesLog>();

    public virtual ICollection<DevicesLog> DevicesLogRecievedByNavigations { get; } = new List<DevicesLog>();

    public virtual ICollection<DevicesLog> DevicesLogUpdatedByNavigations { get; } = new List<DevicesLog>();

    public virtual ICollection<Employee> InverseCreatedByNavigation { get; } = new List<Employee>();

    public virtual ICollection<Employee> InverseUpdatedByNavigation { get; } = new List<Employee>();

    public virtual Location Location { get; set; } = null!;

    public virtual Role Role { get; set; } = null!;

    public virtual ICollection<SoftwareAllocation> SoftwareAllocationAssignedByNavigations { get; } = new List<SoftwareAllocation>();

    public virtual ICollection<SoftwareAllocation> SoftwareAllocationAssignedToNavigations { get; } = new List<SoftwareAllocation>();

    public virtual ICollection<Software> SoftwareCreatedByNavigations { get; } = new List<Software>();

    public virtual ICollection<Software> SoftwareUpdatedByNavigations { get; } = new List<Software>();

    public virtual Employee? UpdatedByNavigation { get; set; }

    public static implicit operator Employee(string v)
    {
        throw new NotImplementedException();
    }
}
