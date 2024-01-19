// DTOs/UserDeviceDto.cs
public class UserDeviceDto
{
    public Guid Id { get; set; }
    public Guid DeviceId { get; set; }
    public Guid ModelId { get; set; }
    public string UserId { get; set; }
    public Guid StatusId { get; set; }
    public DateTime AllotedDate { get; set; }
    public string CreatedByUserId { get; set; }
    public string CreatedByUserName { get; set; }
    public DateTime CreatedAtUtc { get; set; }
    public string ModelName { get; set; }

    //// New fields
    //public string CommentDescription { get; set; }
    //public string CreatedByFullName { get; set; }
    //public DateTime CommentCreatedAtUtc { get; set; }
    //public CommentDto Comments { get; set; }
}

