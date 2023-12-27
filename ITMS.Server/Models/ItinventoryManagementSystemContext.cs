using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace ITMS.Server.Models;

public partial class ItinventoryManagementSystemContext : DbContext
{
    public ItinventoryManagementSystemContext()
    {
    }

    public ItinventoryManagementSystemContext(DbContextOptions<ItinventoryManagementSystemContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<DeviceModel> DeviceModels { get; set; }

    public virtual DbSet<DevicesLog> DevicesLogs { get; set; }

    public virtual DbSet<Employee> Employees { get; set; }

    public virtual DbSet<Inventory> Inventories { get; set; }

    public virtual DbSet<InventoryLicenseAllocation> InventoryLicenseAllocations { get; set; }

    public virtual DbSet<License> Licenses { get; set; }

    public virtual DbSet<Location> Locations { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Status> Statuses { get; set; }

    public virtual DbSet<UserLicenseAllocation> UserLicenseAllocations { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=.\\SQLExpress;Database=ITInventoryManagementSystem;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Category__3214EC0742763165");

            entity.ToTable("Category");

            entity.HasIndex(e => e.Name, "UQ__Category__737584F6348927D5").IsUnique();

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.CreatedAtUtc)
                .HasColumnType("datetime")
                .HasColumnName("CreatedAtUTC");
            entity.Property(e => e.IsArchived).HasColumnName("isArchived");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedAtUtc)
                .HasColumnType("datetime")
                .HasColumnName("UpdatedAtUTC");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.CategoryCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Category__Create__49C3F6B7");

            entity.HasOne(d => d.Location).WithMany(p => p.Categories)
                .HasForeignKey(d => d.LocationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Category__Locati__4BAC3F29");

            entity.HasOne(d => d.UpdatedByNavigation).WithMany(p => p.CategoryUpdatedByNavigations)
                .HasForeignKey(d => d.UpdatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Category__Update__4AB81AF0");
        });

        modelBuilder.Entity<DeviceModel>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__DeviceMo__3214EC07626C1720");

            entity.ToTable("DeviceModel");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.CreatedAtUtc)
                .HasColumnType("datetime")
                .HasColumnName("CreatedAtUTC");
            entity.Property(e => e.IsArchived).HasColumnName("isArchived");
            entity.Property(e => e.IsWired).HasColumnName("isWired");
            entity.Property(e => e.ModelName)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Os)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("OS");
            entity.Property(e => e.Processor)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Ram)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("RAM");
            entity.Property(e => e.Rom)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ROM");
            entity.Property(e => e.UpdatedAtUtc)
                .HasColumnType("datetime")
                .HasColumnName("UpdatedAtUTC");

            entity.HasOne(d => d.Category).WithMany(p => p.DeviceModels)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__DeviceMod__Categ__4F7CD00D");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.DeviceModelCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__DeviceMod__Creat__5070F446");

            entity.HasOne(d => d.UpdatedByNavigation).WithMany(p => p.DeviceModelUpdatedByNavigations)
                .HasForeignKey(d => d.UpdatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__DeviceMod__Updat__5165187F");
        });

        modelBuilder.Entity<DevicesLog>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__DevicesL__3214EC0716D580E8");

            entity.ToTable("DevicesLog");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.Action)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.AllotedDate).HasColumnType("datetime");
            entity.Property(e => e.CreatedAt).HasColumnType("datetime");
            entity.Property(e => e.Description).IsUnicode(false);
            entity.Property(e => e.IsArchived).HasColumnName("isArchived");
            entity.Property(e => e.UpdatedAt).HasColumnType("datetime");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.DevicesLogCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__DevicesLo__Creat__60A75C0F");

            entity.HasOne(d => d.Device).WithMany(p => p.DevicesLogs)
                .HasForeignKey(d => d.DeviceId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__DevicesLo__Devic__5DCAEF64");

            entity.HasOne(d => d.Model).WithMany(p => p.DevicesLogs)
                .HasForeignKey(d => d.ModelId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__DevicesLo__Model__5EBF139D");

            entity.HasOne(d => d.Status).WithMany(p => p.DevicesLogs)
                .HasForeignKey(d => d.StatusId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__DevicesLo__Statu__628FA481");

            entity.HasOne(d => d.UpdatedByNavigation).WithMany(p => p.DevicesLogUpdatedByNavigations)
                .HasForeignKey(d => d.UpdatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__DevicesLo__Updat__619B8048");

            entity.HasOne(d => d.User).WithMany(p => p.DevicesLogUsers)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__DevicesLo__UserI__5FB337D6");
        });

        modelBuilder.Entity<Employee>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Employee__3214EC07FD71BBDC");

            entity.ToTable("Employee");

            entity.HasIndex(e => e.EmpId, "UQ__Employee__AF2DBB982B2F6B85").IsUnique();

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.CreatedAtUtc)
                .HasColumnType("datetime")
                .HasColumnName("CreatedAtUTC");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.EmpId)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.FirstName)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.IsArchived).HasColumnName("isArchived");
            entity.Property(e => e.LastName)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedAtUtc)
                .HasColumnType("datetime")
                .HasColumnName("UpdatedAtUTC");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.InverseCreatedByNavigation)
                .HasForeignKey(d => d.CreatedBy)
                .HasConstraintName("FK__Employee__Create__4316F928");

            entity.HasOne(d => d.Location).WithMany(p => p.Employees)
                .HasForeignKey(d => d.LocationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Employee__Locati__44FF419A");

            entity.HasOne(d => d.Role).WithMany(p => p.Employees)
                .HasForeignKey(d => d.RoleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Employee__Locati__4222D4EF");

            entity.HasOne(d => d.UpdatedByNavigation).WithMany(p => p.InverseUpdatedByNavigation)
                .HasForeignKey(d => d.UpdatedBy)
                .HasConstraintName("FK__Employee__Update__440B1D61");
        });

        modelBuilder.Entity<Inventory>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Inventor__3214EC07F39657F7");

            entity.ToTable("Inventory");

            entity.HasIndex(e => e.Cygid, "UQ__Inventor__3CDB8591EE3E54AD").IsUnique();

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.CreatedAtUtc)
                .HasColumnType("datetime")
                .HasColumnName("CreatedAtUTC");
            entity.Property(e => e.Cygid)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CYGId");
            entity.Property(e => e.IsArchived).HasColumnName("isArchived");
            entity.Property(e => e.PurchasedOn)
                .HasColumnType("datetime")
                .HasColumnName("Purchased_On");
            entity.Property(e => e.SerialNumber)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("serialNumber");
            entity.Property(e => e.UpdatedAtUtc)
                .HasColumnType("datetime")
                .HasColumnName("UpdatedAtUTC");
            entity.Property(e => e.WarrantyDate)
                .HasColumnType("datetime")
                .HasColumnName("Warranty_Date");

            entity.HasOne(d => d.AssignedToNavigation).WithMany(p => p.InventoryAssignedToNavigations)
                .HasForeignKey(d => d.AssignedTo)
                .HasConstraintName("FK__Inventory__Assig__59063A47");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.InventoryCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Inventory__Creat__571DF1D5");

            entity.HasOne(d => d.DeviceModel).WithMany(p => p.Inventories)
                .HasForeignKey(d => d.DeviceModelId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Inventory__Devic__5629CD9C");

            entity.HasOne(d => d.StatusNavigation).WithMany(p => p.Inventories)
                .HasForeignKey(d => d.Status)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Inventory__Statu__59FA5E80");

            entity.HasOne(d => d.UpdatedByNavigation).WithMany(p => p.InventoryUpdatedByNavigations)
                .HasForeignKey(d => d.UpdatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Inventory__Updat__5812160E");
        });

        modelBuilder.Entity<InventoryLicenseAllocation>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Inventor__3214EC07B8C92CCA");

            entity.ToTable("InventoryLicenseAllocation");

            entity.HasIndex(e => new { e.InventoryId, e.LicenseId }, "UC_InventoryLicense").IsUnique();

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.AllocationDate).HasColumnType("datetime");

            entity.HasOne(d => d.Inventory).WithMany(p => p.InventoryLicenseAllocations)
                .HasForeignKey(d => d.InventoryId)
                .HasConstraintName("FK__Inventory__Inven__6D0D32F4");

            entity.HasOne(d => d.License).WithMany(p => p.InventoryLicenseAllocations)
                .HasForeignKey(d => d.LicenseId)
                .HasConstraintName("FK__Inventory__Licen__6E01572D");
        });

        modelBuilder.Entity<License>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__License__3214EC0744EEC903");

            entity.ToTable("License");

            entity.HasIndex(e => e.LicenseKey, "UQ__License__45E1DD6FDBAC905D").IsUnique();

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.CreatedAtUtc)
                .HasColumnType("datetime")
                .HasColumnName("CreatedAtUTC");
            entity.Property(e => e.ExpiryDate).HasColumnType("datetime");
            entity.Property(e => e.IsArchived).HasColumnName("isArchived");
            entity.Property(e => e.LicenseKey)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.SoftwareName)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedAtUtc)
                .HasColumnType("datetime")
                .HasColumnName("UpdatedAtUTC");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.LicenseCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__License__Created__6754599E");

            entity.HasOne(d => d.UpdatedByNavigation).WithMany(p => p.LicenseUpdatedByNavigations)
                .HasForeignKey(d => d.UpdatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__License__Updated__68487DD7");
        });

        modelBuilder.Entity<Location>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Location__3214EC0792BFC62E");

            entity.ToTable("Location");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.Location1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Location");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Role__3214EC07903C44FC");

            entity.ToTable("Role");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Status>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Status__3214EC07002E8C5A");

            entity.ToTable("Status");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.Type)
                .HasMaxLength(255)
                .IsUnicode(false);
        });

        modelBuilder.Entity<UserLicenseAllocation>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__UserLice__3214EC076B0961FE");

            entity.ToTable("UserLicenseAllocation");

            entity.HasIndex(e => new { e.EmployeeId, e.LicenseId }, "UC_UserLicenseAllocation").IsUnique();

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.AllocationDate).HasColumnType("datetime");

            entity.HasOne(d => d.Employee).WithMany(p => p.UserLicenseAllocations)
                .HasForeignKey(d => d.EmployeeId)
                .HasConstraintName("FK__UserLicen__Emplo__72C60C4A");

            entity.HasOne(d => d.License).WithMany(p => p.UserLicenseAllocations)
                .HasForeignKey(d => d.LicenseId)
                .HasConstraintName("FK__UserLicen__Licen__73BA3083");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
