//using ITMS.Server.DTO;
//using ITMS.Server.Models;
//using Microsoft.EntityFrameworkCore;
//using System.Text;




//public class EmployeeService
//{
//    private readonly ItinventorySystemContext _context;

//    public EmployeeService(ItinventorySystemContext context)
//    {
//        _context = context;
//    }


//    public List<UserDeviceHistory> GetDevices(Guid id)
//    {
//        try
//        {
//            var devicesWithComments = _context.DevicesLogs
//                .Where(log => log.EmployeeId == id)
//                .Include(e => e.Employee)
//                .Include(d => d.Device)
//                    .ThenInclude(dm => dm.DeviceModel)
//                .Select(log => new UserDeviceHistory
//                {
//                    cygid = log.Device.Cygid,
//                    Model = log.Device.DeviceModel.ModelNo,
//                    AssignBy = _context.Employees
//                        .Where(employee => employee.Id == log.Device.AssignedBy)
//                        .Select(employee => $"{employee.FirstName} {employee.LastName}")
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



//}




