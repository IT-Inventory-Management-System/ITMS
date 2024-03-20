using ITMS.Server.DTO;
using ITMS.Server.Models;
using ITMS.Server.Services;
using ITMS.Server.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;

namespace ITMS.Server.Controllers

{
    [ApiController]
    [Route("api/addDevices")]
    public class AddDeviceController : ControllerBase
    {
        private readonly IDeviceService _deviceService;
       // private readonly DeviceService _deviceServiceMAIN;

        public AddDeviceController(IDeviceService deviceService, DeviceService deviceServiceMAIN)
        {
            _deviceService = deviceService;
           // _deviceServiceMAIN = deviceServiceMAIN;
        }

        [Authorize]
        [HttpGet("device-models")]
        public async Task<IActionResult> GetLaptopModelsName()
        {
            var uniqueDeviceModels = await _deviceService.GetLaptopModelsAsync();
            return Ok(uniqueDeviceModels);
        }


        [Authorize]
        [HttpPost]
        public ActionResult PutLaptops([FromBody] PutLaptop pLaptop)
        {
            try
            {
                _deviceService.AddDevice(pLaptop);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }


        //[HttpPost("one-time-add-devices")]
        //public async Task<ActionResult> OneTimeAddDevice([FromBody] List<OneTimeAddDeviceDTO> detailsList)
        //{
        //    try
        //    {
        //        List<OneTimeAddDeviceDTO> uniqueDevices = await _deviceServiceMAIN.GetUnique(detailsList);
        //        await _deviceServiceMAIN.PutSingleDeviceModel(uniqueDevices);

        //        List<OneTimeAddDeviceDTO> devicelogsToBeSaved = new List<OneTimeAddDeviceDTO>();

        //        foreach (var d in detailsList)
        //        {
        //            if (!string.IsNullOrEmpty(d.DeviceLog))
        //            {
        //                devicelogsToBeSaved.Add(d);
        //            }
        //        }

        //        List<OneTimeAddDeviceDTO> failedLogs = await _deviceServiceMAIN.PutSingleDevice_DeviceLog(devicelogsToBeSaved);

        //        return Ok(uniqueDevices);
        //    }
        //    catch (Exception e)
        //    {
        //        return BadRequest(e.Message);
        //    }
        //}




        [Authorize]
        [HttpPost("update")]
        public ActionResult PutDeviceModel([FromBody] PutDeviceModel model)
        {
            try
            {
                _deviceService.AddDeviceModel(model);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [Authorize]
        [HttpGet("software-models")]
        public async Task<IActionResult> GetSoftwareModelsName()
        {
            var uniqueSoftwareModels = await _deviceService.GetSoftwareModelsAsync();
            return Ok(uniqueSoftwareModels);
        }



        [Authorize]
        [HttpPost("add-software")]
        public ActionResult PutSoftware([FromBody] PutSoftware software)
        {
            try
            {
                _deviceService.AddSoftware(software);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [Authorize]
        [HttpPost("add-software-allocation")]
        public ActionResult PutSoftwareAllocation([FromBody] PutSofwareAllocation softwareAllocation)
        {
            try
            {
                _deviceService.AddSoftwareAllocation(softwareAllocation);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }

        }

        [Authorize]
        [HttpPost("AddMouseModel")]
        public ActionResult AddMouseModel([FromBody] PostMouseModelDTO mouseModel)
        {
            try
            {
                _deviceService.AddMouseModel(mouseModel);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [Authorize]
        [HttpPost("AddMouse")]
        public ActionResult AddMouse([FromBody] PostMouseDTO mouseModel)
        {
            try
            {
                _deviceService.AddMouse(mouseModel);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [Authorize]
        [HttpPost("AddMonitor")]
        public ActionResult AddMonitor([FromBody] PostMonitorDTO postMonitorDTO)
        {
            try
            {
                _deviceService.AddMonitor(postMonitorDTO);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [Authorize]
        [HttpPost("AddCommonDevice")]
        public ActionResult AddCommon([FromBody] CommonDeviceDTO commonDeviceDTO)
        {
            try
            {
                _deviceService.AddCommon(commonDeviceDTO);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }


    }
}
