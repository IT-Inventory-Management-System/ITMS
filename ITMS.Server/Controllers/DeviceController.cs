
using Microsoft.AspNetCore.Mvc;
using ITMS.Server.Services;
using ITMS.Server.DTO;
using Microsoft.AspNetCore.Components;
using System.Web.Http;
using Prism.Services;
using System.Web.Mvc;
using ControllerBase = Microsoft.AspNetCore.Mvc.ControllerBase;
using System.Threading.Tasks;
using System.Collections.Generic;
using ITMS.Server.Models;
using Microsoft.AspNetCore.Http.HttpResults;

namespace itms.server.controllers
{
    // devicecontroller.cs
    [Microsoft.AspNetCore.Components.Route("api/devices")]
    [ApiController]
    public class Devicecontroller : ControllerBase
    {
        private readonly DeviceService _deviceservice;

        public Devicecontroller(DeviceService deviceservice)
        {
            _deviceservice = deviceservice;
        }




        [Microsoft.AspNetCore.Mvc.HttpGet("api/devices/categories")]
        public async Task<ActionResult<IEnumerable<Category>>> getcategories()
        {
            try
            {
                var categories = await _deviceservice.GetCategoriesAsync();
                return Ok(categories);
            }
            catch (Exception ex)
            {
                // log the exception
                return StatusCode(500, "internal server error");
            }
        }
      
            [Microsoft.AspNetCore.Mvc.HttpGet("api/devices/{deviceId}")]
            public ActionResult<DeviceDto> GetDeviceStatusAndAge(string deviceId)
            {
                var deviceDto = _deviceservice.GetDeviceStatusAndAge(deviceId);

                if (deviceDto == null)
                    return NotFound();

                return Ok(deviceDto);
            }
        }
    }





