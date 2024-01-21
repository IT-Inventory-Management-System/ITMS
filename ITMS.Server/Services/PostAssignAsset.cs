using ITMS.Server.DTO;
using ITMS.Server.Models;
using Org.BouncyCastle.Asn1.Ocsp;
 
namespace ITMS.Server.Services
{
        public interface IPostAssignAsset
    {
        Task UpdateDeviceAsync(string CYGID, PostAssignAssetDTO device);
        Task UpdateSoftwareAsync(string SoftwareID, PostAssignAssetDTO software);
 
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
                throw new KeyNotFoundException($"Device with CYGId {SoftwareID} not found.");
            }
            entityToUpdate.AssignedBy = software.AssignedBy;
            entityToUpdate.AssignedTo = software.AssignedTo;
            entityToUpdate.AssignedDate = DateTime.UtcNow;
 
            _context.SoftwareAllocations.Update(entityToUpdate);
            await _context.SaveChangesAsync();
        }
    }
}