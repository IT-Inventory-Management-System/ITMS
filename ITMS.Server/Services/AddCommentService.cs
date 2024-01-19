using ITMS.Server.DTO;
using ITMS.Server.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using System;

namespace ITMS.Server.Services
{
    public interface ICommentService
    {
        void AddComment(UserCommentHistory commentDto);
        IEnumerable<Comment> GetComments(Guid deviceId);
    }
    public class AddCommentService : ICommentService
    {
        private readonly ItinventorySystemContext _context;
        
        public AddCommentService(ItinventorySystemContext context)
        {
            _context = context;
        }

        public void AddComment(UserCommentHistory commentDto)
        {
            Comment commentEntity = new Comment
            {
                Description = commentDto.Description,
                CreatedBy = commentDto.CreatedBy,
                CreatedAtUtc = DateTime.UtcNow,
                DeviceId = commentDto.DeviceId
            };

            _context.Comments.Add(commentEntity);
            _context.SaveChanges();
        }

        public IEnumerable<Comment> GetComments(Guid deviceId)
        {
            // Assuming you have a DbSet<Comment> in your context
            return _context.Comments
                .Where(c => c.DeviceId == deviceId)
                .OrderByDescending(c => c.CreatedAtUtc)
                .ToList();
        }

    }
}
