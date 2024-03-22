using ITMS.Server.DTO;
using ITMS.Server.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Asn1.Ocsp;
using Org.BouncyCastle.Crypto.Prng.Drbg;
using System;
using System.Globalization;
using System.Text;
using Xamarin.Forms;

namespace ITMS.Server.Services
{
    public class AccessoriesService
    {
        private readonly ItinventorySystemContext _context;
        private readonly IAddAssetService _addAssetService;

        public AccessoriesService(ItinventorySystemContext context, IAddAssetService addAssetService)
        {
            _context = context;
            _addAssetService = addAssetService;
        }

        public List<UserAccessoriesHistory> GetUserAccessories(Guid id)
        {
            try
            {
                var accessoriesList = _context.DevicesLogs
                    .Where(log => log.EmployeeId == id && log.Device.DeviceModel.Category.Name != "Laptop" && log.SoftwareAllocation == null)
                    .Include(log => log.Device)
                        .ThenInclude(device => device.DeviceModel)
                            .ThenInclude(model => model.Category)
                                .ThenInclude(category => category.CategoryType)
                    .Select(log => new UserAccessoriesHistory
                    {
                        DeviceLogId = log.Id,
                        DeviceId = log.DeviceId,
                        cygid = log.Device.Cygid, //new change in accessories
                        DeviceName = log.Device.DeviceModel.DeviceName,
                        Brand = log.Device.DeviceModel.Brand,
                        ModelNo = log.Device.DeviceModel.ModelNo,
                        CategoryName = log.Device.DeviceModel.Category.Name,
                        CategoryType = log.Device.DeviceModel.Category.CategoryType.TypeName,
                        AssignBy = _context.Employees
                            .Where(employee => employee.Id == log.AssignedBy)
                            .Select(employee => $"{employee.FirstName} {employee.LastName}")
                            .FirstOrDefault(),
                        AssignedTo = _context.Employees
                            .Where(employee => employee.Id == log.EmployeeId)
                            .Select(employee => $"{employee.FirstName} {employee.LastName}")
                            .FirstOrDefault(),
                        AssignedDate = log.AssignedDate,
                        isWired = log.Device.DeviceModel.IsWired,
                        SubmittedBy = _context.Employees
                            .Where(employee => employee.Id == log.RecievedBy)
                            .Select(employee => $"{employee.FirstName} {employee.LastName}")
                            .FirstOrDefault(),
                        SubmittedByDate = log.RecievedDate,
                        ActionName = _context.ActionTables
                               .Where(action => action.Id == log.ActionId)
                               .Select(action => $"{action.ActionName}")
                               .FirstOrDefault(),
                        UpdatedBy = _context.Employees
                               .Where(employee => employee.Id == log.UpdatedBy)
                               .Select(employee => $"{employee.FirstName} {employee.LastName}")
                               .FirstOrDefault(),
                        UpdatedAtUtc = log.UpdatedAtUtc
                    })
                    .ToList();

                return accessoriesList;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        public async Task<List<OneTimePutBagDTO>> OneTimePutBagService(List<OneTimePutBagDTO> listOfBags)
        {
            var number = 0;
            List<OneTimePutBagDTO> failedItems = new List<OneTimePutBagDTO>();
            var result = await _addAssetService.getCGIIDCommon("Bag");
            if (result != null && result.Any())
            {
                number = int.Parse(result.First().CGIID);
            }
            var idx = 1;

            foreach (var b in listOfBags)
            {
                (int number, List<OneTimePutBagDTO> failedItem) failedddSingleBag = await AddSinglebag(b,number+idx);
                idx++;
                if (failedddSingleBag.failedItem.Count != 0)
                {
                    failedItems.AddRange(failedddSingleBag.failedItem);
                    continue;
                }

                if (!string.IsNullOrEmpty(b.AssignedTo))
                {
                    List<OneTimePutBagDTO> failedHistory = await AddSingleBagHistory(b, failedddSingleBag.number);
                    if(failedHistory.Count != 0)
                    {
                        failedItems.AddRange(failedHistory);
                        continue;
                    }
                }
            }
            return failedItems;
        }

        public async Task<List<OneTimePutBagDTO>> AddSingleBagHistory(OneTimePutBagDTO bag,int cygnumber)
        {
            List<OneTimePutBagDTO> failedItems = new List<OneTimePutBagDTO>();
            try
            {
                DevicesLog dl = new DevicesLog
                {
                    DeviceId = await _context.Devices.Where(dc => dc.Cygid.ToLower() == string.Concat("cgi-bag"," ",cygnumber)).Select(d => d.Id).FirstOrDefaultAsync(),
                    EmployeeId = await _context.Employees.Where(e => e.FirstName + " " + e.LastName == bag.AssignedTo).Select(e => e.Id).FirstOrDefaultAsync(),
                    AssignedBy = bag.LoggedIn,
                    RecievedBy = bag.LoggedIn,
                    RecievedDate = DateTime.UtcNow,
                    CreatedBy = bag.LoggedIn,
                    UpdatedBy = bag.LoggedIn,
                    CreatedAtUtc = DateTime.UtcNow,
                    UpdatedAtUtc = DateTime.UtcNow,
                    ActionId = await _context.ActionTables.Where(a => a.ActionName.ToLower() == "submitted").Select(e => e.Id).FirstOrDefaultAsync(),
                };
                _context.DevicesLogs.Add(dl);
                await _context.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                failedItems.Add(bag);
            }
            return failedItems;
        }

        public async Task<(int number, List<OneTimePutBagDTO> failedItems)> AddSinglebag(OneTimePutBagDTO bag,int number)
        {
            List<OneTimePutBagDTO> failedItems = new List<OneTimePutBagDTO>();
            

            try
            {
                //string pdLong = "15-Mar-21";
                DateTime pd = DateTime.ParseExact(bag.Purchaseddate, "dd-MM-yyyy", CultureInfo.InvariantCulture);

                Models.Device device = new Models.Device
                {
                    Cygid = "CGI-BAG" +" "+number,
                    DeviceModelId = await _context.DeviceModel
                                    .Where(dm => dm.Brand.ToLower() == "dell" && dm.Category.Name.ToLower() == "bag")
                                    .Select(s => s.Id)
                                    .FirstOrDefaultAsync(),
                //Guid.Parse("CED54FC9-412F-4DB3-A866-B2E27ED8B3A4"),
                //(await _context.DeviceModel.FindAsync(await _context.Categories
                //                 .Where(c => c.Name.ToLower() == "bag")
                //                 .Select(c => c.Id)
                //                 .FirstOrDefaultAsync())).Id,
                CreatedBy = bag.LoggedIn,
                    UpdatedBy = bag.LoggedIn,
                    CreatedAtUtc = DateTime.UtcNow,
                    UpdatedAtUtc = DateTime.UtcNow,
                    AssignedTo = string.IsNullOrEmpty(bag.AssignedTo) ? null : await _context.Employees.Where(e => string.Concat(e.FirstName, " ", e.LastName).ToLower() == bag.AssignedTo.ToLower()).Select(e => e.Id).FirstOrDefaultAsync(),
                    // e => e.FirstName.ToLower() + " " + e.LastName.ToLower() == bag.AssignedTo.ToLower()).Select(s => s.Id).FirstOrDefaultAsync(),
                    AssignedBy = string.IsNullOrEmpty(bag.AssignedTo) ? null : bag.LoggedIn,
                    AssignedDate = string.IsNullOrEmpty(bag.AssignedTo) ? null: DateTime.UtcNow,
                    PurchasedDate = pd,
                    LocationId = bag.locationId,
                    IsArchived = false,
                    Status = string.IsNullOrEmpty(bag.AssignedTo) ? await _context.Statuses.Where(s => s.Type.ToLower() == "not assigned").Select(s => s.Id).FirstOrDefaultAsync() : await _context.Statuses.Where(s => s.Type.ToLower() == "assigned").Select(s => s.Id).FirstOrDefaultAsync(),
                };
                _context.Devices.Add(device);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                failedItems.Add(bag);
            }

            return (number, failedItems);
        }
    }
}



