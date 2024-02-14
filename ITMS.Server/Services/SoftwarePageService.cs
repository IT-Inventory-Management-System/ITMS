//using ITMS.Server.DTO;
//using ITMS.Server.Models;
//using Microsoft.CodeAnalysis;
//using Microsoft.CodeAnalysis.CSharp.Syntax;
//using Microsoft.EntityFrameworkCore;
//using System;
//using System.Linq;
//using Xamarin.Forms;


//namespace ITMS.Server.Services
//{
//    public class SoftwarePageService
//    {
//        private readonly ItinventorySystemContext _context;

//        public SoftwarePageService(ItinventorySystemContext context)
//        {
//            _context = context;
//        }


//        public List<SoftwarePage> GetSoftware()
//        {
//            var software = _context.SoftwareTypes
//                .Include(s => s.Softwares)
//                .ThenInclude(s => s.SoftwareAllocations)
//                .SelectMany(s => s.Softwares.Select(software => new SoftwarePage
//                {
//                    name = software.SoftwareName,
//                    SoftwareThumbnail = software.SoftwareThumbnail,
//                    version = software.SoftwareAllocations
//                             .Where(sa => sa.SoftwareId == software.Id) 
//                             .Select(sa => sa.Version)
//                             .Distinct()
//                             .ToList(),
//                    type =s.TypeName
//                }));

//            return software.ToList();
//        }

//        public SingleSoftwareSelected? GetSingleSelected(SingleSoftwareSelectedParams parameters)
//        {
//            var specsToBeReturned = (from s in _context.Software
//                                     join sa in _context.SoftwareAllocations on s.Id equals sa.SoftwareId into softwareGroup
//                                     from software in softwareGroup.DefaultIfEmpty()

//                                     join t in _context.SoftwareTypes on s.SoftwareTypeId equals t.Id into typeGroup
//                                     from type in typeGroup.DefaultIfEmpty()

//                                     join l in _context.Locations on software.LocationId equals l.Id into locationGroup
//                                     from location in locationGroup.DefaultIfEmpty()

//                                     where s.SoftwareName == parameters.name &&
//                                           (software == null || software.Version == parameters.version) &&
//                                           (location == null || location.Location1 == parameters.location) &&
//                                           (type == null || type.TypeName == parameters.type)

//                                     select new SingleSoftwareSelected
//                                     {
//                                         Name = s.SoftwareName, 
//                                         Version = software != null ? software.Version : null,
//                                         Type = type != null ? type.TypeName : null,
//                                         Assigned = s.SoftwareAllocations.Count(software => software.AssignedTo != null && software.Version!=null && software.Version == parameters.version),
//                                         Inventory = s.SoftwareAllocations.Count(software => software.AssignedTo == null && software.Version != null && software.Version == parameters.version),
//                                         PurchaseDates = s.SoftwareAllocations.Where(sa => sa.PurchasedDate != null && sa.Version == parameters.version)
//                                                                             .Select(sa => sa.PurchasedDate)
//                                                                             .ToList(),
//                                         ExpiryDates = s.SoftwareAllocations.Where(sa => sa.ExpiryDate != null && sa.Version == parameters.version)
//                                                                             .Select(sa => sa.ExpiryDate)
//                                                                             .ToList(),
//                                         ExpDate = s.SoftwareAllocations
//                                                  .Where(sa => sa.ExpiryDate.HasValue && sa.Location.Location1 == parameters.location && sa.Version == parameters.version)
//                                                  .OrderByDescending(sa => sa.ExpiryDate)
//                                                  .Select(sa => sa.ExpiryDate)
//                                                  .FirstOrDefault(),

//                                         ExpiryDateCount = s.SoftwareAllocations
//                                                          .Where(sa => sa.ExpiryDate.HasValue && sa.Location.Location1 == parameters.location && sa.Version == parameters.version)
//                                                          .Select(sa => sa.ExpiryDate)
//                                                          .Distinct()
//                                                          .Count(),
//                                     }).FirstOrDefault();


//            return specsToBeReturned;
//        }

//        public List<SingleSoftwareHistory> GetSingleHistory(SingleSoftwareSelectedParams parameters)
//        {
//            var singleHistory = (from s in _context.Software
//                                 join sa in _context.SoftwareAllocations on s.Id equals sa.SoftwareId into softwareGroup
//                                 from software in softwareGroup.DefaultIfEmpty()

//                                 join emp in _context.Employees on software.AssignedTo equals emp.Id into employeeGroup
//                                 from employee in employeeGroup.DefaultIfEmpty()

//                                 join l in _context.Locations on software.LocationId equals l.Id into locationGroup
//                                 from location in locationGroup.DefaultIfEmpty()

//                                 join t in _context.SoftwareTypes on s.SoftwareTypeId equals t.Id into typeGroup
//                                 from type in typeGroup.DefaultIfEmpty()

//                                 where s.SoftwareName == parameters.name &&
//                                 (software == null || software.Version == parameters.version && software.AssignedTo!=null) &&
//                                 (location == null || location.Location1 == parameters.location) &&
//                                 (type == null || type.TypeName == parameters.type)
//                                 select new SingleSoftwareHistory
//                                 {
//                                     assignedTo = employee.FirstName + " " + employee.LastName,
//                                     assignedToCGI = employee.Cgiid,
//                                     assignedBy = $"{_context.Employees.FirstOrDefault(emp => emp.Id == software.AssignedTo).FirstName} {_context.Employees.FirstOrDefault(emp => emp.Id == software.AssignedTo).LastName}".Trim(),
//                                     //s.SoftwareAllocations.FirstOrDefault()?.AssignedBy,
//                                     assignedDate = software.AssignedDate,

