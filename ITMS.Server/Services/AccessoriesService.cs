using ITMS.Server.DTO;
using ITMS.Server.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Crypto.Prng.Drbg;
using System;
using System.Text;
using Xamarin.Forms;

namespace ITMS.Server.Services
{
    public class AccessoriesService
    {
        private readonly ItinventorySystemContext _context;

        public AccessoriesService(ItinventorySystemContext context)
        {
            _context = context;
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


    }
    }
