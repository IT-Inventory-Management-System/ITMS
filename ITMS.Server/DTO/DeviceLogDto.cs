// DTOs/DeviceLogDto.cs
using ITMS.Server.DTO;
using ITMS.Server.Models;


public class DevicelogDto
{
    public string? Cygid { get; set; }
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
    public int Priority { get; set; }
}

public class CategoryTypeWithCategoriesDTO
{
    public Guid Id { get; set; }
    public string TypeName { get; set; }
    public List<CategoryDTO> Categories { get; set; }

    public int Priority { get; set; }
}


