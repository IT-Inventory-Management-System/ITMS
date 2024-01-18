public class LaptopModelDTO
{
    public Guid Id { get; set; }
    public string DeviceName { get; set; }
    public string OSName { get; set; }
}
public class SoftwareModelDTO
{
    public Guid Id { get; set; }
    public string SoftwareName { get; set; }
    public Guid SoftwareTypeId { get; set; }
    public string TypeName {  get; set; }
}
