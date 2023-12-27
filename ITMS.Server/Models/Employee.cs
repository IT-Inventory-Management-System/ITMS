using System;
using System.Collections.Generic;

namespace ITMS.Server.Models;

public partial class Employee
{
    public Guid Id { get; set; }

    public string? EmpId { get; set; }

    public string FirstName { get; set; } = null!;

    public string? LastName { get; set; }

    public string Email { get; set; } = null!;

    public string? Password { get; set; }

    public Guid RoleId { get; set; }

    public Guid? CreatedBy { get; set; }

    public DateTime CreatedAtUtc { get; set; }

    public Guid? UpdatedBy { get; set; }

    public DateTime UpdatedAtUtc { get; set; }

    public bool IsArchived { get; set; }

    public Guid LocationId { get; set; }

    public virtual ICollection<Category> CategoryCreatedByNavigations { get; } = new List<Category>();

    public virtual ICollection<Category> CategoryUpdatedByNavigations { get; } = new List<Category>();

    public virtual Employee? CreatedByNavigation { get; set; }

    public virtual ICollection<DeviceModel> DeviceModelCreatedByNavigations { get; } = new List<DeviceModel>();

    public virtual ICollection<DeviceModel> DeviceModelUpdatedByNavigations { get; } = new List<DeviceModel>();

    public virtual ICollection<DevicesLog> DevicesLogCreatedByNavigations { get; } = new List<DevicesLog>();

    public virtual ICollection<DevicesLog> DevicesLogUpdatedByNavigations { get; } = new List<DevicesLog>();

    public virtual ICollection<DevicesLog> DevicesLogUsers { get; } = new List<DevicesLog>();

    public virtual ICollection<Inventory> InventoryAssignedToNavigations { get; } = new List<Inventory>();

    public virtual ICollection<Inventory> InventoryCreatedByNavigations { get; } = new List<Inventory>();

    public virtual ICollection<Inventory> InventoryUpdatedByNavigations { get; } = new List<Inventory>();

    public virtual ICollection<Employee> InverseCreatedByNavigation { get; } = new List<Employee>();

    public virtual ICollection<Employee> InverseUpdatedByNavigation { get; } = new List<Employee>();

    public virtual ICollection<License> LicenseCreatedByNavigations { get; } = new List<License>();

    public virtual ICollection<License> LicenseUpdatedByNavigations { get; } = new List<License>();

    public virtual Location Location { get; set; } = null!;

    public virtual Role Role { get; set; } = null!;

    public virtual Employee? UpdatedByNavigation { get; set; }

    public virtual ICollection<UserLicenseAllocation> UserLicenseAllocations { get; } = new List<UserLicenseAllocation>();
}
