using ITMS.Server.DTO;
using ITMS.Server.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using Xamarin.Forms;


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
                accessories.TotalIndia = category.DeviceModels
                        .SelectMany(dm => dm.Devices)
                        .Count(device => device.Location != null && device.Location.Location1 == "India");
                accessories.AssignedIndia = category.DeviceModels
            .SelectMany(dm => dm.Devices)
            .Count(device => device.AssignedTo != null && device.Location != null && device.Location.Location1 == "India");


                accessories.TotalUSA = category.DeviceModels
                      .SelectMany(dm => dm.Devices)
                      .Count(device => device.Location != null && device.Location.Location1 == "USA");
                accessories.AssignedUSA = category.DeviceModels
            .SelectMany(dm => dm.Devices)
            .Count(device => device.AssignedTo != null && device.Location != null && device.Location.Location1 == "USA");



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
         SoftwareThumbnail = s.SoftwareThumbnail,
         Name = s.SoftwareName,
         Version = s.SoftwareAllocations.Select(sa => sa.Version).FirstOrDefault(),
         Type = st.TypeName,
        
         IndiaInventory = s.SoftwareAllocations
             .Count(s=>s.Location != null && s.Location.Location1 == "India"),

         UsaInventory = s.SoftwareAllocations
             .Count(s => s.Location != null && s.Location.Location1 == "USA"),

         IndiaAssigned = s.SoftwareAllocations
             .Count(s => s.AssignedTo != null && s.Location != null && s.Location.Location1 == "India"),

         UsaAssigned = s.SoftwareAllocations
             .Count(s => s.AssignedTo != null && s.Location != null && s.Location.Location1 == "USA"),


         ExpiryDateCountIndia = s.SoftwareAllocations
    .Where(sa => sa.ExpiryDate.HasValue && sa.Location.Location1 == "India")
    .OrderByDescending(sa => sa.ExpiryDate)
    .AsEnumerable()
    .GroupBy(sa => sa.ExpiryDate.Value)
    .Select(group => group.Count())
    .FirstOrDefault(),

         ExpDateIndia = s.SoftwareAllocations
            .Where(sa => sa.ExpiryDate.HasValue && sa.Location.Location1 == "India")
            .OrderByDescending(sa => sa.ExpiryDate)
            .Select(sa => sa.ExpiryDate.Value)
            .FirstOrDefault(),




         ExpiryDateCountUsa = s.SoftwareAllocations
    .Where(sa => sa.ExpiryDate.HasValue && sa.Location.Location1 == "USA")
    .OrderByDescending(sa => sa.ExpiryDate)
    .AsEnumerable()
    .GroupBy(sa => sa.ExpiryDate.Value)
    .Select(group => group.Count())
    .FirstOrDefault(),

         ExpDateUsa = s.SoftwareAllocations
            .Where(sa => sa.ExpiryDate.HasValue && sa.Location.Location1 == "USA")
            .OrderByDescending(sa => sa.ExpiryDate)
            .Select(sa => sa.ExpiryDate.Value)
            .FirstOrDefault(),

     }))
     .ToList();


            return allSoftware;
        }
        public List<List<Primary>> GetPrimary()
        {
            var primary = _context.Ostypes.Include(o => o.DeviceModels).ThenInclude(d => d.Devices).ThenInclude(l=>l.Location);
            //DeviceModel.Where(dm=>dm.Os!=null).Include(d => d.Devices);
            List<List<Primary>> allprimary = new List<List<Primary>>();
            //return primary;

            foreach (var p in primary)
            {
                List<Primary> listOfYearsPrimary = new List<Primary>();
                for (var i = -1; i < 4; i++)
                {
                    Primary prime = new Primary();
                    prime.Name = p.Osname;
                    //.SelectMany(dm => dm.Devices).Where(l => l.Location == "India")
                    if (i == -1)
                    {
                        prime.TotalIndia = p.DeviceModels
                                .SelectMany(dm => dm.Devices)
                                .Count(device => device.Location != null && device.Location.Location1 == "India"); 

                        prime.AssignedIndia = p.DeviceModels
                                .SelectMany(dm => dm.Devices)
                                .Count(device => device.AssignedTo != null && device.Location != null && device.Location.Location1 == "India");

                        prime.TotalUSA = p.DeviceModels
                               .SelectMany(dm => dm.Devices)
                               .Count(device => device.Location != null && device.Location.Location1 == "USA");

                        prime.AssignedUSA = p.DeviceModels
                                .SelectMany(dm => dm.Devices)
                                .Count(device => device.AssignedTo != null && device.Location != null && device.Location.Location1 == "USA");
                    }
                    else
                    {
                        prime.TotalIndia = p.DeviceModels
                            .SelectMany(dm => dm.Devices)
                            .Count(device => device.CreatedAtUtc >= DateTime.UtcNow.AddYears(-i - 1) && device.CreatedAtUtc < DateTime.UtcNow.AddYears(-i)
                                   && device.Location != null && device.Location.Location1 == "India");

                        prime.AssignedIndia = p.DeviceModels
                            .SelectMany(dm => dm.Devices)
                            .Count(device => device.CreatedAtUtc >= DateTime.UtcNow.AddYears(-i - 1) && device.CreatedAtUtc < DateTime.UtcNow.AddYears(-i) && device.AssignedTo != null
                                   && device.Location != null && device.Location.Location1 == "India");

                        prime.TotalUSA = p.DeviceModels
                           .SelectMany(dm => dm.Devices)
                           .Count(device => device.CreatedAtUtc >= DateTime.UtcNow.AddYears(-i - 1) && device.CreatedAtUtc < DateTime.UtcNow.AddYears(-i)
                                  && device.Location != null && device.Location.Location1 == "USA");

                        prime.AssignedUSA = p.DeviceModels
                            .SelectMany(dm => dm.Devices)
                            .Count(device => device.CreatedAtUtc >= DateTime.UtcNow.AddYears(-i - 1) && device.CreatedAtUtc < DateTime.UtcNow.AddYears(-i) && device.AssignedTo != null
                            && device.Location != null && device.Location.Location1 == "USA");

                    }

                    listOfYearsPrimary.Add(prime);
                }
                allprimary.Add(listOfYearsPrimary);
            }

            var allCategories = _context.Categories
        .Where(c => c.Name == "Monitor" || c.Name == "Mobile Devices")
        .Include(dm => dm.DeviceModels)
        .ThenInclude(d => d.Devices)
        .ToList();

            foreach (var category in allCategories)
            {
                List<Primary> listOfYearsPrimary = new List<Primary>();
                for (var i = -1; i < 4; i++)
                {
                    Primary prime = new Primary();
                    prime.Name = category.Name;

                    if (i == -1)
                    {
                        prime.TotalIndia = category.DeviceModels
                            .SelectMany(dm => dm.Devices)
                            .Count(device => device.Location != null && device.Location.Location1 == "India");

                        prime.AssignedIndia = category.DeviceModels
                            .SelectMany(dm => dm.Devices)
                        .Count(device => device.AssignedTo != null && device.Location != null && device.Location.Location1 == "India");

                        prime.TotalUSA = category.DeviceModels
                        .SelectMany(dm => dm.Devices)
                           .Count(device => device.Location != null && device.Location.Location1 == "USA");

                        prime.AssignedUSA = category.DeviceModels
                            .SelectMany(dm => dm.Devices)
                            .Count(device => device.AssignedTo != null && device.Location != null && device.Location.Location1 == "USA");
                    }
                    else
                    {
                        prime.TotalIndia = category.DeviceModels
                            .SelectMany(dm => dm.Devices)
                            .Count(device => device.CreatedAtUtc >= DateTime.UtcNow.AddYears(-i - 1) && device.CreatedAtUtc < DateTime.UtcNow.AddYears(-i)
                                   && device.Location != null && device.Location.Location1 == "India");

                        prime.AssignedIndia = category.DeviceModels
                            .SelectMany(dm => dm.Devices)
                            .Count(device => device.CreatedAtUtc >= DateTime.UtcNow.AddYears(-i - 1) && device.CreatedAtUtc < DateTime.UtcNow.AddYears(-i) && device.AssignedTo != null
                                   && device.Location != null && device.Location.Location1 == "India");

                        prime.TotalUSA = category.DeviceModels
                           .SelectMany(dm => dm.Devices)
                           .Count(device => device.CreatedAtUtc >= DateTime.UtcNow.AddYears(-i - 1) && device.CreatedAtUtc < DateTime.UtcNow.AddYears(-i)
                                  && device.Location != null && device.Location.Location1 == "USA");

                        prime.AssignedUSA = category.DeviceModels
                            .SelectMany(dm => dm.Devices)
                            .Count(device => device.CreatedAtUtc >= DateTime.UtcNow.AddYears(-i - 1) && device.CreatedAtUtc < DateTime.UtcNow.AddYears(-i) && device.AssignedTo != null
                                   && device.Location != null && device.Location.Location1 == "USA");
                    }

                    listOfYearsPrimary.Add(prime);
                }
                allprimary.Add(listOfYearsPrimary);
            }


            return allprimary;
        }



        public List<Logs> GetLogs()
        {
            //       var deviceLogs = _context.DevicesLogs
            //.Include(dl => dl.Device)
            //    .ThenInclude(d => d.DeviceModel)
            //        .ThenInclude(dm => dm.Category)
            //.Include(dl => dl.Employee) 
            //.Include(dl => dl.Action) 
            //.OrderByDescending(dl => dl.UpdatedAtUtc)
            //.Take(10)
            //.ToList();


            //        var deviceLogs = _context.DevicesLogs
            //.OrderByDescending(dl => dl.UpdatedAtUtc)
            //.Take(10)
            //.Join(
            //    _context.Devices,
            //    dl => dl.DeviceId,
            //    d => d.Id,
            //    (dl, d) => new { dl, d })
            //.Join(
            //    _context.DeviceModel,
            //    dl => dl.d.DeviceModelId,
            //    dm => dm.Id,
            //    (dl, dm) => new { dl, dm })
            //.Join(
            //    _context.Categories,
            //    dl => dl.dm.CategoryId,
            //    c => c.Id,
            //    (dl, c) => new { dl, c })
            //.Join(
            //    _context.Employees,
            //    dl => dl.d.EmployeeId,
            //    e => e.Id,
            //    (dl, e) => new { dl, e })
            //.Join(
            //    _context.ActionTables,
            //    dl => dl.d.ActionId,
            //    a => a.Id,
            //    (dl, a) => new { dl, a })
            //.OrderByDescending(dl => dl.dl.dl.dl.dl.dl.dl.UpdatedAtUtc)
            //.Take(10)
            //.ToList();


            //var deviceLogs = (from dl in _context.DevicesLogs
            //                  join d in _context.Devices on dl.DeviceId equals d.Id into deviceGroup
            //                  from device in deviceGroup.DefaultIfEmpty()

            //                  join l in _context.Locations on device.LocationId equals l.Id into locationGroup
            //                  from location in locationGroup.DefaultIfEmpty()

            //                  join dm in _context.DeviceModel on device.DeviceModelId equals dm.Id into deviceModelGroup
            //                  from deviceModel in deviceModelGroup.DefaultIfEmpty()

            //                  join c in _context.Categories on deviceModel.CategoryId equals c.Id into categoryGroup
            //                  from category in categoryGroup.DefaultIfEmpty()

            //                  join e in _context.Employees on dl.EmployeeId equals e.Id into employeeGroup
            //                  from employee in employeeGroup.DefaultIfEmpty()

            //                  join a in _context.ActionTables on dl.ActionId equals a.Id into actionGroup
            //                  from action in actionGroup.DefaultIfEmpty()

            //                  where location != null && location.Location1 == "India"

            //                  orderby dl.UpdatedAtUtc descending
            //                  select new
            //                  {
            //                      DeviceLog = dl,
            //                      Device = device,
            //                      DeviceModel = deviceModel,
            //                      Category = category,
            //                      Employee = employee,
            //                      Action = action,
            //                      Location = location,
            //                  })
            //        .Take(10)
            //        .ToList();


            //var logsList = deviceLogs.Select(dl => new Logs
            //{
            //    UpdatedBy = _context.Employees
            //   .Where(e => e.Id == dl.DeviceLog.AssignedBy && dl.DeviceLog.AssignedBy != null)
            //   .Select(e => e.FirstName +" " + e.LastName)
            //   .FirstOrDefault(),

            //    CYGID = dl.Device?.Cygid,

            //    Category = dl.Device?.DeviceModel?.Category?.Name,

            //    SubmittedTo = _context.Employees
            //   .Where(e => e.Id == dl.DeviceLog.RecievedBy && dl.DeviceLog.RecievedBy != null)
            //   .Select(e => e.FirstName + e.LastName)
            //   .FirstOrDefault(),

            //    AssignedTo = _context.Employees
            //   .Where(e => e.Id == dl.DeviceLog.EmployeeId)
            //   .Select(e => e.FirstName +" " + e.LastName)
            //   .FirstOrDefault(),

            //    Action = dl.Action?.ActionName,

            //    UpdatedOn = (DateTime)dl.DeviceLog.UpdatedAtUtc
            //}).ToList();

            //var indiaDeviceLogs = GetLogsForLocation("India", 10);
            //var usaDeviceLogs = GetLogsForLocation("USA", 10);

            // return indiaDeviceLogs.Concat(usaDeviceLogs).ToList();'
            return null;
        }

       public List<Logs> GetLogsForLocation(Guid locationName, int takeCount)
        {
            var deviceLogs = _context.DevicesLogs
                             .Include(dl => dl.UpdatedByNavigation)
                             .Include(dl => dl.Action)
                             .Where(dl => dl.DeviceId != null ? dl.Device.LocationId == locationName : dl.SoftwareAllocationNavigation.LocationId == locationName)
                             .Select(s => new Logs
                             {
                                 CYGID = s.DeviceId!=null?s.Device.Cygid:null,

                                 UpdatedBy = s.UpdatedByNavigation.FirstName+" "+ s.UpdatedByNavigation.LastName != null? s.UpdatedByNavigation.LastName:null,

                                 SubmittedTo = s.RecievedBy != null ? _context.Employees
                                              .Where(e => (e.Id == s.RecievedBy) && (s.DeviceId != null ? s.Device.LocationId == locationName : s.SoftwareAllocationNavigation.LocationId == locationName))
                                              .Select(e => e.FirstName + " " + e.LastName)
                                              .FirstOrDefault() : null,

                                 AssignedTo = s.EmployeeId!= null? _context.Employees
                                              .Where(e => (e.Id == s.EmployeeId) && (s.DeviceId!=null?s.Device.LocationId == locationName:s.SoftwareAllocationNavigation.LocationId==locationName))
                                              .Select(e => e.FirstName + " " + e.LastName)
                                              .FirstOrDefault():
                                              null,

                                 SoftwareName = s.SoftwareAllocation != null? s.SoftwareAllocationNavigation.Software.SoftwareName:null,

                                 Category = s.DeviceId != null? s.Device.DeviceModel.Category.Name : null,
                                 Action = s.Action.ActionName,
                                 UpdatedOn = s.UpdatedAtUtc,

                             }).ToList();

            return deviceLogs;
        }
    }
}
