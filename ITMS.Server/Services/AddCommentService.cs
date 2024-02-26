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
        CommentDto AddRevokeComment(UserCommentHistory commentDto);

        void RevokeAllAddComment(UserCommentHistory commentDto);

        CommentDto AddSoftwareComment(UserSoftwareCommentHistory commentDto);

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
                DeviceId = commentDto.DeviceId,
                CreatedBy = commentDto.CreatedBy,
                CreatedAtUtc = DateTime.UtcNow,
                Description = commentDto.Description,


            };
            _context.Comments.Add(addcomment);
            _context.SaveChanges();
        }


        public CommentDto AddRevokeComment(UserCommentHistory commentDto)
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

           
            var createdByEntity = _context.Employees
                .Where(e => e.Id == commentDto.CreatedBy)
                .FirstOrDefault();

           
            if (createdByEntity != null)
            {
                commentEntity.CreatedByNavigation = createdByEntity;
            }

            
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

        public void RevokeAllAddComment(UserCommentHistory commentDto)
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


            var createdByEntity = _context.Employees
                .Where(e => e.Id == commentDto.CreatedBy)
                .FirstOrDefault();


            if (createdByEntity != null)
            {
                commentEntity.CreatedByNavigation = createdByEntity;
            }


            _context.Comments.Add(commentEntity);
            _context.SaveChanges();

        }


        //software comments
        public CommentDto AddSoftwareComment(UserSoftwareCommentHistory commentDto)
        {
            System.Threading.Thread.CurrentThread.CurrentCulture = new System.Globalization.CultureInfo(System.Threading.Thread.CurrentThread.CurrentCulture.Name);

            Comment commentEntity = new Comment
            {
                Description = commentDto.Description,
                CreatedBy = commentDto.CreatedBy,
                CreatedAtUtc = DateTime.Now,
                SoftwareAllocationId = commentDto.SoftwareAllocationId,
                DeviceLogId = commentDto.DeviceLogId
            };


            var createdByEntity = _context.Employees
                .Where(e => e.Id == commentDto.CreatedBy)
                .FirstOrDefault();


            if (createdByEntity != null)
            {
                commentEntity.CreatedByNavigation = createdByEntity;
            }


            _context.Comments.Add(commentEntity);
            _context.SaveChanges();


            CommentDto addedComment = new CommentDto
            {
                Id = commentEntity.Id,
                DeviceLogId = commentEntity.DeviceLogId,
                SoftwareAllocationId = commentEntity.SoftwareAllocationId,
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
