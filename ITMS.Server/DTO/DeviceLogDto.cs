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

public class CategoryTypeDto
{
    public Guid Id { get; set; }
    public string TypeName { get; set; }

}

public class CategoryDTO
{

    public string Name { get; set; }
    public CategoryTypeDto categoryType { get; set; }

}


