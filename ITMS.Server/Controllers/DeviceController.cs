//using Microsoft.AspNetCore.Mvc;

//namespace ITMS.Server.Controllers
//{
//    // DeviceController.cs
//    [Route("api/devices")]
//    [ApiController]
//    public class DeviceController : ControllerBase
//    {
//        private readonly DeviceService _deviceService;

//        public DeviceController(DeviceService deviceService)
//        {
//            _deviceService = deviceService;
//        }

//        [HttpGet]
//        public ActionResult<IEnumerable<Device>> GetDevices()
//        {
//            var devices = _deviceService.GetDevices();
//            return Ok(devices);
//        }

//        [HttpGet("{id}")]
//        public ActionResult<Device> GetDeviceById(int id)
//        {
//            var device = _deviceService.GetDeviceById(id);
//            if (device == null)
//            {
//                return NotFound();
//            }
//            return Ok(device);
//        }

//        public IEnumerable<Device> FilterDevice(string Name, int CategoryId, int StatusId)
//        {
//            var devices = _deviceService.Filter(Name, CategoryId, StatusId);

//            return Ok(devices);
//        }

//        [HttpPost]
//        public ActionResult<Device> AddDevice(Device device)
//        {
//            _deviceService.AddDevice(device);
//            return NoContent();
//            //return CreatedAtAction(nameof(GetDeviceById), new { id = device.Id }, device);
//        }

//        [HttpPut("{id}")]
//        public IActionResult UpdateDevice(int id, Device updatedDevice)
//        {
//            updatedDevice.Id = id;
//            _deviceService.UpdateDevice(updatedDevice);
//            return NoContent();
//        }

//        [HttpDelete("{id}")]
//        public IActionResult DeleteDevice(int id)
//        {
//            _deviceService.DeleteDevice(id);
//            return NoContent();
//        }
//    }

//}
