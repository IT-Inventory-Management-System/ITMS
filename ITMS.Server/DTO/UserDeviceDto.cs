// DTOs/UserDeviceDto.cs
public class UserDeviceDto
{

    public Guid Id { get; set; }
    public Guid DeviceId { get; set; }
    public Guid ModelId { get; set; }
    public string UserId { get; set; }
    public Guid StatusId { get; set; }
    public DateTime AllotedDate { get; set; }

    public string ModelName {  get; set; }
}
