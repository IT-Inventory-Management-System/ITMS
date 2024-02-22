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
            Comment addcomment = new Comment
            {
                DeviceId= commentDto.DeviceId,
                CreatedBy= commentDto.CreatedBy,
                CreatedAtUtc= DateTime.UtcNow, 
                Description= commentDto.Description,

              
            };
            _context.Comments.Add(addcomment);
            _context.SaveChanges();
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
