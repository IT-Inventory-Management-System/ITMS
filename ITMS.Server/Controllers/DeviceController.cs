using Microsoft.AspNetCore.Mvc;
using ITMS.Server.Services;
using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using ITMS.Server.Models;
using ITMS.Server.DTO;
using static Azure.Core.HttpHeader;
using System.Runtime.InteropServices; 
using Microsoft.AspNetCore.Authorization;



namespace itms.server.controllers
{
    // devicecontroller.cs
    [Route("api/Device")]
    [ApiController]
    public class DeviceController : ControllerBase
    {
        private readonly DeviceService _deviceService;
        private readonly IGetDeviceService _getDeviceService;

        public DeviceController(DeviceService deviceService, IGetDeviceService getDeviceService)
        {
            _deviceService = deviceService;
            _getDeviceService = getDeviceService;
        }

        [Authorize]
        [HttpGet("getDevicess/{locationId}")]
        public List<GetDeviceDTO> listDevices(Guid locationId)
        {
            return _getDeviceService.listDevices(locationId);
        }

        [Authorize]
        [HttpGet("getAllComments/{deviceId}")]
        public async Task<IEnumerable<getComments>> listAllComments(Guid deviceId)
        {
            return await _getDeviceService.listAllComments(deviceId);
        }

        [Authorize]
        [HttpGet("checkDeviceStatus")]
        public async Task<IActionResult> checkDeviceStatus(string CYGID)
        {
            var result = await _getDeviceService.CheckDeviceStatus(CYGID);
            if (result.FirstOrDefault().AssignedTo == null)
            {
                return Ok(CYGID + " Not Assigned");
            }
            else
            {
                return BadRequest(CYGID + " Already Assigned");
            }

        }

        [Authorize]
        [HttpGet("categories")]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            try
            {
                var categories = await _deviceService.GetCategoriesAsync();
                return Ok(categories);
            }
            catch (Exception ex)
            {

                return StatusCode(500, "internal server error");
            }
        }


        [Authorize]
        [HttpGet("{deviceId}")]
        public async Task<ActionResult<DeviceDto>> GetDeviceStatusAndAge(string deviceId)
        {
            try
            {
                var deviceDto = await _deviceService.GetDeviceStatusAndAgeAsync(deviceId);

                if (deviceDto == null)
                    return NotFound();

                return Ok(deviceDto);
            }
            catch (Exception ex)
            {

                return StatusCode(500, "Internal Server Error");
            }
        }

        [Authorize]
        [HttpGet("GetDevices/{id}")]
        public IActionResult GetDevices(Guid id)
        {
            try
            {
                var devices = _deviceService.GetDevices(id);
                return Ok(devices);
            }
            catch (Exception ex)
            {

                return StatusCode(500, "Internal Server Error");
            }
        }

        [Authorize]
        [HttpGet("archived-cygids/{locationId}")]
        public async Task<IActionResult> GetDeviceHistory(Guid locationId)
        {
            try
            {
                var deviceHistory = await _deviceService.GetArchivedCygIdsAsync(locationId);
                return Ok(deviceHistory);
            }
            catch (Exception ex)
            {

                return StatusCode(500, "Internal Server Error");
            }
        }

        [Authorize]
        [HttpGet("get-ostype")]
        public ActionResult<IEnumerable<Ostype>> GetOstypes()
        {
            var getos = _deviceService.GetOstypes();
            return Ok(getos);
        }

        [Authorize]
        [HttpGet("get-location")]
        public ActionResult<IEnumerable<Location>> Getlocation()
        {
            var getLocation = _deviceService.Getlocation();
            return Ok(getLocation);
        }

        [Authorize]
        [HttpGet("get-status")]
        public ActionResult<IEnumerable<Location>> GetStatus()
        {
            var statusList = _deviceService.GetStatus();
            return Ok(statusList);
        }

        [Authorize]
        [HttpGet("get-unique-processors")]
        public ActionResult<IEnumerable<ProcessorDto>> GetUniqueProcessors()
        {
            var processors = _deviceService.GetUniqueProcessors();
            return Ok(processors);
        }


        [Authorize]
        [HttpPost("updateDeviceStatus")]
        public async Task<IActionResult> UpdateDeviceStatus([FromBody] ArchivedoneDto archiveDto)
        {
            try
            {
                var result = await _deviceService.UpdateDeviceStatusToDiscarded(archiveDto);

                if (result)
                {
                    return Ok(result);
                }
                else
                {
                    return Ok();
                }
            }
            catch (Exception ex)
            {
                // Log or handle the exception as needed
                return BadRequest(ex);
            }
        }

