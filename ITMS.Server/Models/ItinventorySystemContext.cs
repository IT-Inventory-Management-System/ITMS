using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace ITMS.Server.Models;

public partial class ItinventorySystemContext : DbContext
{
    public ItinventorySystemContext()
    {
    }

    public ItinventorySystemContext(DbContextOptions<ItinventorySystemContext> options)
        : base(options)
    {
    }

    public virtual DbSet<ActionTable> ActionTables { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<CategoryType> CategoryTypes { get; set; }

    public virtual DbSet<Comment> Comments { get; set; }

    public virtual DbSet<Device> Devices { get; set; }

    public virtual DbSet<DeviceModel> DeviceModels { get; set; }

    public virtual DbSet<DevicesLog> DevicesLogs { get; set; }

    public virtual DbSet<Employee> Employees { get; set; }

    public virtual DbSet<Location> Locations { get; set; }

    public virtual DbSet<Ostype> Ostypes { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Software> Softwares { get; set; }

    public virtual DbSet<SoftwareAllocation> SoftwareAllocations { get; set; }

    public virtual DbSet<SoftwareType> SoftwareTypes { get; set; }

    public virtual DbSet<Status> Statuses { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=.\\SQLExpress;Database=ITInventorySystem;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ActionTable>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__ActionTa__3214EC07FC64AEB7");

            entity.ToTable("ActionTable");

            entity.HasIndex(e => e.ActionName, "UQ__ActionTa__491F5DD015E742CC").IsUnique();

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.ActionName).HasMaxLength(255);
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Category__3214EC07AF360BF1");

            entity.ToTable("Category");

            entity.HasIndex(e => e.Name, "UQ__Category__737584F641826169").IsUnique();

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.Name).HasMaxLength(255);

            entity.HasOne(d => d.CategoryType).WithMany(p => p.Categories)
                .HasForeignKey(d => d.CategoryTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Category__Catego__47DBAE45");
        });

        modelBuilder.Entity<CategoryType>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Category__3214EC07E6B7E6C6");

            entity.ToTable("CategoryType");

