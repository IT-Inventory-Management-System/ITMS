﻿using ITMS.Server.DTO;
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
         SoftwareThumbnail = s.SoftwareThumbnail,
         Name = s.SoftwareName,
         Version = s.Version,
         Type = st.TypeName,
         Inventory = s.SoftwareAllocations
             .Count(),  

         Assigned = s.SoftwareAllocations
             .Count(sa => sa.AssignedTo != null),  

         ExpiryDateCount = s.SoftwareAllocations
            .Where(sa => sa.ExpiryDate.HasValue)
            .OrderByDescending(sa => sa.ExpiryDate)
            .AsEnumerable()
            .GroupBy(sa => sa.ExpiryDate.Value)
            .Select(group => group.Count())
            .FirstOrDefault(),

         ExpDate = s.SoftwareAllocations
            .Where(sa => sa.ExpiryDate.HasValue)
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

            var indiaDeviceLogs = GetLogsForLocation("India", 10);
            var usaDeviceLogs = GetLogsForLocation("USA", 10);

            return indiaDeviceLogs.Concat(usaDeviceLogs).ToList();
        }

       public List<Logs> GetLogsForLocation(string locationName, int takeCount)
        {
            var deviceLogs = (from dl in _context.DevicesLogs
                    join d in _context.Devices on dl.DeviceId equals d.Id into deviceGroup
                    from device in deviceGroup.DefaultIfEmpty()

                    join l in _context.Locations on device.LocationId equals l.Id into locationGroup
                    from location in locationGroup.DefaultIfEmpty()

                    join dm in _context.DeviceModel on device.DeviceModelId equals dm.Id into deviceModelGroup
                    from deviceModel in deviceModelGroup.DefaultIfEmpty()

                    join c in _context.Categories on deviceModel.CategoryId equals c.Id into categoryGroup
                    from category in categoryGroup.DefaultIfEmpty()

                    join e in _context.Employees on dl.EmployeeId equals e.Id into employeeGroup
                    from employee in employeeGroup.DefaultIfEmpty()

                    join a in _context.ActionTables on dl.ActionId equals a.Id into actionGroup
                    from action in actionGroup.DefaultIfEmpty()

                    where location != null && location.Location1 == locationName

                    orderby dl.UpdatedAtUtc descending
                    select new
                    {
                        DeviceLog = dl,
                        Device = device,
                        DeviceModel = deviceModel,
                        Category = category,
                        Employee = employee,
                        Action = action,
                        Location = location,
                    })
                   .Take(takeCount)
                   .ToList();

            var logsList = deviceLogs.Select(dl => new Logs
            {
                UpdatedBy = _context.Employees
              .Where(e => e.Id == dl.DeviceLog.AssignedBy && dl.DeviceLog.AssignedBy != null)
              .Select(e => e.FirstName + " " + e.LastName)
              .FirstOrDefault(),

                CYGID = dl.Device?.Cygid,

                Category = dl.Device?.DeviceModel?.Category?.Name,

                SubmittedTo = _context.Employees
              .Where(e => e.Id == dl.DeviceLog.RecievedBy && dl.DeviceLog.RecievedBy != null)
              .Select(e => e.FirstName + e.LastName)
              .FirstOrDefault(),

                AssignedTo = _context.Employees
              .Where(e => e.Id == dl.DeviceLog.EmployeeId)
              .Select(e => e.FirstName + " " + e.LastName)
              .FirstOrDefault(),

                Action = dl.Action?.ActionName,

                UpdatedOn = (DateTime)dl.DeviceLog.UpdatedAtUtc,

                Location = locationName
            }).ToList();


            return logsList;
        }
    }
}
