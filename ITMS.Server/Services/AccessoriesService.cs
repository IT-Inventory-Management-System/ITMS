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
                var deviceAccessoriesList = _context.Devices
                    .Where(device => device.AssignedTo == id)
                    .Include(device => device.DeviceModel)
                        .ThenInclude(model => model.Category)
                            .ThenInclude(category => category.CategoryType)
                    .Select(device => new UserAccessoriesHistory
                    {
                        DeviceName = device.DeviceModel.DeviceName,
                        Brand = device.DeviceModel.Brand,
                        ModelNo = device.DeviceModel.ModelNo,
                        CategoryName = device.DeviceModel.Category.Name,
                        CategoryType = device.DeviceModel.Category.CategoryType.TypeName,
                        AssignBy = _context.Employees
                            .Where(employee => employee.Id == device.AssignedBy)
                            .Select(employee => $"{employee.FirstName} {employee.LastName}")
                            .FirstOrDefault(),
                        AssignedDate = device.AssignedDate,
                        AssignedTo = _context.Employees
                            .Where(employee => employee.Id == device.AssignedTo)
                            .Select(employee => $"{employee.FirstName} {employee.LastName}")
                            .FirstOrDefault()
                    })
                    .ToList();

                return deviceAccessoriesList;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

    }


}