            entity.HasIndex(e => e.TypeName, "UQ__Category__D4E7DFA8A1D933F5").IsUnique();

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.Priority);
            entity.Property(e => e.TypeName).HasMaxLength(255);
        });

        modelBuilder.Entity<Comment>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Comment__3214EC079E5D027F");

            entity.ToTable("Comment");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.CreatedAtUtc)
                .HasColumnType("datetime")
                .HasColumnName("CreatedAtUTC");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.Comments)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Comment__Softwar__7A672E12");

            entity.HasOne(d => d.Device).WithMany(p => p.Comments)
                .HasForeignKey(d => d.DeviceId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Comment__DeviceI__7B5B524B");

            entity.HasOne(d => d.SoftwareAllocation).WithMany(p => p.Comments)
                .HasForeignKey(d => d.SoftwareAllocationId)
                .HasConstraintName("FK__Comment__Softwar__7C4F7684");
        });

        modelBuilder.Entity<Device>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Device__3214EC07C1D4EDD0");

            entity.ToTable("Device");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.AssignedDate).HasColumnType("datetime");
            entity.Property(e => e.CreatedAtUtc)
                .HasColumnType("datetime")
                .HasColumnName("CreatedAtUTC");
            entity.Property(e => e.Cygid)
                .HasMaxLength(255)
                .HasColumnName("CYGID");
            entity.Property(e => e.IsArchived).HasColumnName("isArchived");
            entity.Property(e => e.LocationId).HasColumnName("locationId");
            entity.Property(e => e.PurchasedDate).HasColumnType("datetime");
            entity.Property(e => e.RecievedDate).HasColumnType("datetime");
            entity.Property(e => e.SerialNumber).HasMaxLength(255);
            entity.Property(e => e.UpdatedAtUtc)
                .HasColumnType("datetime")
                .HasColumnName("UpdatedAtUTC");
            entity.Property(e => e.WarrantyDate).HasColumnType("datetime");

            entity.HasOne(d => d.AssignedByNavigation).WithMany(p => p.DeviceAssignedByNavigations)
                .HasForeignKey(d => d.AssignedBy)
                .HasConstraintName("FK__Device__Assigned__628FA481");

            entity.HasOne(d => d.AssignedToNavigation).WithMany(p => p.DeviceAssignedToNavigations)
                .HasForeignKey(d => d.AssignedTo)
                .HasConstraintName("FK__Device__Assigned__619B8048");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.DeviceCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Device__CreatedB__5FB337D6");

            entity.HasOne(d => d.DeviceModel).WithMany(p => p.Devices)
                .HasForeignKey(d => d.DeviceModelId)
                .HasConstraintName("FK__Device__location__5EBF139D");

            entity.HasOne(d => d.Location).WithMany(p => p.Devices)
                .HasForeignKey(d => d.LocationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Device__location__656C112C");

            entity.HasOne(d => d.RecievedByNavigation).WithMany(p => p.DeviceRecievedByNavigations)
                .HasForeignKey(d => d.RecievedBy)
                .HasConstraintName("FK__Device__Recieved__6383C8BA");

            entity.HasOne(d => d.StatusNavigation).WithMany(p => p.Devices)
                .HasForeignKey(d => d.Status)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Device__Status__6477ECF3");

            entity.HasOne(d => d.UpdatedByNavigation).WithMany(p => p.DeviceUpdatedByNavigations)
                .HasForeignKey(d => d.UpdatedBy)
                .HasConstraintName("FK__Device__UpdatedB__60A75C0F");
        });

        modelBuilder.Entity<DeviceModel>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__DeviceMo__3214EC07534F3360");

            entity.ToTable("DeviceModel");

            entity.HasIndex(e => e.ModelNo, "UQ__DeviceMo__E8D6B556E7687B1D").IsUnique();

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.Brand).HasMaxLength(255);
            entity.Property(e => e.CreatedAtUtc)
                .HasColumnType("datetime")
                .HasColumnName("CreatedAtUTC");
            entity.Property(e => e.DeviceName).HasMaxLength(255);
            entity.Property(e => e.IsArchived).HasColumnName("isArchived");
            entity.Property(e => e.IsWired).HasColumnName("isWired");
            entity.Property(e => e.ModelNo).HasMaxLength(255);
            entity.Property(e => e.Os).HasColumnName("OS");
            entity.Property(e => e.Processor).HasMaxLength(255);
            entity.Property(e => e.Ram)
                .HasMaxLength(255)
                .HasColumnName("RAM");
            entity.Property(e => e.Storage).HasMaxLength(255);
            entity.Property(e => e.UpdatedAtUtc)
                .HasColumnType("datetime")
                .HasColumnName("UpdatedAtUTC");

            entity.HasOne(d => d.Category).WithMany(p => p.DeviceModels)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__DeviceMod__Categ__59063A47");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.DeviceModelCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__DeviceMod__Creat__59FA5E80");

            entity.HasOne(d => d.OsNavigation).WithMany(p => p.DeviceModels)
                .HasForeignKey(d => d.Os)
                .HasConstraintName("FK__DeviceMod__isArc__5812160E");

            entity.HasOne(d => d.UpdatedByNavigation).WithMany(p => p.DeviceModelUpdatedByNavigations)
                .HasForeignKey(d => d.UpdatedBy)
                .HasConstraintName("FK__DeviceMod__Updat__5AEE82B9");
        });

        modelBuilder.Entity<DevicesLog>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__DevicesL__3214EC07896B6C9A");

            entity.ToTable("DevicesLog");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.AllotedDate).HasColumnType("datetime");
            entity.Property(e => e.AssignedDate).HasColumnType("datetime");
            entity.Property(e => e.CreatedAtUtc)
                .HasColumnType("datetime")
                .HasColumnName("CreatedAtUTC");
            entity.Property(e => e.RecievedDate).HasColumnType("datetime");
            entity.Property(e => e.UpdatedAtUtc)
                .HasColumnType("datetime")
                .HasColumnName("UpdatedAtUTC");

            entity.HasOne(d => d.Action).WithMany(p => p.DevicesLogs)
                .HasForeignKey(d => d.ActionId)
                .HasConstraintName("FK__DevicesLo__Actio__0A9D95DB");

            entity.HasOne(d => d.AssignedByNavigation).WithMany(p => p.DevicesLogAssignedByNavigations)
                .HasForeignKey(d => d.AssignedBy)
                .HasConstraintName("FK__DevicesLo__Assig__06CD04F7");

            entity.HasOne(d => d.Comment).WithMany(p => p.DevicesLogs)
                .HasForeignKey(d => d.CommentId)
                .HasConstraintName("FK__DevicesLo__Comme__05D8E0BE");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.DevicesLogCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__DevicesLo__Creat__08B54D69");

            entity.HasOne(d => d.Device).WithMany(p => p.DevicesLogs)
                .HasForeignKey(d => d.DeviceId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__DevicesLo__Devic__03F0984C");

            entity.HasOne(d => d.Employee).WithMany(p => p.DevicesLogEmployees)
                .HasForeignKey(d => d.EmployeeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__DevicesLo__Emplo__04E4BC85");

            entity.HasOne(d => d.RecievedByNavigation).WithMany(p => p.DevicesLogRecievedByNavigations)
                .HasForeignKey(d => d.RecievedBy)
                .HasConstraintName("FK__DevicesLo__Recie__07C12930");

            entity.HasOne(d => d.UpdatedByNavigation).WithMany(p => p.DevicesLogUpdatedByNavigations)
                .HasForeignKey(d => d.UpdatedBy)
                .HasConstraintName("FK__DevicesLo__Updat__09A971A2");
        });

        modelBuilder.Entity<Employee>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Employee__3214EC071A7CF29B");

            entity.ToTable("Employee");

            entity.HasIndex(e => e.Cgiid, "UQ__Employee__DCC46F8888CFCCAB").IsUnique();

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.Cgiid)
                .HasMaxLength(255)
                .HasColumnName("CGIID");
            entity.Property(e => e.CreatedAtUtc)
                .HasColumnType("datetime")
                .HasColumnName("CreatedAtUTC");
            entity.Property(e => e.Email).HasMaxLength(255);
            entity.Property(e => e.FirstName).HasMaxLength(255);
            entity.Property(e => e.IsArchived).HasColumnName("isArchived");
            entity.Property(e => e.LastName).HasMaxLength(255);
            entity.Property(e => e.LocationId).HasColumnName("locationId");
            entity.Property(e => e.Password).HasMaxLength(255);
            entity.Property(e => e.UpdatedAtUtc)
                .HasColumnType("datetime")
                .HasColumnName("UpdatedAtUTC");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.InverseCreatedByNavigation)
                .HasForeignKey(d => d.CreatedBy)
                .HasConstraintName("FK__Employee__Create__5165187F");

            entity.HasOne(d => d.Location).WithMany(p => p.Employees)
                .HasForeignKey(d => d.LocationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Employee__locati__534D60F1");

            entity.HasOne(d => d.Role).WithMany(p => p.Employees)
                .HasForeignKey(d => d.RoleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Employee__locati__5070F446");

            entity.HasOne(d => d.UpdatedByNavigation).WithMany(p => p.InverseUpdatedByNavigation)
                .HasForeignKey(d => d.UpdatedBy)
                .HasConstraintName("FK__Employee__Update__52593CB8");
        });

        modelBuilder.Entity<Location>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Location__3214EC075DD5F3B1");

            entity.ToTable("Location");

            entity.HasIndex(e => e.Location1, "UQ__Location__E55D3B101603D26D").IsUnique();

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.Location1)
                .HasMaxLength(255)
                .HasColumnName("Location");
        });

        modelBuilder.Entity<Ostype>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__OSType__3214EC07833F0870");

            entity.ToTable("OSType");

            entity.HasIndex(e => e.Osname, "UQ__OSType__82612F86F377D5BE").IsUnique();

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.Osname)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("OSName");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Role__3214EC0710FAD9EF");

            entity.ToTable("Role");

            entity.HasIndex(e => e.Name, "UQ__Role__737584F6733174BD").IsUnique();

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.Name).HasMaxLength(255);
        });

        modelBuilder.Entity<Software>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Software__3214EC07B313DE4A");

            entity.ToTable("Software");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.CreatedAtUtc)
                .HasColumnType("datetime")
                .HasColumnName("CreatedAtUTC");
            entity.Property(e => e.SoftwareName).HasMaxLength(255);
            entity.Property(e => e.SoftwareThumbnail).HasMaxLength(255);
            entity.Property(e => e.UpdatedAtUtc)
                .HasColumnType("datetime")
                .HasColumnName("UpdatedAtUTC");

            entity.HasOne(d => d.Category).WithMany(p => p.Softwares)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Software__Catego__6E01572D");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.SoftwareCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Software__Create__6EF57B66");

            entity.HasOne(d => d.SoftwareType).WithMany(p => p.Softwares)
                .HasForeignKey(d => d.SoftwareTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Software__Update__6D0D32F4");

            entity.HasOne(d => d.UpdatedByNavigation).WithMany(p => p.SoftwareUpdatedByNavigations)
                .HasForeignKey(d => d.UpdatedBy)
                .HasConstraintName("FK__Software__Update__6FE99F9F");
        });

        modelBuilder.Entity<SoftwareAllocation>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Software__3214EC07E1AE5D7D");

            entity.ToTable("SoftwareAllocation");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.ActivationKey).HasMaxLength(255);
            entity.Property(e => e.AssignedDate).HasColumnType("datetime");
            entity.Property(e => e.ExpiryDate).HasColumnType("date");
            entity.Property(e => e.LocationId).HasColumnName("locationId");
            entity.Property(e => e.PurchasedDate).HasColumnType("date");
            entity.Property(e => e.SoftwareVersion).HasMaxLength(255);

            entity.HasOne(d => d.AssignedByNavigation).WithMany(p => p.SoftwareAllocationAssignedByNavigations)
                .HasForeignKey(d => d.AssignedBy)
                .HasConstraintName("FK__SoftwareA__Assig__75A278F5");

            entity.HasOne(d => d.AssignedToNavigation).WithMany(p => p.SoftwareAllocationAssignedToNavigations)
                .HasForeignKey(d => d.AssignedTo)
                .HasConstraintName("FK__SoftwareA__Assig__74AE54BC");

            entity.HasOne(d => d.Location).WithMany(p => p.SoftwareAllocations)
                .HasForeignKey(d => d.LocationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__SoftwareA__locat__76969D2E");

            entity.HasOne(d => d.Software).WithMany(p => p.SoftwareAllocations)
                .HasForeignKey(d => d.SoftwareId)
                .HasConstraintName("FK__SoftwareA__locat__73BA3083");
        });

        modelBuilder.Entity<SoftwareType>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Software__3214EC07078A3875");

            entity.ToTable("SoftwareType");

            entity.HasIndex(e => e.TypeName, "UQ__Software__D4E7DFA884F7B31C").IsUnique();

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.TypeName).HasMaxLength(255);
        });

        modelBuilder.Entity<Status>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Status__3214EC072A02F903");

            entity.ToTable("Status");

            entity.HasIndex(e => e.Type, "UQ__Status__F9B8A48B79FA7DBE").IsUnique();

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.Type).HasMaxLength(255);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
