using ITMS.Server.DTO;
using ITMS.Server.Models;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Asn1.Ocsp;
namespace ITMS.Server.Services
{
    public interface IPostAssignAsset
    {
        Task UpdateDeviceAsync(string CYGID, PostAssignAssetDTO device);
        Guid UpdateSoftwareAsync(singleSoftwareDTO SoftwareID, PostAssignAssetDTO software);
        Task UpdateDeviceComment(PostCommentDTO commentDto);
        Task UpdateSoftwareComment(PostCommentDTO commentDto);
        Task UpdateDeviceLogAsync(PostDeviceLogDTO devicelogDto);
        Task UpdateSoftwareLogAsync(PostDeviceLogDTO devicelogDto);
        Task UpdateCommentIDLogAsync(Guid? DeviceLogID, Guid? CommentId);
        Task<Guid> GetLatestDeviceLogId(Guid id);
        Task<IEnumerable<Comment>> ListComment(Guid? DeviceLogID);

        //Task UpdateAccessoriesAsync(string Id, PostAssignAssetDTO accessories);

    }
    public class PostAssignAsset : IPostAssignAsset
    {
        private readonly ItinventorySystemContext _context;
        public PostAssignAsset(ItinventorySystemContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Comment>> ListComment(Guid? DeviceLogID)
        {
            var result = await (from c in _context.Comments
                                where c.DeviceLogId == DeviceLogID
                                select new Comment
                                {
                                    Id = c.Id
                                }).ToListAsync();

            return result;
        }
        public async Task<Guid> GetLatestDeviceLogId(Guid id)
        {
            var result = await _context.DevicesLogs
                .Where(dl => dl.DeviceId == id || dl.SoftwareAllocation == id)
                .OrderByDescending(dl => dl.CreatedAtUtc)
                .Select(dl => dl.Id)
                .FirstOrDefaultAsync();

            return result;
        }
        public async Task UpdateDeviceAsync(string CYGID, PostAssignAssetDTO device)
        {
            var entityToUpdate = _context.Devices.Where(d => d.Cygid == CYGID).FirstOrDefault();
            if (entityToUpdate == null)
            {
                throw new KeyNotFoundException($"Device with CYGId {CYGID} not found.");
            }
            entityToUpdate.AssignedBy = device.AssignedBy;
            entityToUpdate.AssignedTo = device.AssignedTo;
            entityToUpdate.AssignedDate = DateTime.UtcNow;
            entityToUpdate.Status = _context.Statuses.FirstOrDefault(s => s.Type == "Assigned").Id;
            _context.Devices.Update(entityToUpdate);
            await _context.SaveChangesAsync();
        }
        public Guid UpdateSoftwareAsync(singleSoftwareDTO Software, PostAssignAssetDTO software)
        {
            var entityToUpdate = _context.SoftwareAllocations.Where(sa => (sa.SoftwareId == Guid.Parse(Software.SoftwareId))&&(sa.Version==Software.version)&&(sa.IsArchived==false)&&(sa.AssignedTo==null)).FirstOrDefault();

            //var entityToUpdate = _context.SoftwareAllocations.Where(sa => sa.SoftwareId == Guid.Parse(SoftwareID)).FirstOrDefault();
            if (entityToUpdate == null)
            {
                throw new KeyNotFoundException($"Software with SoftwareID {Software.SoftwareId} not found.");
            }
            entityToUpdate.AssignedBy = software.AssignedBy;
            entityToUpdate.AssignedTo = software.AssignedTo;
            entityToUpdate.AssignedDate = DateTime.UtcNow;
            _context.SoftwareAllocations.Update(entityToUpdate);
            _context.SaveChanges();

            return entityToUpdate.Id;
        }
        public async Task UpdateDeviceComment(PostCommentDTO commentDto)
        {
            Comment comment = new Comment();
            comment.Description = commentDto.Description;
            comment.CreatedBy = commentDto.CreatedBy;
            comment.CreatedAtUtc = DateTime.UtcNow;
            comment.DeviceId = commentDto.DeviceId;
            comment.SoftwareAllocationId = commentDto.SoftwareAllocationId;
            comment.DeviceLogId = commentDto.DevicelogId;

            _context.Comments.Update(comment);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateSoftwareComment(PostCommentDTO commentDto)
        {
            Comment comment = new Comment();
            comment.Description = commentDto.Description;
            comment.CreatedBy = commentDto.CreatedBy;
            comment.CreatedAtUtc = DateTime.UtcNow;
            comment.DeviceId = commentDto.DeviceId;
            comment.SoftwareAllocationId = commentDto.SoftwareAllocationId;
            comment.DeviceLogId = commentDto.DevicelogId;

            _context.Comments.Update(comment);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateDeviceLogAsync(PostDeviceLogDTO devicelogDto)
        {
            DevicesLog devicesLog = new DevicesLog();

            devicesLog.DeviceId = devicelogDto.DeviceId;
            devicesLog.EmployeeId = (Guid)devicelogDto.EmployeeId;
            devicesLog.AssignedBy = devicelogDto.AssignedBy;
            devicesLog.AssignedDate = DateTime.UtcNow;
            devicesLog.AllotedDate = DateTime.UtcNow;
            devicesLog.CreatedBy = (Guid)devicelogDto.AssignedBy;
            devicesLog.CreatedAtUtc = DateTime.UtcNow;
            devicesLog.UpdatedBy = devicelogDto.AssignedBy;
            devicesLog.UpdatedAtUtc = DateTime.UtcNow;
            devicesLog.ActionId = _context.ActionTables.FirstOrDefault(action => action.ActionName.ToLower() == "assigned").Id;
            devicesLog.SoftwareAllocation = devicelogDto.SoftwareAllocationId;
            _context.DevicesLogs.Update(devicesLog);
            await _context.SaveChangesAsync();
        }
        public async Task UpdateCommentIDLogAsync(Guid? DeviceLogID, Guid? CommentId)
        {
            var entityToUpdate = _context.DevicesLogs.Where(dl => dl.Id == DeviceLogID).FirstOrDefault();
            if (entityToUpdate == null)
            {
                throw new KeyNotFoundException($"Device with DeviceLogID {DeviceLogID} not found.");
            }
            entityToUpdate.CommentId = CommentId;
            _context.DevicesLogs.Update(entityToUpdate);
            await _context.SaveChangesAsync();

        }
        public async Task UpdateSoftwareLogAsync(PostDeviceLogDTO devicelogDto)
        {
            DevicesLog devicesLog = new DevicesLog();

            devicesLog.DeviceId = devicelogDto.DeviceId;
            devicesLog.EmployeeId = (Guid)devicelogDto.EmployeeId;
            devicesLog.AssignedBy = devicelogDto.AssignedBy;
            devicesLog.AssignedDate = DateTime.UtcNow;
            devicesLog.AllotedDate = DateTime.UtcNow;
            devicesLog.CreatedBy = (Guid)devicelogDto.AssignedBy;
            devicesLog.CreatedAtUtc = DateTime.UtcNow;
            devicesLog.UpdatedBy = devicelogDto.AssignedBy;
            devicesLog.UpdatedAtUtc = DateTime.UtcNow;
            devicesLog.ActionId = _context.ActionTables.FirstOrDefault(action => action.ActionName == "assigned").Id;
            devicesLog.SoftwareAllocation = devicelogDto.SoftwareAllocationId;
            _context.DevicesLogs.Update(devicesLog);
            await _context.SaveChangesAsync();
        }

        //public async Task UpdateAccessoriesAsync(string ID, PostAssignAssetDTO accessories)
        //{
        //    var entityToUpdate = _context.Categories.Where(c => c.Id.ToString()== ID).FirstOrDefault();
        //    if (entityToUpdate == null)
        //    {
        //        throw new KeyNotFoundException($"Accessory with CYGId {ID} not found.");
        //    }
        //    entityToUpdate.AssignedBy = accessories.AssignedBy;
        //    entityToUpdate.AssignedTo = accessories.AssignedTo;
        //    entityToUpdate.AssignedDate = DateTime.UtcNow;

        //    _context.SoftwareAllocations.Update(entityToUpdate);
        //    await _context.SaveChangesAsync();

        //}

    }
}