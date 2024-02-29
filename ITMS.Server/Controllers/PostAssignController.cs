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

                if (!string.IsNullOrEmpty(postAssignAssetDTO.DeviceCYGID) && !string.IsNullOrEmpty(postAssignAssetDTO.SoftwareId) && !string.IsNullOrEmpty(postAssignAssetDTO.AccessoryCYGID))
                {
                    await _postAssignAsset.UpdateDeviceAsync(postAssignAssetDTO.DeviceCYGID, postAssignAssetDTO);

                    var device = await _deviceService.CheckDeviceStatus(postAssignAssetDTO.DeviceCYGID);
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

                    var deviceLogID = await _postAssignAsset.GetLatestDeviceLogId(deviceId);


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

                        var Comments = await _postAssignAsset.ListComment(deviceLogID);
                        var commentID = Comments.FirstOrDefault().Id;
                        await _postAssignAsset.UpdateCommentIDLogAsync(deviceLogID, commentID);
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

                    var SoftwareLogID = await _postAssignAsset.GetLatestDeviceLogId(softwareId);
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

                        var Comments = await _postAssignAsset.ListComment(SoftwareLogID);
                        var commentID = Comments.FirstOrDefault().Id;

                        await _postAssignAsset.UpdateCommentIDLogAsync(SoftwareLogID, commentID);

                    }

                    await _postAssignAsset.UpdateDeviceAsync(postAssignAssetDTO.AccessoryCYGID, postAssignAssetDTO);

                    var accessory = await _deviceService.CheckDeviceStatus(postAssignAssetDTO.AccessoryCYGID);
                    var accessoryId = accessory.FirstOrDefault().Id;
                    PostDeviceLogDTO postAccessoryLogDTO = new PostDeviceLogDTO()
                    {
                        DeviceId = accessoryId,
                        EmployeeId = postAssignAssetDTO.AssignedTo,
                        AssignedBy = postAssignAssetDTO.AssignedBy,
                        CreatedBy = postAssignAssetDTO.AssignedBy,
                        UpdatedBy = postAssignAssetDTO.AssignedBy,
                    };
                    await _postAssignAsset.UpdateDeviceLogAsync(postAccessoryLogDTO);

                    var accessorydeviceLogID = await _postAssignAsset.GetLatestDeviceLogId(accessoryId);


                    if (!string.IsNullOrEmpty(postAssignAssetDTO.AccessoryComment))
                    {
                        PostCommentDTO accessoryCommentDTO = new PostCommentDTO()
                        {
                            Description = postAssignAssetDTO.AccessoryComment,
                            DeviceId = accessoryId,
                            CreatedBy = postAssignAssetDTO.AssignedBy,
                            DevicelogId = accessorydeviceLogID
                        };

                        await _postAssignAsset.UpdateDeviceComment(accessoryCommentDTO);

                        var Comments = await _postAssignAsset.ListComment(accessorydeviceLogID);
                        var commentID = Comments.FirstOrDefault().Id;
                        await _postAssignAsset.UpdateCommentIDLogAsync(accessorydeviceLogID, commentID);
                    }

                    return Results.Ok("Device, Software and accessories allocated successfully");

                }
                else if(!string.IsNullOrEmpty(postAssignAssetDTO.DeviceCYGID) && !string.IsNullOrEmpty(postAssignAssetDTO.SoftwareId)) {
                    await _postAssignAsset.UpdateDeviceAsync(postAssignAssetDTO.DeviceCYGID, postAssignAssetDTO);

                    var device = await _deviceService.CheckDeviceStatus(postAssignAssetDTO.DeviceCYGID);
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

                    var deviceLogID = await _postAssignAsset.GetLatestDeviceLogId(deviceId);


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

                        var Comments = await _postAssignAsset.ListComment(deviceLogID);
                        var commentID = Comments.FirstOrDefault().Id;
                        await _postAssignAsset.UpdateCommentIDLogAsync(deviceLogID, commentID);
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

                    var SoftwareLogID = await _postAssignAsset.GetLatestDeviceLogId(softwareId);
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

                        var Comments = await _postAssignAsset.ListComment(SoftwareLogID);
                        var commentID = Comments.FirstOrDefault().Id;

                        await _postAssignAsset.UpdateCommentIDLogAsync(SoftwareLogID, commentID);

                    }

                   
                    return Results.Ok("Device and Software allocated successfully");
                }
                else if (!string.IsNullOrEmpty(postAssignAssetDTO.DeviceCYGID) && !string.IsNullOrEmpty(postAssignAssetDTO.AccessoryCYGID)) {
                    await _postAssignAsset.UpdateDeviceAsync(postAssignAssetDTO.DeviceCYGID, postAssignAssetDTO);

                    var device = await _deviceService.CheckDeviceStatus(postAssignAssetDTO.DeviceCYGID);
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

                    var deviceLogID = await _postAssignAsset.GetLatestDeviceLogId(deviceId);


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

                        var Comments = await _postAssignAsset.ListComment(deviceLogID);
                        var commentID = Comments.FirstOrDefault().Id;
                        await _postAssignAsset.UpdateCommentIDLogAsync(deviceLogID, commentID);
                    }


                    await _postAssignAsset.UpdateDeviceAsync(postAssignAssetDTO.AccessoryCYGID, postAssignAssetDTO);

                    var accessory = await _deviceService.CheckDeviceStatus(postAssignAssetDTO.AccessoryCYGID);
                    var accessoryId = accessory.FirstOrDefault().Id;
                    PostDeviceLogDTO postAccessoryLogDTO = new PostDeviceLogDTO()
                    {
                        DeviceId = accessoryId,
                        EmployeeId = postAssignAssetDTO.AssignedTo,
                        AssignedBy = postAssignAssetDTO.AssignedBy,
                        CreatedBy = postAssignAssetDTO.AssignedBy,
                        UpdatedBy = postAssignAssetDTO.AssignedBy,
                    };
                    await _postAssignAsset.UpdateDeviceLogAsync(postAccessoryLogDTO);

                    var accessorydeviceLogID = await _postAssignAsset.GetLatestDeviceLogId(accessoryId);


                    if (!string.IsNullOrEmpty(postAssignAssetDTO.AccessoryComment))
                    {
                        PostCommentDTO accessoryCommentDTO = new PostCommentDTO()
                        {
                            Description = postAssignAssetDTO.AccessoryComment,
                            DeviceId = accessoryId,
                            CreatedBy = postAssignAssetDTO.AssignedBy,
                            DevicelogId = accessorydeviceLogID
                        };

                        await _postAssignAsset.UpdateDeviceComment(accessoryCommentDTO);

                        var Comments = await _postAssignAsset.ListComment(accessorydeviceLogID);
                        var commentID = Comments.FirstOrDefault().Id;
                        await _postAssignAsset.UpdateCommentIDLogAsync(accessorydeviceLogID, commentID);
                    }

                    return Results.Ok("Device and accessories allocated successfully");
                }
                else if (!string.IsNullOrEmpty(postAssignAssetDTO.AccessoryCYGID) && !string.IsNullOrEmpty(postAssignAssetDTO.SoftwareId)) {
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

                    var SoftwareLogID = await _postAssignAsset.GetLatestDeviceLogId(softwareId);
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

                        var Comments = await _postAssignAsset.ListComment(SoftwareLogID);
                        var commentID = Comments.FirstOrDefault().Id;

                        await _postAssignAsset.UpdateCommentIDLogAsync(SoftwareLogID, commentID);

                    }

                    await _postAssignAsset.UpdateDeviceAsync(postAssignAssetDTO.AccessoryCYGID, postAssignAssetDTO);

                    var accessory = await _deviceService.CheckDeviceStatus(postAssignAssetDTO.AccessoryCYGID);
                    var accessoryId = accessory.FirstOrDefault().Id;
                    PostDeviceLogDTO postAccessoryLogDTO = new PostDeviceLogDTO()
                    {
                        DeviceId = accessoryId,
                        EmployeeId = postAssignAssetDTO.AssignedTo,
                        AssignedBy = postAssignAssetDTO.AssignedBy,
                        CreatedBy = postAssignAssetDTO.AssignedBy,
                        UpdatedBy = postAssignAssetDTO.AssignedBy,
                    };
                    await _postAssignAsset.UpdateDeviceLogAsync(postAccessoryLogDTO);

                    var accessorydeviceLogID = await _postAssignAsset.GetLatestDeviceLogId(accessoryId);


                    if (!string.IsNullOrEmpty(postAssignAssetDTO.AccessoryComment))
                    {
                        PostCommentDTO accessoryCommentDTO = new PostCommentDTO()
                        {
                            Description = postAssignAssetDTO.AccessoryComment,
                            DeviceId = accessoryId,
                            CreatedBy = postAssignAssetDTO.AssignedBy,
                            DevicelogId = accessorydeviceLogID
                        };

                        await _postAssignAsset.UpdateDeviceComment(accessoryCommentDTO);

                        var Comments = await _postAssignAsset.ListComment(accessorydeviceLogID);
                        var commentID = Comments.FirstOrDefault().Id;
                        await _postAssignAsset.UpdateCommentIDLogAsync(accessorydeviceLogID, commentID);
                    }

                    return Results.Ok("Software and accessories allocated successfully");
                }
                else if (!string.IsNullOrEmpty(postAssignAssetDTO.DeviceCYGID))
                {
                    await _postAssignAsset.UpdateDeviceAsync(postAssignAssetDTO.DeviceCYGID, postAssignAssetDTO);

                    var device = await _deviceService.CheckDeviceStatus(postAssignAssetDTO.DeviceCYGID);
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

                    var deviceLogID = await _postAssignAsset.GetLatestDeviceLogId(deviceId);

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
                        var Comments = await _postAssignAsset.ListComment(deviceLogID);
                        var commentID = Comments.FirstOrDefault().Id;

                        await _postAssignAsset.UpdateCommentIDLogAsync(deviceLogID, commentID);
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

                    var SoftwareLogID = await _postAssignAsset.GetLatestDeviceLogId(softwareId);

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

                        var Comments = await _postAssignAsset.ListComment(SoftwareLogID);
                        var commentID = Comments.FirstOrDefault().Id;

                        await _postAssignAsset.UpdateCommentIDLogAsync(SoftwareLogID, commentID);
                    }
                    return Results.Ok("Software allocated successfully");
                }
                else if (!string.IsNullOrEmpty(postAssignAssetDTO.AccessoryCYGID))
                {
                    await _postAssignAsset.UpdateDeviceAsync(postAssignAssetDTO.AccessoryCYGID, postAssignAssetDTO);

                    var accessory = await _deviceService.CheckDeviceStatus(postAssignAssetDTO.AccessoryCYGID);
                    var accessoryId = accessory.FirstOrDefault().Id;
                    PostDeviceLogDTO postAccessoryLogDTO = new PostDeviceLogDTO()
                    {
                        DeviceId = accessoryId,
                        EmployeeId = postAssignAssetDTO.AssignedTo,
                        AssignedBy = postAssignAssetDTO.AssignedBy,
                        CreatedBy = postAssignAssetDTO.AssignedBy,
                        UpdatedBy = postAssignAssetDTO.AssignedBy,
                    };
                    await _postAssignAsset.UpdateDeviceLogAsync(postAccessoryLogDTO);

                    var accessorydeviceLogID = await _postAssignAsset.GetLatestDeviceLogId(accessoryId);


                    if (!string.IsNullOrEmpty(postAssignAssetDTO.AccessoryComment))
                    {
                        PostCommentDTO accessoryCommentDTO = new PostCommentDTO()
                        {
                            Description = postAssignAssetDTO.AccessoryComment,
                            DeviceId = accessoryId,
                            CreatedBy = postAssignAssetDTO.AssignedBy,
                            DevicelogId = accessorydeviceLogID
                        };

                        await _postAssignAsset.UpdateDeviceComment(accessoryCommentDTO);

                        var Comments = await _postAssignAsset.ListComment(accessorydeviceLogID);
                        var commentID = Comments.FirstOrDefault().Id;
                        await _postAssignAsset.UpdateCommentIDLogAsync(accessorydeviceLogID, commentID);
                    }
                    return Results.Ok("Accessories allocated successfully");

                }
                else
                {
                    return Results.BadRequest("Please provide at least one ID (CGYID or SoftwareId or AccesoryID)");
                }
            }
            catch (Exception ex)
            {
                return Results.BadRequest(ex.Message);
            }
        }

    }
}