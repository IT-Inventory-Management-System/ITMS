
using ITMS.Server.DTO;
using ITMS.Server.Models;


public class DevicelogDto
{
    public Guid Id { get; set; }
    public string? Cygid { get; set; }
    public string? status { get; set; }

    public Guid DeviceId { get; set; }
    public Guid UserId { get; set; }
    public string Cgiid { get; set; }
    public string EmployeeName { get; set; }
    public string AssignedBy { get; set; }
    public string FormattedAssignedDate { get; set; }
    public DateTime? AssignedDate { get; set; }

    public string RecievedBy { get; set; }
    public DateTime? RecievedDate { get; set; }
    public string AssignedTo { get; set; }

    public string Model { get; set; }

    public bool? IsArchived { get; set; }

    public List<Comment> Comments { get; set; } = new List<Comment>();

    public string? OperatingSystem { get; set; }
    public DateTime? purchaseDate { get; set; }
    public string? processor {get; set;}

}

public class OperatingDto
{
     public string? Osname { get; set; }

}
public class CommentDto
{
    public Guid Id { get; set; }
    public Guid? DeviceLogId { get; set; }
    public string Description { get; set; }
    public string CreatedBy { get; set; }

   
    public DateTime CreatedAt { get; set; }
    public Guid? DeviceId { get; set; }
    public Guid? SoftwareAllocationId { get; set; } //new
}

public class DeviceAddComment
{
    public Guid DeviceLogId { get; set; }
    public string Description { get; set; }
    public Guid CreatedBy { get; set; }
    public DateTime CreatedAt { get; set; }
    public Guid DeviceId { get; set; }
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


public class FilterDTO
{
    public List<string?> deviceStatus { get; set; }
    public List<string?> operatingSystem { get; set; }
    public List<string?> uniqueProcessor { get; set; }
    public DateOnly? fromDate { get; set; }
    public DateOnly? toDate { get; set; }
    public Guid locationId { get; set; }

}

public class singleLog
{
    public string? UpdatedBy { get; set; }
    public string? CYGID { get; set; }
    public string? Category { get; set; }
    public string? SubmittedTo { get; set; }
    public string? AssignedTo { get; set; }
    public string? Action { get; set; }
    public DateTime UpdatedOn { get; set; }
    public string? SoftwareName { get; set; }
}

public class adminHistoryParamsDTO
{
    public string employeeId { get; set; }
    public string locationName { get; set; }

    //public class logDTO
    //{
    //    public Guid DeviceId { get; set; }
    //    public Guid createdBy { get; set; }
    //    public Guid updatedbyBy { get; set; }
    //    public DateTime CreatedAt { get; set;}
    //    public DateTime updatedAt { get; set; }
    //    public Guid actionId { get; set; }




    public class returnSingleLog
    {
        public DateTime? UpdatedDate { get; set; }
        public IEnumerable<singleLog> Logs { get; set; }
    }

    public class filterDateadminHistoryParamsDTO
    {
        public DateOnly Date { get; set; }
        public string employeeId { get; set; }
        public string locationName { get; set; }
    }
}