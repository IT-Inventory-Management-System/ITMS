using ITMS.Server.DTO;
using ITMS.Server.Models;
using ITMS.Server.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ITMS.Server.Controllers
{
    [Route("api/addDevice")]
    [ApiController]
    public class AddDeviceController : ControllerBase
    {
        private readonly AddDeviceService _deviceService;

        public AddDeviceController(AddDeviceService deviceService)
        {
            _deviceService = deviceService;
        }

        [HttpGet]
        public ActionResult Get()
        {
            return Ok("tess");
        }


        [HttpPost]
        public ActionResult PutLaptops([FromBody] PutLaptop putLaptop)
        {
            try
            {
                //if (putLaptop.IsChecked)
                //{
                //    DeviceModel deviceModel = new DeviceModel();
                //    deviceModel = putLaptop.DeviceModel;
                //    _deviceService.AddDeviceModel(deviceModel);
                //}

                //putLaptopServiceDto putLaptopDesc = new putLaptopServiceDto();
                //putLaptopDesc.CYGIdsList = putLaptop.CYGIdsList;
                //putLaptopDesc.SerialNumberList = putLaptop.SerialNumberList;
                //putLaptopDesc.OS = putLaptop.OS;
                //putLaptopDesc.Qty = putLaptop.Qty;
                //putLaptopDesc.PurchasedOn = putLaptop.PurchasedOn;
                //putLaptopDesc.WarrantyDate = putLaptop.WarrantyDate;
                //putLaptopDesc.DeviceModelId = putLaptop.DeviceModelId;
                //putLaptopDesc.AssignedTo = putLaptop.AssignedTo;
                //putLaptopDesc.CreatedBy = putLaptop.CreatedBy;
                //putLaptopDesc.CreatedAtUtc = putLaptop.CreatedAtUtc;
                //putLaptopDesc.Status = putLaptop.Status;
                //putLaptopDesc.IsArchived = putLaptop.IsArchived;


                _deviceService.AddDevice(putLaptop);
                return Ok("Success");
                //return CreatedAtAction(nameof(GetDeviceById), new { id = device.Id }, device);
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        public ActionResult PutDeviceModel([FromBody] DeviceModel model)
        {
            try
            {
                _deviceService.AddDeviceModel(model);
                return Ok("Created");
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
    }
}
