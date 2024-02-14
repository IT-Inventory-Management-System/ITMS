using ITMS.Server.DTO;
using ITMS.Server.Models;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Asn1.Ocsp;
namespace ITMS.Server.Services
{
    public interface IPostAssignAsset
    {
        Task UpdateDeviceAsync(string CYGID, PostAssignAssetDTO device);
        Task UpdateSoftwareAsync(string SoftwareID, PostAssignAssetDTO software);
        Task UpdateDeviceComment(PostCommentDTO commentDto);
        Task UpdateSoftwareComment(PostCommentDTO commentDto);
        Task UpdateDeviceLogAsync(PostDeviceLogDTO devicelogDto);
        Task UpdateSoftwareLogAsync(PostDeviceLogDTO devicelogDto);
        Task<IEnumerable<GetDeviceLogDTO>> ListDeviceLog(Guid d);

        //Task UpdateAccessoriesAsync(string Id, PostAssignAssetDTO accessories);

    }
    public class PostAssignAsset : IPostAssignAsset
    {
        private readonly ItinventorySystemContext _context;
        public PostAssignAsset(ItinventorySystemContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<GetDeviceLogDTO>> ListDeviceLog(Guid id)
        {
            var result = await (from dl in _context.DevicesLogs
                                where dl.DeviceId == id || dl.SoftwareAllocation == id
                                select new GetDeviceLogDTO
                                {
                                    Id = dl.Id,
                                    DeviceId = dl.DeviceId,
                                    SoftwareAllocationID = dl.SoftwareAllocation
                                }).ToListAsync();

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
            _context.Devices.Update(entityToUpdate);
            await _context.SaveChangesAsync();
        }
        public async Task UpdateSoftwareAsync(string SoftwareID, PostAssignAssetDTO software)
        {
            var entityToUpdate = _context.SoftwareAllocations.Where(sa => sa.SoftwareId.ToString() == SoftwareID).FirstOrDefault();
            if (entityToUpdate == null)
            {
                throw new KeyNotFoundException($"Software with SoftwareID {SoftwareID} not found.");
            }
            entityToUpdate.AssignedBy = software.AssignedBy;
            entityToUpdate.AssignedTo = software.AssignedTo;
            entityToUpdate.AssignedDate = DateTime.UtcNow;
            _context.SoftwareAllocations.Update(entityToUpdate);
            await _context.SaveChangesAsync();
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
            devicesLog.ActionId = _context.ActionTables.FirstOrDefault(action => action.ActionName == "assigned").Id;
            devicesLog.SoftwareAllocation = devicelogDto.SoftwareAllocationId;
            _context.DevicesLogs.Update(devicesLog);
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