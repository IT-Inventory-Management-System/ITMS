using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ITMS.Server.Models;

//[JsonPropertyName()]
public partial class PutLaptop
{
    //public DeviceModel? DeviceModel { get; set; }
    public int OS { get; set;}
    public Guid DeviceModelId { get; set;}

    public Boolean IsChecked { get; set; }

    public int Qty { get; set; }

    public DateTime PurchasedOn { get; set; }

    public DateTime? WarrantyDate { get; set; }

    public List<String> SerialNumberList { get; set; }

    public List<String> CYGIdsList { get; set; }



    public Guid CreatedBy { get; set; }

    public DateTime CreatedAtUtc { get; set; }

    public Guid LocationId { get; set; }

    public Guid? AssignedTo { get; set; }

    public Guid Status { get; set; }

    public bool IsArchived { get; set; }
}
