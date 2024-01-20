using ITMS.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace ITMS.Server.Services
{
    //public interface IDeviceService
    //{
    //    public DevicelogDto GetDevices(Guid id);
    //}
        public class EmployeeService
    {
        private readonly ItinventorySystemContext _context;

        public EmployeeService(ItinventorySystemContext context)
        {
            _context = context;
        }

        public DevicelogDto GetDevices(Guid id)
        {
            try
            {
                var device = _context.DevicesLogs
                    .Where(log => log.EmployeeId == id)
                    .Include(d => d.Employee)
                    .Include(d => d.Device)
                    .ToList();
                return null;
            }

//public class EmployeeService
//{
//    private readonly ItinventorySystemContext _context;

//    public EmployeeService(ItinventorySystemContext context)
//    {
//        _context = context;
//    }

            //.Where(log => log.AssignedTo == id)
            //.Include(d => d.DeviceModel)
            //.FirstOrDefault(); // Retrieve the first matching device

            //if (device != null)
            //            {
            //                var comments = _context.Comments
            //                    .Where(comment => comment.DeviceId == device.Id)
            //                    .Select(c => new CommentDto
            //                    {
            //                        Id = c.Id,
            //                        Description = c.Description,
            //                        CreatedBy = _context.Employees
            //                        .Where(employee => employee.Id == c.CreatedBy)
            //.Select(employee => $"{employee.FirstName} {employee.LastName}")
            //                        .FirstOrDefault(),
//                    AssignedDate = (DateTime)log.Device.AssignedDate,
//                    Comments = _context.Comments
//                        .Where(comment => comment.DeviceId == log.Device.Id)
//                        .Select(c => new CommentDto
//                        {
//                            Id = c.Id,
//                            Description = c.Description,
//                            CreatedBy = _context.Employees
//                                .Where(employee => employee.Id == c.CreatedBy)
//                                .Select(employee => $"{employee.FirstName} {employee.LastName}")
//                                .FirstOrDefault(),
//                            CreatedAt = c.CreatedAtUtc
//                        })
//                        .ToList(),
//                })
//                .ToList();

//            return devicesWithComments;
//        }
//        catch (Exception ex)
//        {
//            Console.WriteLine(ex.Message);
//            return null;
//        }
//    }

            //                        CreatedAt = c.CreatedAtUtc
            //                    })
            //                .ToList();

            //                var assignedTo = _context.Employees.FirstOrDefault(emp => emp.Id == id);
            //                var assignedtoFirstName = assignedTo?.FirstName ?? "Unknown";
            //                var assignedtoLastName = assignedTo?.LastName ?? "Unknown";
            //                var assignedByEmployee = _context.Employees.FirstOrDefault(emp => emp.Id == device.AssignedBy);
            //                var receivedByEmployee = _context.Employees.FirstOrDefault(emp => emp.Id == device.RecievedBy);

            //                var assignedByFirstName = assignedByEmployee?.FirstName ?? "Unknown";
            //                var assignedByLastName = assignedByEmployee?.LastName ?? "Unknown";

            //                var receivedByFirstName = receivedByEmployee?.FirstName ?? "Unknown";
            //                var receivedByLastName = receivedByEmployee?.LastName ?? "Unknown";
            //                var modelNo = device.DeviceModel != null ? device.DeviceModel.ModelNo : "Unknown";

            //                return new DevicelogDto
            //                {
            //                    Id = device.Id,
            //                    Cygid = device.Cygid,
            //                    Cgiid = device.AssignedToNavigation?.Cgiid,
            //                    AssignedTo = $"{assignedtoFirstName} {assignedtoLastName}",
            //                    AssignedBy = $"{assignedByFirstName} {assignedByLastName}",
            //                    AssignedDate = device.AssignedDate,
            //                    RecievedBy = $"{receivedByFirstName} {receivedByLastName}",
            //                    Model = modelNo,
            //                    Comments = comments // Set Comments property after other properties
            //                };
            //            }

            //            return null; // Return null if no device is found with the given ID
            //        }
            catch (Exception ex)
            {
                // Log the exception or handle it appropriately
                throw;
            }

        }
    }
}
