using ITMS.Server.DTO;
using ITMS.Server.Models;
using Microsoft.EntityFrameworkCore;
using System;


namespace ITMS.Server.Services
{
    public class DashboardService
    {
        private readonly ItinventorySystemContext _context;

        public DashboardService(ItinventorySystemContext context)
        {
            _context = context;
        }

        public List<Accessories> GetAccessories()
        {
            var allCategories = _context.Categories
    .Where(c => c.Name != "Laptop" && c.Name != "Desktop" && c.Name != "Software").Include(dm => dm.DeviceModels).ThenInclude(d => d.Devices)
    .ToList();

            List<Accessories> allaccessories = new List<Accessories>();
            foreach (var category in allCategories)
            {
                Accessories accessories = new Accessories();
                accessories.Name = category.Name;
                accessories.Total = category.DeviceModels
                        .SelectMany(dm => dm.Devices)
                        .Count();
                accessories.Assigned = category.DeviceModels
            .SelectMany(dm => dm.Devices)
            .Count(device => device.AssignedTo != null);
                allaccessories.Add(accessories);
            }


            return allaccessories;
        }

        public List<Softwares> GetSoftwares()
        {
            var allSoftware = _context.SoftwareTypes
                .Include(st => st.Softwares)
                    .ThenInclude(s => s.SoftwareAllocations)
                .SelectMany(st => st.Softwares.Select(s => new Softwares
                {
                    Name = s.SoftwareName,
                    Version = s.version,
                    Type = st.TypeName,

                    // Add other properties as needed
                }))
                .ToList();

            return allSoftware;
        }
        public List<Primary> GetPrimary()
        {
            var primary = _context.Ostypes.Include(o => o.DeviceModels).ThenInclude(d => d.Devices);
            //DeviceModel.Where(dm=>dm.Os!=null).Include(d => d.Devices);
            List<Primary> allprimary = new List<Primary>();
            //return primary;

            foreach (var p in primary)
            {
                Primary prime = new Primary();
                prime.Name = p.Osname;
                prime.Total = p.DeviceModels
                        .SelectMany(dm => dm.Devices)
                        .Count();
                prime.Assigned = p.DeviceModels
            .SelectMany(dm => dm.Devices)
            .Count(device => device.AssignedTo != null);
                allprimary.Add(prime);
            }

            var allCategories = _context.Categories
        .Where(c => c.Name == "Monitor" || c.Name == "Mobile")
        .Include(dm => dm.DeviceModels)
        .ThenInclude(d => d.Devices)
        .ToList();

            foreach (var category in allCategories)
            {
                Primary prime = new Primary();
                prime.Name = category.Name;
                prime.Total = category.DeviceModels
                    .SelectMany(dm => dm.Devices)
                    .Count();
                prime.Assigned = category.DeviceModels
                    .SelectMany(dm => dm.Devices)
                    .Count(device => device.AssignedTo != null);
                allprimary.Add(prime);
            }

            return allprimary;
        }



        public List<Logs> GetLogs()
        {
            var deviceLogs = _context.DevicesLogs
     .Include(dl => dl.Device)
         .ThenInclude(d => d.DeviceModel)
             .ThenInclude(dm => dm.Category)
     .Include(dl => dl.Employee) 
     .Include(dl => dl.Action) 
     .OrderByDescending(dl => dl.UpdatedAtUtc)
     .Take(10)
     .ToList();

            var logsList = deviceLogs.Select(dl => new Logs
            {

                UpdatedBy = _context.Employees
    .Where(e => e.Id == dl.AssignedBy && dl.AssignedBy != null)
    .Select(e => e.FirstName+e.LastName)
    .FirstOrDefault(),

                CYGID = dl.Device.Cygid,

                Category = dl.Device.DeviceModel.Category.Name,

                SubmittedTo = _context.Employees
    .Where(e => e.Id == dl.RecievedBy && dl.RecievedBy != null)
    .Select(e => e.FirstName + e.LastName)
    .FirstOrDefault(),

                AssignedTo = _context.Employees
    .Where(e => e.Id == dl.EmployeeId)
    .Select(e => e.FirstName + e.LastName)
    .FirstOrDefault(),

                Action = dl.Action.ActionName
            }).ToList();

            return logsList;
        }
    }
}
