// DTOs/DeviceLogDto.cs
using ITMS.Server.DTO;

public class DeviceLogDto
{
    public Guid Id { get; set; }
    public Guid DeviceId { get; set; }
    public Guid ModelId { get; set; }
    public string UserId { get; set; }
    public string Description { get; set; }
    public Guid StatusId { get; set; }
    public DateTime AllotedDate { get; set; }
    public string Action { get; set; }
}

public class UserDeviceLogDto
{
    public Guid Id { get; set; }
    public Guid DeviceId { get; set; }
    public Guid ModelId { get; set; }
    public string Description { get; set; }
    public Guid StatusId { get; set; }
    public DateTime AllotedDate { get; set; }
    public string Action { get; set; }
}

public class CategoryDTO
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public Guid CategoryTypeId { get; set; }
    public string CategoryTypeName { get; set; }
}

public class CategoryTypeDTO
{
    public Guid Id { get; set; }
    public string TypeName { get; set; }
    public List<CategoryDTO> Categories { get; set; }
}

public class CategoryTypeWithCategoriesDTO
{
    public Guid Id { get; set; }
    public string TypeName { get; set; }
    public List<CategoryDTO> Categories { get; set; }
}


