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

                var SubmittedAction = await _context.ActionTables
                .FirstOrDefaultAsync(a => a.ActionName == "Submitted" || a.ActionName == "submitted");

                var UnassignableAction = await _context.ActionTables
                 .FirstOrDefaultAsync(a => a.ActionName == "Unassignable" || a.ActionName == "unassignable");
    

                //assignedTo and assignedDate == null of device table and statusId of device table not assigned assigned By null
                if (deviceLog != null)
                {
                    var device = await _context.Devices.FindAsync(deviceLog.DeviceId);
                    if(device != null)
                    {
                        if (receivedByDTO.ActionId == SubmittedAction?.Id || receivedByDTO.ActionId == UnassignableAction?.Id)
                        {
                            var notAssignedStatusId = await _context.Statuses
                              .Where(s => s.Type == "Not Assigned")
                              .Select(s => s.Id)
                              .FirstOrDefaultAsync();

                            device.AssignedTo = null;
                            device.AssignedDate = null;
                            device.AssignedBy = null;
                            device.Status = notAssignedStatusId;

                            _context.Devices.Update(device);

                        }
                        
                    }
             
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
            var SubmittedAction = await _context.ActionTables
               .FirstOrDefaultAsync(a => a.ActionName == "Submitted" || a.ActionName == "submitted");

            var UnassignableAction = await _context.ActionTables
             .FirstOrDefaultAsync(a => a.ActionName == "Unassignable" || a.ActionName == "unassignable");

            try
            {

                var deviceLog = await _context.DevicesLogs
                    .Include(dl => dl.CreatedByNavigation)
                    .Include(dl => dl.Device)
                    .FirstOrDefaultAsync(dl => dl.Id == revokeDevice.DeviceLogId);


                if (deviceLog != null)
                {


                    var device = revokeDevice.DeviceId != null? await _context.Devices.FindAsync(revokeDevice.DeviceId):null;
                    var soft = revokeDevice.SoftwareAllocation != null ? await _context.SoftwareAllocations.FindAsync(revokeDevice.SoftwareAllocation) : null;
                   
                    if (device != null)
                    {
                        if (revokeDevice.ActionId == SubmittedAction?.Id || revokeDevice.ActionId == UnassignableAction?.Id)
                        {
                            var notAssignedStatusId = await _context.Statuses
                              .Where(s => s.Type == "Not Assigned")
                              .Select(s => s.Id)
                              .FirstOrDefaultAsync();

                            device.AssignedTo = null;
                            device.AssignedDate = null;
                            device.AssignedBy = null;
                            device.Status = notAssignedStatusId;

                            _context.Devices.Update(device);

                        }
                    }

                    if(soft != null)
                    {
                        if (revokeDevice.ActionId == SubmittedAction?.Id || revokeDevice.ActionId == UnassignableAction?.Id)
                        {
                            var notAssignedStatusId = await _context.Statuses
                              .Where(s => s.Type == "Not Assigned")
                              .Select(s => s.Id)
                              .FirstOrDefaultAsync();

                            soft.AssignedTo = null;
                            soft.AssignedDate = null;
                            soft.AssignedBy = null;

                            _context.SoftwareAllocations.Update(soft);
                            //UpdateReceivedBy(revokeDevice);
                        }
                    }

                    var newDeviceLog = new DevicesLog();
                    if (device != null) {
                        newDeviceLog = new DevicesLog
                        {
                            DeviceId = revokeDevice.DeviceId,
                            AssignedBy = deviceLog.AssignedBy,
                            AssignedDate = deviceLog.AssignedDate,
                            AllotedDate = deviceLog.AllotedDate,
                            EmployeeId = revokeDevice.userId,
                            RecievedBy = revokeDevice.CreatedBy,
                            RecievedDate = DateTime.UtcNow,
                            CreatedBy = revokeDevice.CreatedBy,
                            CreatedAtUtc = DateTime.UtcNow,
                            UpdatedBy = revokeDevice.userId,
                            UpdatedAtUtc = DateTime.UtcNow,
                            ActionId = revokeDevice.ActionId,
                            SoftwareAllocation = deviceLog.SoftwareAllocation,
                        };
                    }
                    else {

                        newDeviceLog = new DevicesLog
                        {
                            DeviceId = deviceLog.DeviceId,
                            EmployeeId = deviceLog.EmployeeId,
                            AssignedBy = deviceLog.AssignedBy,
                            RecievedBy = revokeDevice.CreatedBy,
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
                    }




                    //  AllotedDate = deviceLog.AllotedDate,



                    await _context.DevicesLogs.AddAsync(newDeviceLog);
                   await _context.SaveChangesAsync();

                Guid lastestLogId = await _context.DevicesLogs.Where(l => l.DeviceId == revokeDevice.DeviceId).OrderByDescending(l => l.CreatedAtUtc).Select(l => l.Id).FirstOrDefaultAsync();

                    if(!isSoftware)
                    {
                        UserCommentHistory commentDto = new UserCommentHistory
                        {
                            Description = revokeDevice.DeviceComment,
                            CreatedBy = revokeDevice.CreatedBy,
                            CreatedAtUtc = DateTime.UtcNow,
                            DeviceId = revokeDevice.DeviceId.HasValue ? revokeDevice.DeviceId.Value : Guid.Empty,
                            DeviceLogId = lastestLogId,
                        };
                        _commentService.RevokeAllAddComment(commentDto);
                    }

                    var actionName = await _context.ActionTables
                      .Where(a => a.Id == revokeDevice.ActionId)
                      .Select(a => a.ActionName)
                      .FirstOrDefaultAsync();

                    var firstName = await _context.Employees
                         .Where(e => e.Id == revokeDevice.CreatedBy)
                         .Select(e => e.FirstName)
                         .FirstOrDefaultAsync();

                    var lastName = await _context.Employees
                         .Where(e => e.Id == revokeDevice.CreatedBy)
                         .Select(e => e.LastName)
                         .FirstOrDefaultAsync();

                    return new EmployeeDTO
                    {
                        deviceLogId = lastestLogId,
                        deviceId = newDeviceLog.DeviceId,
                        softwareAllocationId = newDeviceLog.SoftwareAllocation,
                        FirstName = firstName,
                        LastName = lastName,
                        RecievedDate = newDeviceLog.RecievedDate,
                        ActionName = actionName

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
                    if (!dto.ExitProcessInitiated)
                        employee.onHold = false;
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
            var devicesAssigned = await _context.Devices.AnyAsync(d => d.AssignedTo == archiveUserId);
            try
            {
                  if(!devicesAssigned)
                  {
                        var employee = await _context.Employees.FindAsync(archiveUserId);
                        if (employee != null)
                        {
                            employee.UpdatedBy = UserId;
                            employee.UpdatedAtUtc = DateTime.UtcNow;
                            employee.IsArchived = true;
                            employee.onHold = false;
                            await _context.SaveChangesAsync();
                        }
                        else
                        {
                            throw new ArgumentException("Employee not found");
                        }
                  }
                else
                {
                    var employee = await _context.Employees.FindAsync(archiveUserId);
                    if (employee != null)
                    {
                        employee.UpdatedBy = UserId;
                        employee.UpdatedAtUtc = DateTime.UtcNow;
                        employee.onHold = true;
                        employee.IsArchived = false;
                        await _context.SaveChangesAsync();
                    }
                    else
                    {
                        throw new ArgumentException("Employee not found");
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error updating employee details: {ex.Message}");
                throw;
            }
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
    }
}
