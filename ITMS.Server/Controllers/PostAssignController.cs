using ITMS.Server.Models;
using ITMS.Server.Services;
using ITMS.Server.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Elfie.Serialization;
namespace ITMS.Server.Controllers
{
    [ApiController]
    [Route("api/add")]
    public class PostAssignController : ControllerBase
    {
        private readonly ItinventorySystemContext _context;
        private readonly IGetDeviceService _deviceService;
        private readonly IPostAssignAsset _postAssignAsset;
        private readonly IGetSoftwareService _getSoftwareService;
        public PostAssignController(ItinventorySystemContext context, IPostAssignAsset postAssignAsset, IGetDeviceService deviceService, IGetSoftwareService getSoftwareService)
        {
            _context = context;
            _postAssignAsset = postAssignAsset;
            _deviceService = deviceService;
            _getSoftwareService = getSoftwareService;
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
                    await _postAssignAsset.UpdateSoftwareAsync(postAssignAssetDTO.SoftwareId, postAssignAssetDTO);

                    var Device = await _deviceService.CheckDeviceStatus(postAssignAssetDTO.CYGID);
                    var softwareAllocation = await _getSoftwareService.listAllSoftware(postAssignAssetDTO.SoftwareId);

                    var deviceID = Device.FirstOrDefault().Id;
                    var softwareAllocationID = softwareAllocation.FirstOrDefault().Id;

                    PostCommentDTO postCommentDTO = new PostCommentDTO();
                    postCommentDTO.Description = postAssignAssetDTO.Comments;
                    postCommentDTO.CreatedBy = postAssignAssetDTO.AssignedBy;
                    postCommentDTO.DeviceId = deviceID;
                    postCommentDTO.SoftwareAllocationId = softwareAllocationID;

                    await _postAssignAsset.UpdateComment(postCommentDTO);
                    return Results.Ok("Device and Software allocated successfully");
                }
                else if (!string.IsNullOrEmpty(postAssignAssetDTO.CYGID))
                {
                    await _postAssignAsset.UpdateDeviceAsync(postAssignAssetDTO.CYGID, postAssignAssetDTO);

                    var Device = await _deviceService.CheckDeviceStatus(postAssignAssetDTO.CYGID);
                    var softwareAllocation = await _getSoftwareService.listAllSoftware(postAssignAssetDTO.SoftwareId);

                    var deviceID = Device.FirstOrDefault().Id;

                    PostCommentDTO postCommentDTO = new PostCommentDTO();
                    postCommentDTO.Description = postAssignAssetDTO.Comments;
                    postCommentDTO.CreatedBy = postAssignAssetDTO.AssignedBy;
                    postCommentDTO.DeviceId = deviceID;

                    await _postAssignAsset.UpdateComment(postCommentDTO);
                    return Results.Ok("Device allocated successfully");
                }
                else if (!string.IsNullOrEmpty(postAssignAssetDTO.SoftwareId))
                {
                    await _postAssignAsset.UpdateSoftwareAsync(postAssignAssetDTO.SoftwareId, postAssignAssetDTO);

                    var Device = await _deviceService.CheckDeviceStatus(postAssignAssetDTO.CYGID);
                    var softwareAllocation = await _getSoftwareService.listAllSoftware(postAssignAssetDTO.SoftwareId);

                    var softwareAllocationID = softwareAllocation.FirstOrDefault().Id;

                    PostCommentDTO postCommentDTO = new PostCommentDTO();
                    postCommentDTO.Description = postAssignAssetDTO.Comments;
                    postCommentDTO.CreatedBy = postAssignAssetDTO.AssignedBy;
                    postCommentDTO.SoftwareAllocationId = softwareAllocationID;

                    await _postAssignAsset.UpdateComment(postCommentDTO);
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