//                                 }).ToList();

//            return singleHistory;
//        }
//    }
//}




using ITMS.Server.DTO;
using ITMS.Server.Models;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using Xamarin.Forms;


namespace ITMS.Server.Services
{
    public class SoftwarePageService
    {
        private readonly ItinventorySystemContext _context;

        public SoftwarePageService(ItinventorySystemContext context)
        {
            _context = context;
        }


        public List<SoftwarePage> GetSoftware()
        {
            var software = _context.SoftwareTypes
                .Include(s => s.Softwares)
                .ThenInclude(s => s.SoftwareAllocations)
                .SelectMany(s => s.Softwares.Select(software => new SoftwarePage
                {
                    name = software.SoftwareName,
                    SoftwareThumbnail = software.SoftwareThumbnail,
                    version = software.SoftwareAllocations
                             .Where(sa => sa.SoftwareId == software.Id)
                             .Select(sa => sa.Version)
                             .Distinct()
                             .ToList(),
                    type = s.TypeName
                }));

            return software.ToList();
        }

        public SingleSoftwareSelected? GetSingleSelected(SingleSoftwareSelectedParams parameters)
        {
            var specsToBeReturned = (from s in _context.Software
                                     join sa in _context.SoftwareAllocations on s.Id equals sa.SoftwareId into softwareGroup
                                     from software in softwareGroup.DefaultIfEmpty()

                                     join t in _context.SoftwareTypes on s.SoftwareTypeId equals t.Id into typeGroup
                                     from type in typeGroup.DefaultIfEmpty()

                                     join l in _context.Locations on software.LocationId equals l.Id into locationGroup
                                     from location in locationGroup.DefaultIfEmpty()

                                     where s.SoftwareName == parameters.name &&
                                           (software == null || software.Version == parameters.version) &&
                                           (location == null || location.Location1 == parameters.location) &&
                                           (type == null || type.TypeName == parameters.type)

                                     select new SingleSoftwareSelected
                                     {
                                         Name = s.SoftwareName,
                                         Version = software != null ? software.Version : null,
                                         Type = type != null ? type.TypeName : null,
                                         Assigned = s.SoftwareAllocations.Count(software => software.AssignedTo != null && software.Version != null && software.Version == parameters.version),
                                         Inventory = s.SoftwareAllocations.Count(software => software.AssignedTo == null && software.Version != null && software.Version == parameters.version),
                                         PurchaseDates = s.SoftwareAllocations.Where(sa => sa.PurchasedDate != null && sa.Version == parameters.version)
                                                                             .Select(sa => sa.PurchasedDate)
                                                                             .ToList(),
                                         ExpiryDates = s.SoftwareAllocations.Where(sa => sa.ExpiryDate != null && sa.Version == parameters.version)
                                                                             .Select(sa => sa.ExpiryDate)
                                                                             .ToList(),
                                         ExpDate = s.SoftwareAllocations
                                                  .Where(sa => sa.ExpiryDate.HasValue && sa.Location.Location1 == parameters.location && sa.Version == parameters.version)
                                                  .OrderByDescending(sa => sa.ExpiryDate)
                                                  .Select(sa => sa.ExpiryDate)
                                                  .FirstOrDefault(),

                                         ExpiryDateCount = s.SoftwareAllocations
                                                          .Where(sa => sa.ExpiryDate.HasValue && sa.Location.Location1 == parameters.location && sa.Version == parameters.version)
                                                          .Select(sa => sa.ExpiryDate)
                                                          .Distinct()
                                                          .Count(),
                                     }).FirstOrDefault();


            return specsToBeReturned;
        }

        public List<SingleSoftwareHistory> GetSingleHistory(SingleSoftwareSelectedParams parameters)
        {
            var singleHistory = (from s in _context.Software
                                 join sa in _context.SoftwareAllocations on s.Id equals sa.SoftwareId into softwareGroup
                                 from software in softwareGroup.DefaultIfEmpty()

                                 join emp in _context.Employees on software.AssignedTo equals emp.Id into employeeGroup
                                 from employee in employeeGroup.DefaultIfEmpty()

                                 join l in _context.Locations on software.LocationId equals l.Id into locationGroup
                                 from location in locationGroup.DefaultIfEmpty()

                                 join t in _context.SoftwareTypes on s.SoftwareTypeId equals t.Id into typeGroup
                                 from type in typeGroup.DefaultIfEmpty()

                                 where s.SoftwareName == parameters.name &&
                                 (software == null || software.Version == parameters.version && software.AssignedTo != null) &&
                                 (location == null || location.Location1 == parameters.location) &&
                                 (type == null || type.TypeName == parameters.type)
                                 select new SingleSoftwareHistory
                                 {
                                     assignedTo = employee.FirstName + " " + employee.LastName,
                                     assignedToCGI = employee.Cgiid,
                                     assignedBy = $"{_context.Employees.FirstOrDefault(emp => emp.Id == software.AssignedTo).FirstName} {_context.Employees.FirstOrDefault(emp => emp.Id == software.AssignedTo).LastName}".Trim(),
                                     //s.SoftwareAllocations.FirstOrDefault()?.AssignedBy,
                                     assignedDate = software.AssignedDate,

                                 }).ToList();

            return singleHistory;
        }
    }
}