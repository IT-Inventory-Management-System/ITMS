﻿using ITMS.Server.DTO;
using ITMS.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace ITMS.Server.Services
{
    public interface IGetDeviceService
    {
        Task<IEnumerable<GetDeviceDTO>> listDevices();
        Task<IEnumerable<GetDeviceDTO>> CheckDeviceStatus(String CYGID);
    }

    public class GetDeviceService: IGetDeviceService
    {
        private readonly ItinventorySystemContext _context;
        public GetDeviceService(ItinventorySystemContext context) {

            _context = context;
            
        }
        public async Task<IEnumerable<GetDeviceDTO>> listDevices()
        {
            var result = await (from d in _context.Devices
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
                             ).ToListAsync();
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
    }
}