        [Authorize]
        [HttpPost("updateDeviceStatustoNotassigned")]
        public async Task<IActionResult> UpdateDeviceStatustoNotassigned([FromBody] ArchivedoneDto archiveDto)
        {
            try
            {
                var result = await _deviceService.UpdateDeviceStatusToNotAssigned(archiveDto);

                if (result)
                {
                    return Ok(result);
                }
                else
                {
                    return NotFound($"Device with cygid {archiveDto.Cygid} not found or status update failed.");
                }
            }
            catch (Exception ex)
            {
                // Log or handle the exception as needed
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [Authorize]
        [HttpPost("DeviceModels")]
        public async Task<IActionResult> GetDeviceModels([FromBody] DeviceModelInputDTO deviceModelInput)
        {
            var deviceModelId = Guid.Parse(deviceModelInput.deviceModelId);
            var locationId = Guid.Parse(deviceModelInput.locationId);

            try
            {
                var deviceHistory = await _deviceService.GetDeviceModels(deviceModelId, locationId);
                return Ok(deviceHistory);
            }
            catch (Exception ex)
            {

                return StatusCode(500, "Internal Server Error");
            }
        }

        [Authorize]
        [HttpPost("getAllAccessories")]
        public List<allAccessoriesDTO> GetAllAccessories([FromBody] locationaccesoryDTO dto)
        {
            List<allAccessoriesDTO> allData = _deviceService.GetAllAccessories(dto.locationId);
            if (dto.IsArchived == true)
            {
                allData = allData.Where(d => d.IsArchived == true).ToList();
            }
            return allData;
        }

        [Authorize]
        [HttpPost("filterAccessories")]
        public List<allAccessoriesDTO> FilterAccessories(filterAccessoriesBodyDTO filter)
        {
            locationaccesoryDTO getData = new locationaccesoryDTO()
            {
                locationId = filter.location,
                IsArchived = filter.IsArchived,
            };
            List<allAccessoriesDTO> allData = GetAllAccessories(getData);

            return _deviceService.GetFilterAccessories(allData, filter);
        }

        [Authorize]
        [HttpPost("singleHistoryAccessory")]
        public List<historySingleAccessory> singleHistoryAccessory([FromBody] locationaccesoryDTO dto)
        {
            List<historySingleAccessory> history = _deviceService.singleHistory(dto.locationId, dto.CYGID);

            return history;
        }

        [Authorize]
        [HttpPost("filterDevices")]
        public List<GetDeviceDTO> FiltterCard([FromBody] FilterDTO filterInput)
        {

            List<GetDeviceDTO> filterDevices = listDevices(filterInput.locationId);
            filterDevices = filterDevices.Where(d =>
            (filterInput.deviceStatus.Count == 0|| filterInput.deviceStatus.Contains(d.Status)) &&
            (filterInput.operatingSystem.Count == 0|| filterInput.operatingSystem.Contains(d.Os)) &&
            (filterInput.uniqueProcessor.Count == 0 || filterInput.uniqueProcessor.Contains(d.Processor)) &&
            (filterInput.fromDate == null || ((DateOnly.FromDateTime((DateTime)d.PurchasedDate) >= filterInput.fromDate))) &&
            (filterInput.toDate == null ||  ((DateOnly.FromDateTime((DateTime)d.PurchasedDate) <= filterInput.toDate)))
            ).ToList();

            return filterDevices;
        }

        [Authorize]
        [HttpPost("unassignableDevice")]
        public async Task<IActionResult> setDeviceUnassignable([FromBody] UnassignableDto unassignableDto)
        {
            try
            {
                var result = await _deviceService.UpdateDeviceStatusToUnassignable(unassignableDto);

                if (result)
                {
                    return Ok(result);
                }
                else
                {
                    return Ok();
                }
            }
            catch (Exception ex)
            {
                // Log or handle the exception as needed
                return BadRequest(ex);
            }
        }

        [Authorize]
        [HttpPost("addAccessoryBrand")]
        public async Task<IActionResult> addAccessoryBrand([FromBody] DeviceModelInputDto deviceModelInputDto)
        {
            try
            {
                await _deviceService.UpdateDeviceLogAsync(deviceModelInputDto);
                return Ok("Brands successfully added");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error" + ex);
            }
           

        }

        [HttpPost("one-time-add-devices")]
        public async Task<ActionResult> OneTimeAddDevice(List<OneTimeAddDeviceDTO> detailsList)
        {
            var failedItemsAll = new Dictionary<string, List<OneTimeAddDeviceDTO>>();
            try
            {
                List<OneTimeAddDeviceDTO> newListForDevicesModel = new List<OneTimeAddDeviceDTO>();
                foreach (var item in detailsList)
                {
                    if (!string.IsNullOrEmpty(item.FullDeviceName))
                    {
                        newListForDevicesModel.Add(item);
                    }
                }

                List<OneTimeAddDeviceDTO> uniqueDevices = await _deviceService.GetUnique(newListForDevicesModel);
                List<OneTimeAddDeviceDTO> failedModels = await _deviceService.PutSingleDeviceModel(uniqueDevices);
                //failedItemsAll.AddRange(failedModels);
                failedItemsAll.Add("DeviceModel", failedModels);

                List<OneTimeAddDeviceDTO> newListForDevice = newListForDevicesModel.Except(failedModels).ToList();

                List<OneTimeAddDeviceDTO> failedItems = await _deviceService.importDeviceData(newListForDevice);
                //failedItemsAll.AddRange(failedItems);
                failedItemsAll.Add("Device", failedItems);

                List<OneTimeAddDeviceDTO> newListForDevicesLogs = newListForDevicesModel.Except(failedItems).ToList();

                List<OneTimeAddDeviceDTO> devicelogsToBeSaved = new List<OneTimeAddDeviceDTO>();

                foreach (var d in newListForDevicesLogs)
                {
                    if (!string.IsNullOrEmpty(d.DeviceLog))
                    {
                        devicelogsToBeSaved.Add(d);
                    }
                }

                List<OneTimeAddDeviceDTO> failedLogs = await _deviceService.PutSingleDevice_DeviceLog(devicelogsToBeSaved);
                //failedItemsAll.AddRange(failedLogs);
                failedItemsAll.Add("DeviceLogs", failedLogs);

                return Ok(failedItemsAll);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("importDeviceData")]
        public async Task<List<OneTimeAddDeviceDTO>> importDevice([FromBody] List<OneTimeAddDeviceDTO> importDeviceInput)
        {
            return await _deviceService.importDeviceData(importDeviceInput);
        }
    }

}
