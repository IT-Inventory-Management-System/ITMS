﻿using Microsoft.AspNetCore.Http;
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
                _commentService.AddComment(commentDto);
                return Ok(new { Message = "Comment added successfully" });
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
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
                // Log the exception or handle it accordingly
                return StatusCode(500, new { Message = "Internal Server Error" });
            }
        }
    }
}
