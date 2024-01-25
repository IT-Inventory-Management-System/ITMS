using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ITMS.Server.Models;
using ITMS.Server.Services;
using ITMS.Server.DTO;

namespace ITMS.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly ICommentService _commentService;
        
        public CommentsController(ICommentService commentService)
        {
            _commentService = commentService;
        }

        [HttpPost]
        public IActionResult AddComment([FromBody] UserCommentHistory commentDto)
        {
            try
            {
                var addedComment = _commentService.AddComment(commentDto);
              
                return Ok(addedComment);
            }
            catch (Exception ex)
            {
                
                return StatusCode(500, new { Message = "Internal Server Error" });
            }
        }

        [HttpGet("{deviceId}")]
        public IActionResult GetComments(Guid deviceId)
        {
            try
            {
                var comments = _commentService.GetComments(deviceId);
                return Ok(comments);
            }
            catch (Exception ex)
            {
                
                return StatusCode(500, new { Message = "Internal Server Error" });
            }
        }
    }
}
