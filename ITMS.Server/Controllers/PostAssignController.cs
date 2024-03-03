using ITMS.Server.Models;
using ITMS.Server.Services;
using ITMS.Server.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Elfie.Serialization;
using Xamarin.Forms;
using System;

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
        public async Task<IActionResult> AssignAsset([FromBody] PostAssignAssetDTO postAssignAssetDTO)
        {
            try
            {
                if (postAssignAssetDTO == null ||
                (
                    postAssignAssetDTO.DeviceCYGIDs?.Count == 0 &&
                    postAssignAssetDTO.SoftwareIds?.Count == 0 &&
                    postAssignAssetDTO.AccessoryCYGIDs?.Count == 0
                 ))
                {
                    return BadRequest("Invalid request. The provided DTO is empty.");
                }
                int a = postAssignAssetDTO.DeviceCYGIDs.Count;
                int b = postAssignAssetDTO.SoftwareIds.Count;
                int c = postAssignAssetDTO.AccessoryCYGIDs.Count;

                for (int i = 0; i < a; i++)
                {
                    if (!string.IsNullOrEmpty(postAssignAssetDTO.DeviceCYGIDs[i]))
                    {
                        await _postAssignAsset.UpdateDeviceAsync(postAssignAssetDTO.DeviceCYGIDs[i], postAssignAssetDTO);

                        var device = await _deviceService.CheckDeviceStatus(postAssignAssetDTO.DeviceCYGIDs[i]);
                        var deviceId = device.FirstOrDefault()?.Id;

                        if (deviceId.HasValue)
                        {
                            PostDeviceLogDTO postDeviceLogDTO = new PostDeviceLogDTO()
                            {
                                DeviceId = deviceId.Value,
                                EmployeeId = postAssignAssetDTO.AssignedTo,
                                AssignedBy = postAssignAssetDTO.AssignedBy,
                                CreatedBy = postAssignAssetDTO.AssignedBy,
                                UpdatedBy = postAssignAssetDTO.AssignedBy,
                            };

                            await _postAssignAsset.UpdateDeviceLogAsync(postDeviceLogDTO);

                            var deviceLogID = await _postAssignAsset.GetLatestDeviceLogId(deviceId.Value);

                            if (!string.IsNullOrEmpty(postAssignAssetDTO.DeviceComments[i]))
                            {
                                PostCommentDTO deviceCommentDTO = new PostCommentDTO()
                                {
                                    Description = postAssignAssetDTO.DeviceComments[i],
                                    DeviceId = deviceId.Value,
                                    CreatedBy = postAssignAssetDTO.AssignedBy,
                                    DevicelogId = deviceLogID
                                };

                                await _postAssignAsset.UpdateDeviceComment(deviceCommentDTO);

                                var Comments = await _postAssignAsset.ListComment(deviceLogID);
                                var commentID = Comments.FirstOrDefault()?.Id;

                                if (commentID.HasValue)
                                {
                                    await _postAssignAsset.UpdateCommentIDLogAsync(deviceLogID, commentID.Value);
                                }
                            }
                        }
                    }
                }

                for (int i = 0; i < b; i++)
                {
                    if (!string.IsNullOrEmpty(postAssignAssetDTO.SoftwareIds[i]))
                    {
                        await _postAssignAsset.UpdateSoftwareAsync(postAssignAssetDTO.SoftwareIds[i], postAssignAssetDTO);

                        var software = await _softwareService.getSoftwareAllocationId(postAssignAssetDTO.SoftwareIds[i]);
                        var softwareId = software.FirstOrDefault()?.Id;

                        if (softwareId.HasValue)
                        {
                            PostDeviceLogDTO postSoftwareLogDTO = new PostDeviceLogDTO()
                            {
                                SoftwareAllocationId = softwareId.Value,
                                EmployeeId = postAssignAssetDTO.AssignedTo,
                                AssignedBy = postAssignAssetDTO.AssignedBy,
                                CreatedBy = postAssignAssetDTO.AssignedBy,
                                UpdatedBy = postAssignAssetDTO.AssignedBy,
                            };

                            await _postAssignAsset.UpdateSoftwareLogAsync(postSoftwareLogDTO);

                            var SoftwareLogID = await _postAssignAsset.GetLatestDeviceLogId(softwareId.Value);

                            if (!string.IsNullOrEmpty(postAssignAssetDTO.SoftwareComments[i]))
                            {
                                PostCommentDTO softwareCommentDTO = new PostCommentDTO()
                                {
                                    Description = postAssignAssetDTO.SoftwareComments[i],
                                    SoftwareAllocationId = softwareId.Value,
                                    CreatedBy = postAssignAssetDTO.AssignedBy,
                                    DevicelogId = SoftwareLogID
                                };

                                await _postAssignAsset.UpdateSoftwareComment(softwareCommentDTO);

                                var Comments = await _postAssignAsset.ListComment(SoftwareLogID);
                                var commentID = Comments.FirstOrDefault()?.Id;

                                if (commentID.HasValue)
                                {
                                    await _postAssignAsset.UpdateCommentIDLogAsync(SoftwareLogID, commentID.Value);
                                }
                            }
                        }
                    }
                }

                for (int i = 0; i < c; i++)
                {
                    if (!string.IsNullOrEmpty(postAssignAssetDTO.AccessoryCYGIDs[i]))
                    {
                        await _postAssignAsset.UpdateDeviceAsync(postAssignAssetDTO.AccessoryCYGIDs[i], postAssignAssetDTO);

                        var accessory = await _deviceService.CheckDeviceStatus(postAssignAssetDTO.AccessoryCYGIDs[i]);
                        var accessoryId = accessory.FirstOrDefault()?.Id;

                        if (accessoryId.HasValue)
                        {
                            PostDeviceLogDTO postAccessoryLogDTO = new PostDeviceLogDTO()
                            {
                                DeviceId = accessoryId.Value,
                                EmployeeId = postAssignAssetDTO.AssignedTo,
                                AssignedBy = postAssignAssetDTO.AssignedBy,
                                CreatedBy = postAssignAssetDTO.AssignedBy,
                                UpdatedBy = postAssignAssetDTO.AssignedBy,
                            };

                            await _postAssignAsset.UpdateDeviceLogAsync(postAccessoryLogDTO);

                            var accessorydeviceLogID = await _postAssignAsset.GetLatestDeviceLogId(accessoryId.Value);

                            if (!string.IsNullOrEmpty(postAssignAssetDTO.AccessoryComments[i]))
                            {
                                PostCommentDTO accessoryCommentDTO = new PostCommentDTO()
                                {
                                    Description = postAssignAssetDTO.AccessoryComments[i],
                                    DeviceId = accessoryId.Value,
                                    CreatedBy = postAssignAssetDTO.AssignedBy,
                                    DevicelogId = accessorydeviceLogID
                                };

                                await _postAssignAsset.UpdateDeviceComment(accessoryCommentDTO);

                                var Comments = await _postAssignAsset.ListComment(accessorydeviceLogID);
                                var commentID = Comments.FirstOrDefault()?.Id;

                                if (commentID.HasValue)
                                {
                                    await _postAssignAsset.UpdateCommentIDLogAsync(accessorydeviceLogID, commentID.Value);
                                }
                            }
                        }
                    }
                }

                return Ok("Assets allocated successfully");
            }
            catch (Exception ex)
            {
                // Log or handle the exception as needed
                return BadRequest($"Error: {ex.Message}");
            }
        }
    }
}
