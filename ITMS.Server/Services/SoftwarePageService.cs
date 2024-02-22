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
using Prism.Xaml;
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

        public List<SoftwarePage> GetSoftware(string country,bool archive)
        {
            //var softwares = _context.Software
            //                .Include(s => s.SoftwareType)
            //                //.Where(s => s.SoftwareAllocations.Any(sa => sa.Location.Location1 == country)) 
            //                .SelectMany(s => s.SoftwareAllocations.Where(sa => sa.Location.Location1 == country && sa.IsArchived == archive)
            //                .Select(sa => new SoftwarePage
            //                {
            //                  name = s.SoftwareName,
            //                  SoftwareThumbnail = s.SoftwareThumbnail,
            //                  type = s.SoftwareType.TypeName,
            //                  version = sa.Version,
            //                  isArchived = sa.IsArchived,
            //                  inStock = s.SoftwareAllocations.Count(sa => sa.Location.Location1 == country && sa.IsArchived == false && sa.Version==sa.Version),

            //                }))
            //                .GroupBy(sp => new { sp.name, sp.SoftwareThumbnail, sp.type, sp.version, sp.isArchived }) 
            //                .Select(g => g.First())
            //                .ToList();

            var softwares = _context.Software
    .Include(s => s.SoftwareType)
    .SelectMany(s => s.SoftwareAllocations
        .Where(sa => sa.Location.Location1 == country && sa.IsArchived == archive)
        .Select(sa => new
        {
            SoftwareName = s.SoftwareName,
            SoftwareThumbnail = s.SoftwareThumbnail,
            SoftwareTypeName = s.SoftwareType.TypeName,
            Version = sa.Version,
            IsArchived = sa.IsArchived
        }))
    .GroupBy(sa => new
    {
        sa.SoftwareName,
        sa.SoftwareThumbnail,
        sa.SoftwareTypeName,
        sa.Version,
        sa.IsArchived
    })
    .Select(g => new SoftwarePage
    {
        name = g.Key.SoftwareName,
        SoftwareThumbnail = g.Key.SoftwareThumbnail,
        type = g.Key.SoftwareTypeName,
        version = g.Key.Version,
        isArchived = g.Key.IsArchived,
        inStock = _context.SoftwareAllocations
            .Count(sa => sa.Software.SoftwareName == g.Key.SoftwareName
                && sa.Version == g.Key.Version
                && sa.Location.Location1 == country
                && sa.AssignedTo == null),
        purchaseDates = _context.SoftwareAllocations.Where(sa => sa.Software.SoftwareName == g.Key.SoftwareName
                && sa.Version == g.Key.Version
                && sa.Location.Location1 == country).Select(sa => sa.PurchasedDate).Distinct().ToList(),
    })
    .ToList();



            return softwares;
        }

        //public List<SoftwarePage> GetSoftware(string country)
        //{
        //    var software = _context.SoftwareTypes
        //        .Include(s => s.Softwares)
        //            .ThenInclude(s => s.SoftwareAllocations)
        //                .ThenInclude(sa => sa.Location)
        //        .SelectMany(s => s.Softwares.Select(software => new SoftwarePage
        //        {
        //            name = software.SoftwareName,
        //            SoftwareThumbnail = software.SoftwareThumbnail,
        //            //version = software.SoftwareAllocations
        //            //         .Where(sa => sa.SoftwareId == software.Id && sa.Location.Location1 == country)
        //            //         .Select(sa => sa.Version)
        //            //         .Distinct()
        //            //         .ToList(),
        //            type = s.TypeName,
        //            //isArchived = software.SoftwareAllocations
        //            //.Where(sa => sa.SoftwareId == software.Id && sa.Location.Location1 == country)
        //            //.Select(sa => sa.IsArchived).FirstOrDefault(),

        //            version = software.SoftwareAllocations
        //    .Where(sa => sa.SoftwareId == software.Id && sa.Location.Location1 == country)
        //    .GroupBy(sa => new { sa.Version, sa.SoftwareId, sa.IsArchived })
        //    .Select(g => new Ver_Qty_Pur_Arch { version = g.Key.Version, inStock = g.Count(), isArchived = g.Key.IsArchived,
        //        purchaseDates = g.Select(sa => sa.PurchasedDate).Distinct().OrderBy(pd=>pd).ToList()
        //    })
        //    .ToList(),
        //        }));

        //    List< SoftwarePage > res = new List< SoftwarePage >();
        //    foreach(SoftwarePage s in software.ToList())
        //    {
        //        if (s.version?.Count > 0)
        //        {
        //            res.Add(s);
        //        }
        //    }

        //    return res;
        //}


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
                                         PurchaseDates = s.SoftwareAllocations
                                                         .Where(sa => sa.PurchasedDate != null && sa.Version == parameters.version)
                                                         .GroupBy(sa => new { sa.PurchasedDate, sa.ExpiryDate })
                                                         .OrderBy(sa => sa.Key.PurchasedDate)
                                                         .ThenBy(sa => sa.Key.ExpiryDate)
                                                         .Select(sa => new Pur_Qty_Exp { PurchaseDates = sa.Key.PurchasedDate, ExpiryDates = sa.Key.ExpiryDate, Qty= sa.Count()})
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

                                         isArchived = software.IsArchived
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


        public List<TablePage> GettableSoftwares(String country)
        {
            var tableView = _context.SoftwareAllocations
                             .Include(sa => sa.AssignedByNavigation)
                             .Include(sa => sa.AssignedToNavigation)
                             .Include(sa => sa.Software)
                               .ThenInclude(s => s.SoftwareType)
                             .Include(sa => sa.Location)
                             .Where(sa => sa.Location.Location1 == country)
                             .Select(tv => new TablePage
                             {
                                 name = tv.Software.SoftwareName,
                                 version = tv.Version,
                                 type = tv.Software.SoftwareType.TypeName,
                                 purchasedDate = tv.PurchasedDate,
                                 expireyDate = tv.ExpiryDate,
                                 assignedTo = tv.AssignedToNavigation.FirstName + " " + tv.AssignedToNavigation.LastName,
                                 assignedBy = tv.AssignedByNavigation.FirstName + " " + tv.AssignedByNavigation.LastName,
                                 assignedDate = tv.AssignedDate,
                                 isArchived = tv.IsArchived
                             }).ToList();
                            
            return tableView;
        }



        public bool UpdateSoftwareArchiveStatus(SoftwareUpdateDto dto)
        {
            var softwareAllocations = _context.SoftwareAllocations
                .Where(sa => sa.Software.SoftwareName == dto.Name &&
                             sa.Version == dto.Version &&
                             sa.Software.SoftwareType.TypeName == dto.Type &&
                             sa.Location.Location1==dto.location) 
                             

                             
                .ToList();

            if (softwareAllocations.Count == 0)
                return false; // No matching software allocations found

            foreach (var allocation in softwareAllocations)
            {
                allocation.IsArchived = dto.IsArchived;
            }

            _context.SaveChanges();
            return true; // Update successful
        }

        public List<IEnumerable<SoftwarePage>> CardFilter(List<IEnumerable<SoftwarePage>> allData, filterDto attri)
        {
            List<IEnumerable<SoftwarePage>> filteredData = new List<IEnumerable<SoftwarePage>>();

            if (attri.location == "India")
            {
                List<SoftwarePage> India = allData[0].Where(s =>
                     //(string.IsNullOrEmpty(attri.inStock) || (attri.inStock == "Low In Stock" && s.inStock <= 1) || (attri.inStock == "In Stock" && s.inStock > 1) || (attri.inStock == "Out Of Stock" && s.inStock == 0)) &&
                     (attri.selectedType.Count == 0 || attri.selectedType.Contains(s.type)) &&
                   (attri.From == null || s.purchaseDates.Any(pd => DateOnly.FromDateTime((DateTime)pd) >= attri.From)) &&
(attri.To == null || s.purchaseDates.Any(pd => DateOnly.FromDateTime((DateTime)pd) <= attri.To))
                ).ToList();

                India = India.Where(s =>
                {
                    if (attri.selectedStock == null || attri.selectedStock.Count == 0)
                        return true; 

                    foreach (var stockOption in attri.selectedStock)
                    {
                        if (string.IsNullOrEmpty(stockOption))
                            continue; 

                        if ((stockOption == "Low In Stock" && s.inStock <= 1) ||
                            (stockOption == "In Stock" && s.inStock > 1) ||
                            (stockOption == "Out Of Stock" && s.inStock == 0))
                        {
                            return true; 
                        }
                    }

                    return false; 
                }).ToList();

                filteredData.Add(India);
                filteredData.Add(allData[1]);
            }
            else
            {
                var USA = allData[1].Where(s =>
     (attri.selectedType.Count == 0 || attri.selectedType.Contains(s.type)) &&
     (attri.From == null || s.purchaseDates.Any(pd => DateOnly.FromDateTime((DateTime)pd) >= attri.From)) &&
(attri.To == null || s.purchaseDates.Any(pd => DateOnly.FromDateTime((DateTime)pd) <= attri.To))

 ).ToList();

                USA = USA.Where(s =>
                {
                    if (attri.selectedStock == null || attri.selectedStock.Count == 0)
                        return true; 

                    foreach (var stockOption in attri.selectedStock)
                    {
                        if (string.IsNullOrEmpty(stockOption))
                            continue; 

                        if ((stockOption == "Low In Stock" && s.inStock <= 1) ||
                            (stockOption == "In Stock" && s.inStock > 1) ||
                            (stockOption == "Out Of Stock" && s.inStock == 0))
                        {
                            return true; 
                        }
                    }

                    return false; 
                }).ToList();

                filteredData.Add(allData[0]);
                filteredData.Add(USA);
            }

            return filteredData;

        }


    }


}