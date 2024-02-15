using ITMS.Server.Models;
using ITMS.Server.Services;
using ITMS.Server.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Elfie.Serialization;
using Xamarin.Forms;
namespace ITMS.Server.Controllers
{
    [ApiController]
    [Route("api/add")]
    public class PostAssignController : ControllerBase
    {
        private readonly ItinventorySystemContext _context;
        private readonly IPostAssignAsset _postAssignAsset;
        private readonly IGetDeviceService _deviceService;
        private readonly IGetSoftwareService _softwareService;
        public PostAssignController(ItinventorySystemContext context, IPostAssignAsset postAssignAsset, IGetDeviceService deviceService, IGetSoftwareService softwareService)
        {
            _context = context;
            _postAssignAsset = postAssignAsset;
            _deviceService = deviceService;
            _softwareService = softwareService;
        }

        [HttpPost("assignAsset")]
        public async Task<IResult> AssignAsset([FromBody] PostAssignAssetDTO postAssignAssetDTO)
        {
            try
            {
                if (postAssignAssetDTO == null)
                {
                    return Results.BadRequest("Invalid allocation request");
                }

                if (!string.IsNullOrEmpty(postAssignAssetDTO.CYGID) && !string.IsNullOrEmpty(postAssignAssetDTO.SoftwareId))
                {
                    await _postAssignAsset.UpdateDeviceAsync(postAssignAssetDTO.CYGID, postAssignAssetDTO);

                    var device = await _deviceService.CheckDeviceStatus(postAssignAssetDTO.CYGID);
                    var deviceId = device.FirstOrDefault().Id;
                    PostDeviceLogDTO postDeviceLogDTO = new PostDeviceLogDTO()
                    {
                        DeviceId = deviceId,
                        EmployeeId = postAssignAssetDTO.AssignedTo,
                        AssignedBy = postAssignAssetDTO.AssignedBy,
                        CreatedBy = postAssignAssetDTO.AssignedBy,
                        UpdatedBy = postAssignAssetDTO.AssignedBy,
                    };
                    await _postAssignAsset.UpdateDeviceLogAsync(postDeviceLogDTO);

                    var LogDeviceResult = await _postAssignAsset.ListDeviceLog(deviceId);
                    var deviceLogID = LogDeviceResult.FirstOrDefault().Id;

                    if (!string.IsNullOrEmpty(postAssignAssetDTO.DeviceComment))
                    {
                        PostCommentDTO deviceCommentDTO = new PostCommentDTO()
                        {
                            Description = postAssignAssetDTO.DeviceComment,
                            DeviceId = deviceId,
                            CreatedBy = postAssignAssetDTO.AssignedBy,
                            DevicelogId = deviceLogID
                        };

                        await _postAssignAsset.UpdateDeviceComment(deviceCommentDTO);
                    }


                    await _postAssignAsset.UpdateSoftwareAsync(postAssignAssetDTO.SoftwareId, postAssignAssetDTO);

                    var software = await _softwareService.getSoftwareAllocationId(postAssignAssetDTO.SoftwareId);
                    var softwareId = software.FirstOrDefault().Id;

                    PostDeviceLogDTO postSoftwareLogDTO = new PostDeviceLogDTO()
                    {
                        SoftwareAllocationId = softwareId,
                        EmployeeId = postAssignAssetDTO.AssignedTo,
                        AssignedBy = postAssignAssetDTO.AssignedBy,
                        CreatedBy = postAssignAssetDTO.AssignedBy,
                        UpdatedBy = postAssignAssetDTO.AssignedBy,
                    };

                    await _postAssignAsset.UpdateSoftwareLogAsync(postSoftwareLogDTO);

                    var LogSoftwareResult = await _postAssignAsset.ListDeviceLog(softwareId);
                    var SoftwareLogID = LogSoftwareResult.FirstOrDefault().Id;

                    if (!string.IsNullOrEmpty(postAssignAssetDTO.SoftwareComment))
                    {
                        PostCommentDTO softwareCommentDTO = new PostCommentDTO()
                        {
                            Description = postAssignAssetDTO.SoftwareComment,
                            SoftwareAllocationId = softwareId,
                            CreatedBy = postAssignAssetDTO.AssignedBy,
                            DevicelogId = SoftwareLogID
                        };

                        await _postAssignAsset.UpdateSoftwareComment(softwareCommentDTO);
                    }

                    return Results.Ok("Device and Software allocated successfully");

                }
                else if (!string.IsNullOrEmpty(postAssignAssetDTO.CYGID))
                {
                    await _postAssignAsset.UpdateDeviceAsync(postAssignAssetDTO.CYGID, postAssignAssetDTO);

                    var device = await _deviceService.CheckDeviceStatus(postAssignAssetDTO.CYGID);
                    var deviceId = device.FirstOrDefault().Id;

                    PostDeviceLogDTO postDeviceLogDTO = new PostDeviceLogDTO()
                    {
                        DeviceId = deviceId,
                        EmployeeId = postAssignAssetDTO.AssignedTo,
                        AssignedBy = postAssignAssetDTO.AssignedBy,
                        CreatedBy = postAssignAssetDTO.AssignedBy,
                        UpdatedBy = postAssignAssetDTO.AssignedBy,
                    };

                    await _postAssignAsset.UpdateDeviceLogAsync(postDeviceLogDTO);

                    var LogDeviceResult = await _postAssignAsset.ListDeviceLog(deviceId);
                    var deviceLogID = LogDeviceResult.FirstOrDefault().Id;

                    if (!string.IsNullOrEmpty(postAssignAssetDTO.DeviceComment))
                    {
                        PostCommentDTO deviceCommentDTO = new PostCommentDTO()
                        {
                            Description = postAssignAssetDTO.DeviceComment,
                            DeviceId = deviceId,
                            CreatedBy = postAssignAssetDTO.AssignedBy,
                            DevicelogId = deviceLogID
                        };

                        await _postAssignAsset.UpdateDeviceComment(deviceCommentDTO);
                    }

                    return Results.Ok("Device allocated successfully");
                }
                else if (!string.IsNullOrEmpty(postAssignAssetDTO.SoftwareId))
                {
                    await _postAssignAsset.UpdateSoftwareAsync(postAssignAssetDTO.SoftwareId, postAssignAssetDTO);

                    var software = await _softwareService.getSoftwareAllocationId(postAssignAssetDTO.SoftwareId);
                    var softwareId = software.FirstOrDefault().Id;

                    PostDeviceLogDTO postSoftwareLogDTO = new PostDeviceLogDTO()
                    {
                        SoftwareAllocationId = softwareId,
                        EmployeeId = postAssignAssetDTO.AssignedTo,
                        AssignedBy = postAssignAssetDTO.AssignedBy,
                        CreatedBy = postAssignAssetDTO.AssignedBy,
                        UpdatedBy = postAssignAssetDTO.AssignedBy,
                    };

                    await _postAssignAsset.UpdateDeviceLogAsync(postSoftwareLogDTO);

                    var LogSoftwareResult = await _postAssignAsset.ListDeviceLog(softwareId);
                    var SoftwareLogID = LogSoftwareResult.FirstOrDefault().Id;

                    if (!string.IsNullOrEmpty(postAssignAssetDTO.SoftwareComment))
                    {
                        PostCommentDTO softwareCommentDTO = new PostCommentDTO()
                        {
                            Description = postAssignAssetDTO.SoftwareComment,
                            SoftwareAllocationId = softwareId,
                            CreatedBy = postAssignAssetDTO.AssignedBy,
                            DevicelogId = SoftwareLogID
                        };

                        await _postAssignAsset.UpdateSoftwareComment(softwareCommentDTO);
                    }
                    return Results.Ok("Software allocated successfully");
                }
                else
                {
                    return Results.BadRequest("Please provide at least one ID (CGYID or SoftwareId)");
                }
            }
            catch (Exception ex)
            {
                return Results.BadRequest(ex.Message);
            }
        }

    }
}