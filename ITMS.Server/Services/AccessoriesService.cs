using ITMS.Server.DTO;
using ITMS.Server.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Asn1.Ocsp;
using Org.BouncyCastle.Crypto.Prng.Drbg;
using System;
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

        //public async Task<List<OneTimePutBagDTO>> OneTimePutBagService(List<OneTimePutBagDTO> listOfBags)
        //{
        //    List<OneTimePutBagDTO> failedItems = new List<OneTimePutBagDTO>();



        //    foreach (var b in listOfBags)
        //    {
        //        List<OneTimePutBagDTO> failedddSingleMouse = await AddSingleBag(b);
        //        failedItems.AddRange(failedddSingleMouse);

        //        List<OneTimePutBagDTO> failedHistory = await AddSingleBagHistory(b);

        //    }
        //}

        //public async Task<List<OneTimePutBagDTO>> AddSingleBagHistory(OneTimePutBagDTO bag)
        //{
        //    DevicesLog dl = new DevicesLog
        //    {
        //        DeviceId = await _context.Devices.Where(dc => dc.Cygid == d.Cygid).Select(d => d.Id).FirstOrDefaultAsync(),
        //        EmployeeId = await _context.Employees.Where(e => e.FirstName + " " + e.LastName == bag.AssignedTo).Select(e => e.Id).FirstOrDefaultAsync(),
        //        AssignedBy = bag.LoggedIn,
        //        RecievedBy = bag.LoggedIn,
        //        RecievedDate = DateTime.UtcNow,
        //        CreatedBy = bag.LoggedIn,
        //        UpdatedBy = bag.LoggedIn,
        //        CreatedAtUtc = DateTime.UtcNow,
        //        UpdatedAtUtc = DateTime.UtcNow,
        //        ActionId = await _context.ActionTables.Where(a => a.ActionName.ToLower() == "submitted").Select(e => e.Id).FirstOrDefaultAsync(),
        //    };
        //}

        public async Task<(int number, List<OneTimePutBagDTO> failedItems)> AddSinglebag(OneTimePutBagDTO bag)
        {
            List<OneTimePutBagDTO> failedItems = new List<OneTimePutBagDTO>();
            var number = 0;

            try
            {
                //var result = await _addAssetService.getCGIIDCommon("Bag");
                //number = result?.FirstOrDefault()?.CGIID + 1;

                var result = await _addAssetService.getCGIIDCommon("Bag");
                if (result != null && result.Any())
                {
                    number = int.Parse(result.First().CGIID) + 1;
                }

                Models.Device device = new Models.Device
                {
                    Cygid = "CGI-BAG" + number,
                    DeviceModelId = (await _context.DeviceModel.FindAsync(await _context.Categories
                                     .Where(c => c.Name.ToLower() == "bag")
                                     .Select(c => c.Id)
                                     .FirstOrDefaultAsync())).Id,
                    CreatedBy = bag.LoggedIn,
                    UpdatedBy = bag.LoggedIn,
                    CreatedAtUtc = DateTime.UtcNow,
                    UpdatedAtUtc = DateTime.UtcNow,
                    AssignedTo = await _context.Employees.Where(e => e.FirstName.ToLower() + " " + e.LastName.ToLower() == bag.AssignedTo.ToLower()).Select(s => s.Id).FirstOrDefaultAsync(),
                    AssignedBy = bag.LoggedIn,
                    AssignedDate = DateTime.UtcNow,
                    PurchasedDate = bag.Purchaseddate,
                    LocationId = bag.locationId,
                    IsArchived = false,
                    Status = await _context.Statuses.Where(s => s.Type.ToLower() == "assigned").Select(s => s.Id).FirstOrDefaultAsync(),
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



