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



     

       public List<Logs> GetLogsForLocation(Guid locationName, int takeCount)
        {
            var deviceLogs = _context.DevicesLogs
                             .Include(dl => dl.UpdatedByNavigation)
                             .Include(dl => dl.Action)
                             .Where(dl => dl.DeviceId != null ? dl.Device.LocationId == locationName : dl.SoftwareAllocationNavigation.LocationId == locationName)
                             .Select(s => new Logs
                             {
                                 CYGID = s.DeviceId!=null?s.Device.Cygid:null,

                                 //UpdatedBy = s.UpdatedByNavigation.FirstName + " " + s.UpdatedByNavigation.LastName != null ? s.UpdatedByNavigation.LastName : null,
                                 UpdatedBy = (s.UpdatedByNavigation.FirstName + " " + (s.UpdatedByNavigation.LastName != null ? s.UpdatedByNavigation.LastName : null)),

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

                             }).OrderByDescending(group => group.UpdatedOn).ToList();


            return deviceLogs;
        }
    }
}
