//// Services/UserDeviceService.cs
//using System;
//using System.Linq;
//using System.Threading.Tasks;
//using ITMS.Server.Models;
//using Microsoft.EntityFrameworkCore;

//// Services/UserDeviceService.cs
//public class UserDeviceService
//{
//    private readonly ItinventorySystemContext _dbContext;

//    public UserDeviceService(ItinventorySystemContext dbContext)
//    {
//        _dbContext = dbContext;
//    }


    // ... other methods ...

    //public async Task<CommentDto[]> GetCommentsForUserDevices(string userId)
    //{
    //    var comments = await _dbContext.Comments
    //        .Include(c => c.Device)
    //            .ThenInclude(d => d.AssignedToNavigation)
    //        .Where(c => c.Device.Cygid == userId)
    //        .ToListAsync();

    //    if (comments == null || !comments.Any())
    //    {
    //        return new CommentDto[0]; // Return an empty array
    //    }

    //    Map Comment entities to CommentDto objects
    //  var commentDtos = comments.Select(comment => MapToCommentDto(comment)).ToArray(); // Convert to array

    //    return commentDtos;
    //}

    //private CommentDto MapToCommentDto(Comment comment)
    //{
    //    Basic example of mapping logic
    //   var commentDto = new CommentDto
    //   {
    //       CommentDescription = comment?.Description,
    //       CommentCreatedAtUtc = (comment.CreatedAtUtc),
    //       CreatedByFullName = $"{comment?.CreatedByNavigation.FirstName}{comment?.CreatedByNavigation.LastName}"

    //   };

    //    return commentDto;


        //var latestComment = device.Comments.OrderByDescending(c => c.CreatedAtUtc).FirstOrDefault();

        //var userDeviceDto = new UserDeviceDto
        //{

        //    cgiid = device.AssignedToNavigation.Cgiid,
        //    Comment = latestComment != null ? new CommentDto
        //    {
        //        CommentDescription = latestComment.Description,
        //        CreatedByFullName = $"{latestComment.CreatedByNavigation.FirstName} {latestComment.CreatedByNavigation.LastName}",
        //        CommentCreatedAtUtc = latestComment.CreatedAtUtc
        //    } : null
        //};

        //return userDeviceDto;
    

