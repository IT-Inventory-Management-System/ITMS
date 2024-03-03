using ITMS.Server.DTO;
using ITMS.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ITMS.Server.Services
{
    public interface IGetDeviceService
    {
        List<GetDeviceDTO> listDevices(Guid locationId);
        Task<IEnumerable<getComments>> listAllComments(Guid deviceId);
        Task<IEnumerable<GetDeviceDTO>> CheckDeviceStatus(String CYGID);

    }

    public class GetDeviceService: IGetDeviceService
    {
        private readonly ItinventorySystemContext _context;
        public GetDeviceService(ItinventorySystemContext context) {

            _context = context;
            
        }
        public List<GetDeviceDTO> listDevices(Guid locationId)
        {
            var result =        (from d in _context.Devices
                               .Where(log => log.LocationId == locationId)

                                join dm in _context.DeviceModel
                                on d.DeviceModelId equals dm.Id
                                join os in _context.Ostypes
                                on dm.Os equals os.Id
                                join st in _context.Statuses
                                on d.Status equals st.Id
                                join emp in _context.Employees
                                on d.AssignedTo equals emp.Id into employeeGroup
                                from emp in employeeGroup.DefaultIfEmpty()
                                select new GetDeviceDTO
                                {   Id = d.Id,
                                    Cygid = d.Cygid,
                                    AssignedTo = d.AssignedTo,
                                    RecievedBy = d.RecievedBy,
                                    Age = (DateTime.UtcNow - d.PurchasedDate.GetValueOrDefault()).TotalDays / 365,
                                    DeviceName = dm.DeviceName,
                                    Brand = dm.Brand,
                                    ModelNo = dm.ModelNo,
                                    Processor = dm.Processor,
                                    Os = os.Osname,
                                    Ram = dm.Ram,
                                    Storage = dm.Storage,
                                    SerialNumber = d.SerialNumber,
                                    LocationId = d.LocationId,
                                    PurchasedDate = d.PurchasedDate,
                                    WarrantyDate = d.WarrantyDate,
                                    AssignedDate = d.AssignedDate,
                                    AssignedToName = emp != null ? emp.FirstName + ' ' + emp.LastName : "",
                                    Status = st.Type,
                                   
                                }
                             ).ToList();
            return result;
        }



        public async Task<IEnumerable<GetDeviceDTO>> CheckDeviceStatus(String CYGID)
        {
            var result = await (from d in _context.Devices
                                where d.Cygid == CYGID
                                select new GetDeviceDTO
                                {
                                    Id = d.Id,
                                    AssignedTo = d.AssignedTo

                                }).ToListAsync();
            return result;
        }

        public async Task<IEnumerable<getComments>> listAllComments(Guid deviceId)
        {

            var result = await (
               from comment in _context.Comments
               join deviceLog in _context.DevicesLogs on comment.DeviceLogId equals deviceLog.Id into deviceLogGroup
               from deviceLog in deviceLogGroup.DefaultIfEmpty()
               where comment.DeviceId == deviceId
               orderby comment.CreatedAtUtc ascending
               select new
               {
                   Comment = comment,
                   DeviceLog = deviceLog
               }
           ).ToListAsync();
           
            var groupedComments = result.GroupBy(r => r.Comment.CreatedAtUtc.Date)
                .Select(group => new getComments
                {
                    UpdatedDate = group.Key,
                    Comments = group.Select(item => new singleComment
                    {
                        CreatedAtUtc = item.Comment.CreatedAtUtc,
                        CreatedBy = item.Comment.CreatedBy != null ? _context.Employees
                            .Where(e => e.Id == item.Comment.CreatedBy)
                            .Select(e => e.FirstName + " " + e.LastName)
                            .FirstOrDefault() : null,
                        AssignedTo = item.DeviceLog != null ?  _context.Employees
                            .Where(e => e.Id == item.DeviceLog.EmployeeId)
                            .Select(e => e.FirstName + " " + e.LastName)
                            .FirstOrDefault() : null,
                        Description = item.Comment.Description,
                        ReceivedBy = item.DeviceLog != null ? _context.Employees
                            .Where(e => e.Id == item.DeviceLog.RecievedBy)
                            .Select(e => e.FirstName + " " + e.LastName)
                            .FirstOrDefault() : null,
                        AssignedBy = item.DeviceLog != null ? _context.Employees
                            .Where(e => e.Id == item.DeviceLog.AssignedBy)
                            .Select(e => e.FirstName + " " + e.LastName)
                            .FirstOrDefault() : null,
                        ActionId = item.DeviceLog != null ? _context.ActionTables
                            .Where(e => e.Id == item.DeviceLog.ActionId)
                            .Select(action => action.ActionName)
                            .FirstOrDefault() : null,
                    }).ToList()
                });

            return groupedComments;


        }

    }
}

