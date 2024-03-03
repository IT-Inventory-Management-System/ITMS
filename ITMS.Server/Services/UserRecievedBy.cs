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
        Task<EmployeeDTO?> RevokeAll(bool isSoftware, RevokeAllServiceDTO receivedByDTO);

        Task ArchiveEmployee(Guid employeeId, Guid updatedByUserId);

        Task UpdateExitProcessInitiated(UpdateExitProcessInitiated dto);
    }

    public class UserRecievedBy : IUserRecievedBy
    {
        private readonly ItinventorySystemContext _context;
        private readonly ICommentService _commentService;

        public UserRecievedBy(ItinventorySystemContext context, ICommentService commentService)
        {
            _context = context;
            _commentService = commentService;
        }

        public async Task<EmployeeDTO?> UpdateReceivedBy(RecievedByDTO receivedByDTO)
        {
            try
            {

                var deviceLog = await _context.DevicesLogs
                    .Include(dl => dl.CreatedByNavigation)
                    .Include(dl => dl.Device)
                    .FirstOrDefaultAsync(dl => dl.Id == receivedByDTO.deviceLogId);

                var assignedAction = await _context.ActionTables
                    .FirstOrDefaultAsync(a => a.ActionName == "Assigned");

                //assignedTo and assignedDate == null of device table and statusId of device table not assigned assigned By null
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

                        UpdatedBy = receivedByDTO.receivedByUserId, //new

                        UpdatedAtUtc = DateTime.UtcNow,


                        ActionId = receivedByDTO.ActionId, //new change

                        SoftwareAllocation = deviceLog.SoftwareAllocation,
                        CreatedByNavigation = deviceLog.CreatedByNavigation,
                        Device = deviceLog.Device,
                        Employee = deviceLog.Employee,
                        UpdatedByNavigation = deviceLog.UpdatedByNavigation,
                        Comments = deviceLog.Comments
                    };


                    _context.DevicesLogs.Add(newDeviceLog);
                    await _context.SaveChangesAsync();

                    var actionName = await _context.ActionTables
                       .Where(a => a.Id == newDeviceLog.ActionId)
                       .Select(a => a.ActionName)
                       .FirstOrDefaultAsync();

                    var firstName = await _context.Employees
                         .Where(e => e.Id == newDeviceLog.RecievedBy)
                         .Select(e => e.FirstName)
                         .FirstOrDefaultAsync();

                    var lastName = await _context.Employees
                         .Where(e => e.Id == newDeviceLog.RecievedBy)
                         .Select(e => e.LastName)
                         .FirstOrDefaultAsync();

                    


                    return new EmployeeDTO
                    {   
                        deviceLogId = newDeviceLog.Id,
                        FirstName = firstName,
                        LastName = lastName,
                        RecievedDate = newDeviceLog.RecievedDate,// Include the RecievedDate
                        ActionName = actionName // Include ActionName

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
        public async Task<EmployeeDTO?> RevokeAll(bool isSoftware,RevokeAllServiceDTO revokeDevice)
        {
            try
            {
                var deviceLog = await _context.DevicesLogs
                    .Include(dl => dl.CreatedByNavigation)
                    .Include(dl => dl.Device)
                    .FirstOrDefaultAsync(dl => dl.Id == revokeDevice.DeviceLogId);
                if (deviceLog != null)
                {
                    var newDeviceLog = new DevicesLog
                    {
                        Id = Guid.NewGuid(),
                        DeviceId = deviceLog.DeviceId,
                        EmployeeId = deviceLog.EmployeeId,
                        AssignedBy = deviceLog.AssignedBy,
                        RecievedBy = revokeDevice.userId,
                        AssignedDate = deviceLog.AssignedDate,
                        RecievedDate = DateTime.UtcNow,
                        AllotedDate = deviceLog.AllotedDate,
                        CreatedBy = deviceLog.CreatedBy,
                        CreatedAtUtc = DateTime.UtcNow,
                        UpdatedBy = revokeDevice.userId, 
                        UpdatedAtUtc = DateTime.UtcNow,
                        ActionId = revokeDevice.ActionId,
                        SoftwareAllocation = deviceLog.SoftwareAllocation,
                        CreatedByNavigation = deviceLog.CreatedByNavigation,
                        Device = deviceLog.Device,
                        Employee = deviceLog.Employee,
                        UpdatedByNavigation = deviceLog.UpdatedByNavigation,
                        Comments = deviceLog.Comments
                    };
                    _context.DevicesLogs.Add(newDeviceLog);
                    await _context.SaveChangesAsync();
                    if(!isSoftware)
                    {
                        UserCommentHistory commentDto = new UserCommentHistory
                        {
                            Description = revokeDevice.DeviceComment,
                            CreatedBy = revokeDevice.userId,
                            CreatedAtUtc = DateTime.UtcNow,
                            DeviceId = deviceLog.DeviceId.HasValue ? deviceLog.DeviceId.Value : Guid.Empty,
                            DeviceLogId = newDeviceLog.Id,
                        };
                        _commentService.RevokeAllAddComment(commentDto);
                    }

                    var actionName = await _context.ActionTables
                      .Where(a => a.Id == newDeviceLog.ActionId)
                      .Select(a => a.ActionName)
                      .FirstOrDefaultAsync();

                    var firstName = await _context.Employees
                         .Where(e => e.Id == newDeviceLog.RecievedBy)
                         .Select(e => e.FirstName)
                         .FirstOrDefaultAsync();

                    var lastName = await _context.Employees
                         .Where(e => e.Id == newDeviceLog.RecievedBy)
                         .Select(e => e.LastName)
                         .FirstOrDefaultAsync();

                    return new EmployeeDTO
                    {
                        deviceLogId = newDeviceLog.Id,
                        deviceId = newDeviceLog.DeviceId,
                        softwareAllocationId = newDeviceLog.SoftwareAllocation,
                        FirstName = firstName,
                        LastName = lastName,
                        RecievedDate = newDeviceLog.RecievedDate,// Include the RecievedDate
                        ActionName = actionName // Include ActionName

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
        public async Task UpdateExitProcessInitiated(UpdateExitProcessInitiated dto)
        {
            try
            {
                var employee = await _context.Employees.FindAsync(dto.EmployeeId);

                if (employee != null)
                {
                    employee.ExitProcessInitiated = dto.ExitProcessInitiated;
                    employee.UpdatedBy = dto.updatedBy;
                    employee.UpdatedAtUtc = DateTime.UtcNow;
                    await _context.SaveChangesAsync();
                }
                else
                {
                    throw new ArgumentException("Employee not found.");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred: {ex.Message}");
                throw;
            }
        }

        public async Task ArchiveEmployee(Guid UserId, Guid archiveUserId)
        {
            try
            {
                var employee = await _context.Employees.FindAsync(archiveUserId);
                if (employee != null)
                {
                    employee.UpdatedBy = UserId;
                    employee.UpdatedAtUtc = DateTime.UtcNow;
                    employee.IsArchived = true;
                    await _context.SaveChangesAsync();
                }
                else
                {
                    throw new ArgumentException("Employee not found");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error updating employee details: {ex.Message}");
                throw;
            }
        }
    }
}
