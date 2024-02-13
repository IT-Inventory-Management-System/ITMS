using ITMS.Server.DTO;
using ITMS.Server.Models;
using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore; // Add this namespace for Include extension

namespace ITMS.Server.Services
{
    public interface IUserRecievedBy
    {
        Task<EmployeeDTO?> UpdateReceivedBy(RecievedByDTO receivedByDTO);
    }

    public class UserRecievedBy : IUserRecievedBy
    {
        private readonly ItinventorySystemContext _context;

        public UserRecievedBy(ItinventorySystemContext context)
        {
            _context = context;
        }

        public async Task<EmployeeDTO?> UpdateReceivedBy(RecievedByDTO receivedByDTO)
        {
            try
            {
                
                var deviceLog = await _context.DevicesLogs
                    .Include(dl => dl.CreatedByNavigation)  
                    .Include(dl => dl.Device)
                    .FirstOrDefaultAsync(dl => dl.Id == receivedByDTO.deviceLogId);

                if (deviceLog != null)
                {
                    
                    var newDeviceLog = new DevicesLog
                    {
                        Id = Guid.NewGuid(),  
                        DeviceId = deviceLog.DeviceId,
                        EmployeeId = deviceLog.EmployeeId,
                        AssignedBy = deviceLog.AssignedBy,

                        RecievedBy = receivedByDTO.receivedByUserId,

                        AssignedDate = deviceLog.AssignedDate,

                        RecievedDate = DateTime.UtcNow,  

                        AllotedDate = deviceLog.AllotedDate,
                        CreatedBy = deviceLog.CreatedBy,
                        CreatedAtUtc = DateTime.UtcNow,  
                        UpdatedBy = deviceLog.UpdatedBy,
                        UpdatedAtUtc = deviceLog.UpdatedAtUtc,
                        ActionId = deviceLog.ActionId,
                        SoftwareAllocation = deviceLog.SoftwareAllocation,
                        CreatedByNavigation = deviceLog.CreatedByNavigation,
                        Device = deviceLog.Device,
                        Employee = deviceLog.Employee,
                        UpdatedByNavigation = deviceLog.UpdatedByNavigation,
                        Comments = deviceLog.Comments
                    };

                    _context.DevicesLogs.Add(newDeviceLog);
                    await _context.SaveChangesAsync();

                   
                    return new EmployeeDTO
                    {
                        FirstName = newDeviceLog.RecievedByNavigation.FirstName,
                        LastName = newDeviceLog.RecievedByNavigation.LastName,
                        RecievedDate = newDeviceLog.RecievedDate // Include the RecievedDate
                    };
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                
                Console.WriteLine($"Error updating received by: {ex.Message}");
                throw; 
            }
        }

    }
}
