using ITMS.Server.DTO;
using ITMS.Server.Models;
using Org.BouncyCastle.Asn1.Ocsp;
 
namespace ITMS.Server.Services
{
        public interface IPostAssignAsset
        {
        Task UpdateDeviceAsync(string CYGID, PostAssignAssetDTO device);
        Task UpdateSoftwareAsync(string SoftwareID, PostAssignAssetDTO software);
        Task UpdateDeviceComment(PostCommentDTO commentDto, Guid newDeviceLogId);
        Task UpdateSoftwareComment(PostCommentDTO commentDto, Guid newDeviceLogId);
        Task<Guid> UpdateDeviceLogAsync(PostDeviceLogDTO devicelogDto);

        //Task UpdateAccessoriesAsync(string Id, PostAssignAssetDTO accessories);

    }
    public class PostAssignAsset : IPostAssignAsset
    {
        private readonly ItinventorySystemContext _context;
 
        public PostAssignAsset(ItinventorySystemContext context)
        {
            _context = context;
        }
        public async Task UpdateDeviceAsync(string CYGID, PostAssignAssetDTO device)
        {
            var entityToUpdate = _context.Devices.Where(d => d.Cygid == CYGID).FirstOrDefault();
            if (entityToUpdate == null)
            {
                throw new KeyNotFoundException($"Device with CYGId {CYGID} not found.");
            }
            entityToUpdate.AssignedBy = _context.Employees.FirstOrDefault().Id;
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
            entityToUpdate.AssignedBy = _context.Employees.FirstOrDefault().Id;
            entityToUpdate.AssignedTo = software.AssignedTo;
            entityToUpdate.AssignedDate = DateTime.UtcNow;
 
            _context.SoftwareAllocations.Update(entityToUpdate);
            await _context.SaveChangesAsync();
        }
        public async Task UpdateDeviceComment(PostCommentDTO commentDto, Guid newDeviceLogId)
        {
            Comment comment = new Comment();
            comment.Description = commentDto.Description;
            comment.CreatedBy = _context.Employees.FirstOrDefault().Id;
            comment.CreatedAtUtc = DateTime.UtcNow;
            comment.DeviceId = commentDto.DeviceId;
            //comment.SoftwareAllocationId = commentDto.SoftwareAllocationId;
            comment.DeviceLogId = newDeviceLogId;

            _context.Comments.Update(comment);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateSoftwareComment(PostCommentDTO commentDto, Guid newDeviceLogId)
        {
            Comment comment = new Comment();
            comment.Description = commentDto.Description;
            comment.CreatedBy = _context.Employees.FirstOrDefault().Id;
            comment.CreatedAtUtc = DateTime.UtcNow;
            comment.DeviceId = commentDto.DeviceId;
            comment.SoftwareAllocationId = commentDto.SoftwareAllocationId;
            comment.DeviceLogId = newDeviceLogId;

            _context.Comments.Update(comment);
            await _context.SaveChangesAsync();
        }

        public async Task<Guid> UpdateDeviceLogAsync(PostDeviceLogDTO devicelogDto)
        {
            DevicesLog devicesLog = new DevicesLog();

            devicesLog.DeviceId = devicelogDto.DeviceId;
            devicesLog.EmployeeId = (Guid)devicelogDto.EmployeeId;
            devicesLog.AssignedBy = _context.Employees.FirstOrDefault().Id;
            devicesLog.AssignedDate = DateTime.UtcNow;
            devicesLog.AllotedDate = DateTime.UtcNow;
            devicesLog.CreatedBy = _context.Employees.FirstOrDefault().Id;
            devicesLog.CreatedAtUtc = DateTime.UtcNow;
            devicesLog.UpdatedBy = _context.Employees.FirstOrDefault().Id;
            devicesLog.UpdatedAtUtc = DateTime.UtcNow;
            devicesLog.ActionId = _context.ActionTables.FirstOrDefault(action => action.ActionName == "assigned").Id;

            _context.DevicesLogs.Update(devicesLog);
            await _context.SaveChangesAsync();

            return devicesLog.Id;
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