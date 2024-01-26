using ITMS.Server.DTO;
using ITMS.Server.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using System;
using System.Xml.Linq;

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

            // Load the related Employee directly
            var createdByEntity = _context.Employees
                .Where(e => e.Id == commentDto.CreatedBy)
                .FirstOrDefault();

            // Attach the retrieved Employee entity to the Comment entity
            if (createdByEntity != null)
            {
                commentEntity.CreatedByNavigation = createdByEntity;
            }

            // Now, you can add the commentEntity to the DbSet
            _context.Comments.Add(commentEntity);
            _context.SaveChanges();


            CommentDto addedComment = new CommentDto
            {
                Id = commentEntity.Id,
                DeviceLogId = commentEntity.DeviceLogId,
                DeviceId = commentEntity.DeviceId,
                Description = commentEntity.Description,
                CreatedBy = commentEntity.CreatedByNavigation != null
                                ? $"{commentEntity.CreatedByNavigation.FirstName} {commentEntity.CreatedByNavigation.LastName}"
                                : null,
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
