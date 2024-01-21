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
        private readonly IPostAssignAsset _postAssignAsset;
        public PostAssignController(ItinventorySystemContext context, IPostAssignAsset postAssignAsset)
        {
            _context = context;
            _postAssignAsset = postAssignAsset;
        }

        [HttpPost("assignAsset")]
        public async Task<IResult> AssignAsset([FromBody] PostAssignAssetDTO postAssignAssetDTO)
        {
            try
            {
                if (postAssignAssetDTO == null)//if dto is not provided by frontend, tehn it will give errors
                {
                    return Results.BadRequest("Invalid allocation request");
                }

                if (!string.IsNullOrEmpty(postAssignAssetDTO.CYGID) && !string.IsNullOrEmpty(postAssignAssetDTO.SoftwareId))
                {
                    await _postAssignAsset.UpdateDeviceAsync(postAssignAssetDTO.CYGID, postAssignAssetDTO);
                    await _postAssignAsset.UpdateSoftwareAsync(postAssignAssetDTO.SoftwareId, postAssignAssetDTO);
                    return Results.Ok("Device and Software allocated successfully");
                }
                else if (!string.IsNullOrEmpty(postAssignAssetDTO.CYGID))
                {
                    await _postAssignAsset.UpdateDeviceAsync(postAssignAssetDTO.CYGID, postAssignAssetDTO);
                    return Results.Ok("Device allocated successfully");
                }
                else if (!string.IsNullOrEmpty(postAssignAssetDTO.SoftwareId))
                {
                    await _postAssignAsset.UpdateSoftwareAsync(postAssignAssetDTO.SoftwareId, postAssignAssetDTO);
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