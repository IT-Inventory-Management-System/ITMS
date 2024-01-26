using ITMS.Server.DTO;
using ITMS.Server.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using System;

namespace ITMS.Server.Services
{
    public interface ICommentService
    {
        CommentDto AddComment(UserCommentHistory commentDto);
        IEnumerable<Comment> GetComments(Guid deviceId);
    }
    public class AddCommentService : ICommentService
    {
        private readonly ItinventorySystemContext _context;
        
        public AddCommentService(ItinventorySystemContext context)
        {
            _context = context;
        }



        public CommentDto AddComment(UserCommentHistory commentDto)
        {
            System.Threading.Thread.CurrentThread.CurrentCulture = new System.Globalization.CultureInfo(System.Threading.Thread.CurrentThread.CurrentCulture.Name);

            Comment commentEntity = new Comment
            {
                Description = commentDto.Description,
                CreatedBy = commentDto.CreatedBy,
                CreatedAtUtc = DateTime.Now,
                DeviceId = commentDto.DeviceId,
                DeviceLogId = commentDto.DeviceLogId
            };

            _context.Comments.Add(commentEntity);
            _context.SaveChanges();

            CommentDto addedComment = new CommentDto
            {
                Id = commentEntity.Id,
                DeviceLogId = commentEntity.DeviceLogId,
                DeviceId = commentEntity.DeviceId,
                Description = commentEntity.Description,
                CreatedBy = commentEntity.CreatedByNavigation?.FirstName, // Null conditional operator
                CreatedAt = commentEntity.CreatedAtUtc,
            };

            return addedComment;
        }

        public IEnumerable<Comment> GetComments(Guid deviceId)
        {
            
            return _context.Comments
                .Where(c => c.DeviceId == deviceId)
                .OrderByDescending(c => c.CreatedAtUtc)
                .ToList();
        }

    }
}
